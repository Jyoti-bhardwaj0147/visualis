import type { ExerciseSession } from "../types/exercise.ts";
const KEY = "visualis-sessions-v1";
export function getSessions(): ExerciseSession[] {
  if (typeof window === "undefined") return [];
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(data)
      ? data.filter(
          (s): s is ExerciseSession =>
            !!s &&
            typeof s === "object" &&
            typeof s.id === "string" &&
            typeof s.exerciseType === "string" &&
            typeof s.duration === "number" &&
            Number.isFinite(s.duration) &&
            s.duration > 0 &&
            typeof s.completedAt === "string" &&
            !Number.isNaN(Date.parse(s.completedAt)),
        )
      : [];
  } catch {
    return [];
  }
}
export function saveSession(session: ExerciseSession): boolean {
  try {
    const sessions = getSessions();
    if (!sessions.some((s) => s.id === session.id))
      localStorage.setItem(KEY, JSON.stringify([...sessions, session]));
    window.dispatchEvent(new Event("visualis-progress"));
    return true;
  } catch {
    return false;
  }
}
export function getWeekStart(now = new Date()) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return date;
}
export function getWeeklySessions(sessions = getSessions(), now = new Date()) {
  const start = getWeekStart(now);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return sessions.filter(
    (s) => new Date(s.completedAt) >= start && new Date(s.completedAt) < end,
  );
}
export function getWeeklyExerciseTime(
  sessions = getSessions(),
  now = new Date(),
) {
  return getWeeklySessions(sessions, now)
    .filter((s) => s.exerciseType !== "eye-break")
    .reduce((sum, s) => sum + s.duration, 0);
}
export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("visualis-progress"));
    return true;
  } catch {
    return false;
  }
}
export function getStreak(sessions: ExerciseSession[], now = new Date()) {
  const days = new Set(
    sessions.map((s) => new Date(s.completedAt).toDateString()),
  );
  const date = new Date(now);
  let streak = 0;
  if (!days.has(date.toDateString())) date.setDate(date.getDate() - 1);
  while (days.has(date.toDateString())) {
    streak++;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}
