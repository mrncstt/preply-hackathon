"use client";

import { useState, useRef, useEffect } from "react";

type StepInfo = {
  step: number;
  thinking: string;
  tools: string[];
  expanded: boolean;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  steps: StepInfo[];
};

const TOOL_NAMES: Record<string, string> = {
  search_emails: "Поиск писем",
  search_by_participant: "Поиск по участнику",
  search_by_date_range: "Поиск по дате",
  search_entities: "Поиск сущностей",
  get_email: "Загрузка письма",
  get_thread: "Загрузка цепочки",
  get_email_stats: "Статистика",
  get_top_senders: "Топ отправителей",
};

// NEXT_PUBLIC_ prefix makes it available in browser
const SMARTCAT_API =
  process.env.NEXT_PUBLIC_SMARTCAT_API || "http://localhost:8000";

export default function SmartCatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Привет! Я SmartCat, ассистент по поиску email. Спрашивай что угодно о корпусе Enron — я умею искать письма, находить людей, сделки и анализировать переписку.",
      steps: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [status, setStatus] = useState("Готов");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const toggleStep = (msgId: string, stepIdx: number) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId) return m;
        const newSteps = [...m.steps];
        newSteps[stepIdx] = {
          ...newSteps[stepIdx],
          expanded: !newSteps[stepIdx].expanded,
        };
        return { ...m, steps: newSteps };
      })
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const query = input.trim();
    setInput("");
    setIsStreaming(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
      steps: [],
    };

    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      text: "",
      steps: [],
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setStatus("Думаю...");

    let fullText = "";
    let answerMode = false;
    let currentStepIdx = -1;

    try {
      const body: Record<string, string> = { message: query };
      if (sessionId) body.session_id = sessionId;

      const response = await fetch(`${SMARTCAT_API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const sid = response.headers.get("X-Session-Id");
      if (sid) setSessionId(sid);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;

          try {
            const event = JSON.parse(data);

            setMessages((prev) => {
              const msgs = [...prev];
              const lastIdx = msgs.length - 1;
              const msg = { ...msgs[lastIdx] };
              const steps = [...msg.steps];

              switch (event.event) {
                case "step_start": {
                  currentStepIdx = steps.length;
                  steps.push({
                    step: event.step,
                    thinking: "",
                    tools: [],
                    expanded: true,
                  });
                  setStatus(`Шаг ${event.step}/${event.max_steps}`);
                  break;
                }

                case "token": {
                  let text = (event.text || "").replace(/<\/?think>/g, "");
                  fullText += text;

                  if (text.includes("Answer:")) {
                    answerMode = true;
                    // Collapse all steps
                    steps.forEach((s, i) => {
                      steps[i] = { ...s, expanded: false };
                    });
                    const after = text.split("Answer:")[1] || "";
                    msg.text = after;
                  } else if (answerMode) {
                    msg.text += text;
                  } else if (currentStepIdx >= 0 && currentStepIdx < steps.length) {
                    steps[currentStepIdx] = {
                      ...steps[currentStepIdx],
                      thinking: steps[currentStepIdx].thinking + text,
                    };
                  }
                  break;
                }

                case "tool_call": {
                  if (currentStepIdx >= 0 && currentStepIdx < steps.length) {
                    const toolName =
                      TOOL_NAMES[event.tool] || event.tool;
                    steps[currentStepIdx] = {
                      ...steps[currentStepIdx],
                      tools: [...steps[currentStepIdx].tools, toolName],
                      expanded: false,
                    };
                  }
                  setStatus(
                    `${TOOL_NAMES[event.tool] || event.tool}...`
                  );
                  break;
                }

                case "tool_result":
                  setStatus("Анализирую...");
                  break;

                case "done": {
                  setStatus(`Готово (${event.steps_used} шагов)`);
                  if (!answerMode && !msg.text) {
                    let cleaned = fullText
                      .replace(/```tool[\s\S]*?```/g, "")
                      .replace(/<think>[\s\S]*?<\/think>/g, "")
                      .replace(/<think>[\s\S]*/g, "")
                      .replace(/^Thinking:.*$/gm, "")
                      .trim();
                    msg.text = cleaned || "Ответ не сгенерирован.";
                  }
                  break;
                }

                case "error":
                  msg.text = event.message || "Ошибка";
                  setStatus("Ошибка");
                  break;
              }

              msg.steps = steps;
              msgs[lastIdx] = msg;
              return msgs;
            });
          } catch {}
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          ...msgs[msgs.length - 1],
          text: `Ошибка подключения: ${err.message}`,
        };
        return msgs;
      });
      setStatus("Отключено");
    }

    setIsStreaming(false);
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a2e",
        color: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 20px",
          background: "#16213e",
          borderBottom: "1px solid #0f3460",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <a href="/" style={{ color: "#888", textDecoration: "none", fontSize: 14 }}>
          ← Home
        </a>
        <h1 style={{ fontSize: 18, color: "#53d8fb", margin: 0 }}>
          SmartCat
        </h1>
        <span
          style={{
            fontSize: 12,
            color: "#888",
            flex: 1,
            textAlign: "right",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              maxWidth: "80%",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#0f3460" : "#1f2937",
              padding: "12px 16px",
              borderRadius: 12,
              borderBottomRightRadius: msg.role === "user" ? 4 : 12,
              borderBottomLeftRadius: msg.role === "assistant" ? 4 : 12,
              lineHeight: 1.5,
              fontSize: 14,
            }}
          >
            {/* Steps */}
            {msg.steps.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: msg.text ? 10 : 0,
                }}
              >
                {msg.steps.map((step, si) => (
                  <div
                    key={si}
                    style={{
                      borderLeft: "2px solid #0f3460",
                      paddingLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "#53d8fb",
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={() => toggleStep(msg.id, si)}
                    >
                      {step.expanded ? "▾" : "▸"} Шаг {step.step}
                      {step.tools.map((t, ti) => (
                        <span
                          key={ti}
                          style={{
                            fontSize: 11,
                            color: "#f59e0b",
                            background: "#1a1a2e",
                            padding: "1px 6px",
                            borderRadius: 10,
                            marginLeft: 6,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {step.expanded && step.thinking && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#9ca3af",
                          lineHeight: 1.4,
                          maxHeight: 300,
                          overflowY: "auto",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          marginTop: 4,
                        }}
                      >
                        {step.thinking}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Answer */}
            {msg.text && (
              <div style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "16px 20px",
          background: "#16213e",
          borderTop: "1px solid #0f3460",
          display: "flex",
          gap: 10,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Задай вопрос о переписке..."
          disabled={isStreaming}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #0f3460",
            background: "#1a1a2e",
            color: "#e0e0e0",
            fontSize: 14,
            outline: "none",
          }}
          autoFocus
        />
        <button
          onClick={sendMessage}
          disabled={isStreaming || !input.trim()}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: isStreaming ? "#374151" : "#53d8fb",
            color: isStreaming ? "#666" : "#1a1a2e",
            fontWeight: 600,
            cursor: isStreaming ? "not-allowed" : "pointer",
            fontSize: 14,
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
