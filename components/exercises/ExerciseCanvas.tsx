import { TrackingTarget } from "./TrackingTarget";
import type { ExercisePath, Speed, TargetSize } from "@/types/exercise";
export function ExerciseCanvas(props: {
  path: ExercisePath;
  speed: Speed;
  targetSize: TargetSize;
  elapsed: number;
  direction: number;
}) {
  return (
    <div
      className="exercise-canvas"
      role="img"
      aria-label={`${props.path.replaceAll("-", " ")} tracking exercise. Follow the blue target comfortably.`}
    >
      <div className="canvas-axis horizontal" />
      <div className="canvas-axis vertical" />
      <TrackingTarget {...props} />
    </div>
  );
}
