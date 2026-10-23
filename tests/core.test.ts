import { test } from "node:test";
import assert from "node:assert/strict";
import { nextBreakPhase, secondsUntil } from "../lib/break-timer.ts";

test("break timer transitions from 20 minutes to a 20-second break, then completion", () => {
  const deadline = 1200000;
  assert.equal(secondsUntil(deadline, 0), 1200);
  assert.equal(secondsUntil(deadline, 1199001), 1);
  assert.equal(secondsUntil(deadline, 1201000), 0);
  assert.deepEqual(nextBreakPhase("focus"), { phase: "break", seconds: 20 });
  assert.deepEqual(nextBreakPhase("break"), { phase: "done", seconds: 0 });
});
import { getTargetPosition } from "../lib/motion-paths.ts";
import {
  getWeekStart,
  getWeeklySessions,
  getWeeklyExerciseTime,
  getStreak,
  getSessions,
  saveSession,
  clearProgress,
} from "../lib/progress-storage.ts";
import type { ExerciseSession, ExercisePath } from "../types/exercise.ts";
const record = (
  id: string,
  date: string,
  duration = 60,
  type = "circular-focus",
): ExerciseSession => ({ id, completedAt: date, duration, exerciseType: type });
test("week starts Monday at local midnight and handles Sunday and year boundaries", () => {
  assert.equal(getWeekStart(new Date(2026, 9, 11, 14)).getDay(), 1);
  assert.equal(getWeekStart(new Date(2026, 9, 11, 14)).getDate(), 5);
  assert.equal(getWeekStart(new Date(2026, 0, 1)).getFullYear(), 2025);
  assert.equal(getWeekStart(new Date()).getHours(), 0);
});
test("weekly calculations exclude adjacent weeks and keep breaks separate", () => {
  const now = new Date(2026, 9, 7);
  const sessions = [
    record("1", new Date(2026, 9, 5).toISOString()),
    record("2", new Date(2026, 9, 11, 23, 59).toISOString(), 90),
    record("3", new Date(2026, 9, 12).toISOString()),
    record("4", new Date(2026, 9, 4, 23, 59).toISOString()),
    record("5", new Date(2026, 9, 6).toISOString(), 20, "eye-break"),
  ];
  assert.equal(getWeeklySessions(sessions, now).length, 3);
  assert.equal(getWeeklyExerciseTime(sessions, now), 150);
});
test("streak includes yesterday when today has no sessions", () => {
  const sessions = [
    record("1", new Date(2026, 9, 5).toISOString()),
    record("2", new Date(2026, 9, 6).toISOString()),
  ];
  assert.equal(getStreak(sessions, new Date(2026, 9, 7)), 2);
  assert.equal(getStreak(sessions, new Date(2026, 9, 8)), 0);
});
test("all six paths remain bounded and continuous", () => {
  const paths: ExercisePath[] = [
    "circular",
    "horizontal",
    "vertical",
    "figure-eight",
    "focus-shift",
    "random",
  ];
  for (const path of paths) {
    let previous = getTargetPosition(path, 0);
    for (let t = 0.01; t < 40; t += 0.01) {
      const next = getTargetPosition(path, t);
      assert.ok(Math.abs(next.x) <= 0.83 && Math.abs(next.y) <= 0.83);
      assert.ok(
        Math.abs(next.x - previous.x) < 0.03 &&
          Math.abs(next.y - previous.y) < 0.03,
      );
      assert.ok(next.scale >= 0.69 && next.scale <= 1.81);
      previous = next;
    }
  }
});
test("circle reverses direction and focus shift remains centered", () => {
  assert.ok(getTargetPosition("circular", 1).y > 0);
  assert.ok(getTargetPosition("circular", -1).y < 0);
  assert.equal(getTargetPosition("focus-shift", 2).x, 0);
  assert.equal(getTargetPosition("focus-shift", 2).y, 0);
});
test("storage deduplicates, persists and clears; corrupt data does not crash", () => {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => data.set(key, value),
      removeItem: (key: string) => data.delete(key),
    },
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { dispatchEvent: () => true },
  });
  const session = record("saved", new Date().toISOString());
  assert.equal(saveSession(session), true);
  assert.equal(saveSession(session), true);
  assert.equal(getSessions().length, 1);
  assert.equal(clearProgress(), true);
  assert.equal(getSessions().length, 0);
  data.set("visualis-sessions-v1", "broken");
  assert.deepEqual(getSessions(), []);
  data.set("visualis-sessions-v1", JSON.stringify([session, { duration: -1 }]));
  assert.equal(getSessions().length, 1);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: () => {
        throw new Error("unavailable");
      },
      setItem: () => {
        throw new Error("unavailable");
      },
      removeItem: () => {
        throw new Error("unavailable");
      },
    },
  });
  assert.deepEqual(getSessions(), []);
  assert.equal(saveSession(session), false);
  assert.equal(clearProgress(), false);
});
