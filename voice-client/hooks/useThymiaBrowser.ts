"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type AgoraRTM from "agora-rtm";

const THYMIA_WS_URL = "wss://ws.thymia.ai";
const THYMIA_API_KEY = process.env.NEXT_PUBLIC_THYMIA_API_KEY || "";
const SEND_INTERVAL_MS = 250; // Send audio chunks every 250ms

export interface ThymiaBiomarkers {
  stress?: number;
  fatigue?: number;
  burnout?: number;
  low_self_esteem?: number;
  happy?: number;
  sad?: number;
  angry?: number;
  neutral?: number;
  fearful?: number;
  surprised?: number;
  disgusted?: number;
  [key: string]: number | undefined;
}

export interface ThymiaState {
  connected: boolean;
  biomarkers: ThymiaBiomarkers;
  alert: string;
  rationale: string;
  speechSeconds: number;
}

/**
 * Browser-side Thymia integration.
 * Captures PCM audio from the microphone track, streams to Thymia WebSocket,
 * receives biomarkers, and publishes them via RTM to the Custom LLM server.
 */
export function useThymiaBrowser(
  localAudioTrack: IMicrophoneAudioTrack | null,
  rtmClientRef: React.MutableRefObject<InstanceType<typeof AgoraRTM.RTM> | null>,
  channel: string | null,
  isConnected: boolean,
) {
  const wsRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sendBufferRef = useRef<Int16Array[]>([]);
  const sendIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const localAudioTrackRef = useRef(localAudioTrack);
  localAudioTrackRef.current = localAudioTrack;
  const [state, setState] = useState<ThymiaState>({
    connected: false,
    biomarkers: {},
    alert: "none",
    rationale: "",
    speechSeconds: 0,
  });

  // Publish biomarkers to RTM so Custom LLM can pick them up
  const publishBiomarkersViaRTM = useCallback(
    async (biomarkers: ThymiaBiomarkers, alert: string, rationale: string) => {
      const rtm = rtmClientRef.current;
      if (!rtm || !channel) return;

      try {
        const msg = JSON.stringify({
          object: "thymia.biomarkers.client",
          biomarkers,
          alert,
          rationale,
          timestamp: new Date().toISOString(),
        });
        await rtm.publish(channel, msg);
        console.log("[ThymiaBrowser] Published biomarkers via RTM");
      } catch (e) {
        console.warn("[ThymiaBrowser] Failed to publish via RTM:", e);
      }
    },
    [rtmClientRef, channel],
  );

  // Connect to Thymia WebSocket and start streaming
  const connect = useCallback(() => {
    if (!THYMIA_API_KEY || !localAudioTrackRef.current || wsRef.current || connectingRef.current) return;
    connectingRef.current = true;

    console.log("[ThymiaBrowser] Connecting to Thymia...");

    const ws = new WebSocket(THYMIA_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[ThymiaBrowser] WebSocket connected, sending config");

      const config = {
        type: "CONFIG",
        api_key: THYMIA_API_KEY,
        user_label: `browser-${channel || "unknown"}`,
        language: "en",
        biomarkers: ["helios", "apollo"],
        policies: ["passthrough", "student_monitor"],
        sample_rate: 16000,
        format: "pcm16",
        channels: 1,
        progress_updates: { enabled: true, interval_seconds: 1 },
      };

      ws.send(JSON.stringify(config));
      setState((s) => ({ ...s, connected: true }));

      // Start capturing audio from microphone track
      startAudioCapture();
    };

    ws.onmessage = (event) => {
      try {
        const raw = typeof event.data === 'string' ? event.data : '[binary]';
        console.log(`[ThymiaBrowser] RAW message: ${raw.substring(0, 200)}`);
        const msg = JSON.parse(event.data);

        if (msg.type === "POLICY_RESULT") {
          const result = msg.result || {};
          const biomarkers = result.biomarkers || {};
          const bioSummary = result.biomarker_summary || {};

          // Extract biomarker values
          const mergedBio: ThymiaBiomarkers = { ...biomarkers };
          if (bioSummary && typeof bioSummary === "object") {
            for (const [k, v] of Object.entries(bioSummary)) {
              if (typeof v === "number" && k !== "interpretation") {
                mergedBio[k] = v;
              }
            }
          }

          const alert = result.alert || msg.policy || "none";
          const rationale = result.rationale || "";

          const hasScores = Object.values(mergedBio).some(
            (v) => typeof v === "number" && Math.abs(v) >= 0.001,
          );

          if (hasScores) {
            setState((s) => ({
              ...s,
              biomarkers: mergedBio,
              alert,
              rationale,
            }));

            // Publish to RTM for Custom LLM
            publishBiomarkersViaRTM(mergedBio, alert, rationale);
          }

          console.log(
            `[ThymiaBrowser] PolicyResult: policy=${msg.policy} keys=[${Object.keys(mergedBio).join(",")}] hasScores=${hasScores}`,
          );
        } else if (msg.type === "PROGRESS") {
          // Track speech seconds
          const bios = msg.biomarkers || {};
          for (const val of Object.values(bios) as any[]) {
            if (val && typeof val.speech_seconds === "number") {
              setState((s) => ({
                ...s,
                speechSeconds: Math.max(s.speechSeconds, val.speech_seconds),
              }));
              break;
            }
          }
        } else if (msg.type === "ERROR") {
          console.error("[ThymiaBrowser] Thymia error:", msg.message);
        }
      } catch (e) {
        console.warn("[ThymiaBrowser] Failed to parse message:", e);
      }
    };

    ws.onclose = (ev) => {
      console.log(`[ThymiaBrowser] WebSocket closed: code=${ev.code} reason=${ev.reason}`);
      wsRef.current = null;
      connectingRef.current = false;
      setState((s) => ({ ...s, connected: false }));
    };

    ws.onerror = (e) => {
      console.error("[ThymiaBrowser] WebSocket error:", e);
    };
  }, [channel, publishBiomarkersViaRTM]);

  // Capture PCM audio from microphone track
  const startAudioCapture = useCallback(() => {
    const track = localAudioTrackRef.current;
    if (!track) return;

    // Prevent duplicate capture
    if (audioContextRef.current) return;

    const mediaTrack = track.getMediaStreamTrack();
    if (!mediaTrack) {
      console.warn("[ThymiaBrowser] No media stream track available");
      return;
    }

    const stream = new MediaStream([mediaTrack]);
    // Use native sample rate (Chrome ignores custom sampleRate for AudioContext)
    const ctx = new AudioContext();
    audioContextRef.current = ctx;
    const nativeSampleRate = ctx.sampleRate;
    const TARGET_RATE = 16000;
    const ratio = nativeSampleRate / TARGET_RATE;

    console.log(`[ThymiaBrowser] AudioContext sampleRate=${nativeSampleRate}, resample ratio=${ratio.toFixed(2)}`);

    const source = ctx.createMediaStreamSource(stream);
    sourceRef.current = source;

    // ScriptProcessorNode for PCM capture (deprecated but widely supported)
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);

      // Downsample from native rate to 16kHz
      const outputLen = Math.floor(input.length / ratio);
      const pcm16 = new Int16Array(outputLen);
      for (let i = 0; i < outputLen; i++) {
        const srcIdx = Math.floor(i * ratio);
        const s = Math.max(-1, Math.min(1, input[srcIdx]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      sendBufferRef.current.push(pcm16);
    };

    source.connect(processor);
    processor.connect(ctx.destination);

    // Send buffered audio at regular intervals
    let sendCount = 0;
    sendIntervalRef.current = setInterval(() => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      const chunks = sendBufferRef.current;
      if (chunks.length === 0) return;

      // Merge all chunks
      const totalLen = chunks.reduce((sum, c) => sum + c.length, 0);
      const merged = new Int16Array(totalLen);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      sendBufferRef.current = [];
      sendCount++;
      if (sendCount % 20 === 1) {
        console.log(`[ThymiaBrowser] Sent chunk #${sendCount}: ${merged.byteLength} bytes (${(merged.byteLength / 32000).toFixed(1)}s of audio)`);
      }

      // Send as binary
      ws.send(merged.buffer);
    }, SEND_INTERVAL_MS);

    console.log(`[ThymiaBrowser] Audio capture started (${nativeSampleRate}Hz → ${TARGET_RATE}Hz mono PCM)`);
  }, []);

  // Disconnect and cleanup
  const disconnect = useCallback(() => {
    if (sendIntervalRef.current) {
      clearInterval(sendIntervalRef.current);
      sendIntervalRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    sendBufferRef.current = [];
    connectingRef.current = false;
    setState({
      connected: false,
      biomarkers: {},
      alert: "none",
      rationale: "",
      speechSeconds: 0,
    });

    console.log("[ThymiaBrowser] Disconnected");
  }, []);

  // Auto-connect when voice client connects, auto-disconnect on leave
  useEffect(() => {
    console.log(`[ThymiaBrowser] Effect: isConnected=${isConnected} hasTrack=${!!localAudioTrack} apiKey=${THYMIA_API_KEY ? 'SET' : 'EMPTY'}`);
    if (isConnected && localAudioTrack && THYMIA_API_KEY) {
      // Small delay to let Agora stabilize
      const timer = setTimeout(() => {
        console.log("[ThymiaBrowser] Triggering connect...");
        connect();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      if (!THYMIA_API_KEY) {
        console.warn("[ThymiaBrowser] NEXT_PUBLIC_THYMIA_API_KEY is not set! Thymia disabled.");
      }
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, localAudioTrack]);

  // Send transcript to Thymia (call this when messageList updates)
  const sendTranscript = useCallback((speaker: "user" | "agent", text: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !text) return;

    const msg = JSON.stringify({
      type: "TRANSCRIPT",
      speaker,
      text,
    });
    ws.send(msg);
    console.log(`[ThymiaBrowser] Sent transcript: ${speaker}: ${text.substring(0, 50)}`);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { ...state, sendTranscript };
}
