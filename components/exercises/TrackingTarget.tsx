import { getTargetPosition } from "@/lib/motion-paths";
import type { ExercisePath, Speed, TargetSize } from "@/types/exercise";
export function TrackingTarget({
  path,
  speed,
  targetSize,
  elapsed,
  direction,
}: {
  path: ExercisePath;
  speed: Speed;
  targetSize: TargetSize;
  elapsed: number;
  direction: number;
}) {
  const rates = { calm: 0.45, standard: 0.75, dynamic: 1.1 };
  const { x, y, scale } = getTargetPosition(
    path,
    elapsed * rates[speed] * direction,
  );
  const size = { small: 16, medium: 26, large: 38 }[targetSize];
  return (
    <span
      className="tracking-target"
      style={{
        // Equal radii keep the circular path round on wide and tall canvases.
        left: path === "circular" ? `calc(50% + ${x} * min(40cqw, 40cqh))` : `${50 + x * 40}%`,
        top: path === "circular" ? `calc(50% + ${y} * min(40cqw, 40cqh))` : `${50 + y * 40}%`,
        width: size,
        height: size,
        transform: `translate(-50%,-50%) scale(${scale})`,
      }}
    />
  );
}
