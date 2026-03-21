export type AgentState = "idle" | "joining" | "listening" | "talking" | "disconnected";

export interface Message {
  id: string;
  role: "agent" | "user";
  text: string;
  final: boolean;
}

export interface EnvStatus {
  ready: boolean;
  missing: string[];
}

export interface InterviewProfile {
  learner_name: string | null;
  target_language: string;
  current_level: string;
  required_skill: string;
  real_interest: string;
  learning_bridge: string;
  barriers: string[];
  preferred_style: string;
  available_time: string;
  motivation_type: string;
  recommendation: string;
  weekly_plan: WeekPlan[];
}

export interface WeekPlan {
  week: number;
  theme: string;
  activity: string;
  passion_link: string;
}

export interface ThymiaBiomarkers {
  [key: string]: number | undefined;
}

export interface ThymiaData {
  biomarkers: ThymiaBiomarkers;
  alert: string;
  rationale: string;
}
