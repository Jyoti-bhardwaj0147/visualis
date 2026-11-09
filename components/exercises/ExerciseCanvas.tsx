import { TrackingTarget } from "./TrackingTarget";
import { useMemo } from "react";
import { getTargetPosition } from "@/lib/motion-paths";
import type { ExercisePath, Speed, TargetSize } from "@/types/exercise";
export function ExerciseCanvas(props: {
  path: ExercisePath;
  speed: Speed;
  targetSize: TargetSize;
  elapsed: number;
  direction: number;
}) {
  const guide = useMemo(() => {
    if (props.path === "focus-shift") return "";
    // Random tracking visits all eight waypoints over two full turns.
    const period = props.path === "random" ? Math.PI * 4 : Math.PI * 2;
    return Array.from({ length: 257 }, (_, index) => {
      const { x, y } = getTargetPosition(props.path, (index / 256) * period);
      return `${index === 0 ? "M" : "L"}${(50 + x * 40).toFixed(4)},${(50 + y * 40).toFixed(4)}`;
    }).join(" ");
  }, [props.path]);
  const targetRadius = { small: 8, medium: 13, large: 19 }[props.targetSize];
  return (
    <div
      className="exercise-canvas"
      role="img"
      aria-label={`${props.path.replaceAll("-", " ")} tracking exercise. Follow the blue target comfortably.`}
    >
      <div className="canvas-axis horizontal" />
      <div className="canvas-axis vertical" />
      <svg
        className={`tracking-guide${props.path === "circular" ? " tracking-guide-circular" : ""}`}
        viewBox={props.path === "focus-shift" ? undefined : "0 0 100 100"}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {props.path === "focus-shift" ? (
          <>
            <circle cx="50%" cy="50%" r={targetRadius * 0.7} />
            <circle cx="50%" cy="50%" r={targetRadius * 1.8} />
          </>
        ) : (
          <path d={guide} vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      <TrackingTarget {...props} />
    </div>
  );
}
