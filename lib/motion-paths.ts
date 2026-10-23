import type { ExercisePath } from "../types/exercise.ts";
const points = [
  [-0.65, -0.4],
  [0.55, 0.55],
  [-0.5, 0.5],
  [0.7, -0.5],
  [0, 0.65],
  [-0.7, 0],
  [0.3, -0.65],
  [0, 0],
];
export function getTargetPosition(path: ExercisePath, phase: number) {
  let x = 0,
    y = 0,
    scale = 1;
  if (path === "circular") {
    x = Math.cos(phase) * 0.72;
    y = Math.sin(phase) * 0.72;
  }
  if (path === "horizontal") x = Math.sin(phase) * 0.82;
  if (path === "vertical") y = Math.sin(phase) * 0.78;
  if (path === "figure-eight") {
    x = Math.sin(phase) * 0.82;
    y = Math.sin(phase * 2) * 0.48;
  }
  if (path === "focus-shift") scale = 1.25 + 0.55 * Math.sin(phase);
  if (path === "random") {
    const t =
      (((phase / (Math.PI / 2)) % points.length) + points.length) %
      points.length;
    const i = Math.floor(t);
    const f = (1 - Math.cos((t - i) * Math.PI)) / 2;
    const a = points[i],
      b = points[(i + 1) % points.length];
    x = a[0] + (b[0] - a[0]) * f;
    y = a[1] + (b[1] - a[1]) * f;
  }
  return { x, y, scale };
}
