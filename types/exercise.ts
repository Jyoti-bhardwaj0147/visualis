export type ExercisePath =
  | "circular"
  | "horizontal"
  | "vertical"
  | "figure-eight"
  | "focus-shift"
  | "random";
export type Speed = "calm" | "standard" | "dynamic";
export type TargetSize = "small" | "medium" | "large";
export type ExerciseSession = {
  id: string;
  exerciseType: string;
  duration: number;
  completedAt: string;
};
export type Exercise = {
  id: string;
  name: string;
  path: ExercisePath;
  description: string;
  tag: string;
};
