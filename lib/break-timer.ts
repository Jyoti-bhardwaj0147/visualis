export type BreakPhase = "focus" | "break" | "done";

export function secondsUntil(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function nextBreakPhase(phase: BreakPhase): { phase: BreakPhase; seconds: number } {
  return phase === "focus"
    ? { phase: "break", seconds: 20 }
    : { phase: "done", seconds: 0 };
}
