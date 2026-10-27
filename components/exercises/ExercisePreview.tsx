import type { ExercisePath } from "@/types/exercise";
export function ExercisePreview({ path }: { path: ExercisePath }) {
  return (
    <svg
      viewBox="0 0 280 130"
      fill="none"
      aria-hidden="true"
      className="exercise-preview"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6">
        {path === "circular" && <ellipse cx="140" cy="65" rx="49" ry="47" />}
        {path === "horizontal" && <path d="M48 65H232" />}
        {path === "vertical" && <path d="M140 16V114" />}
        {path === "figure-eight" && (
          <path d="M140 65C200 -15 244 35 215 73C173 127 109 8 67 48C25 92 80 141 140 65Z" />
        )}
        {path === "focus-shift" && (
          <>
            <circle cx="140" cy="65" r="45" />
            <circle cx="140" cy="65" r="29" />
          </>
        )}
        {path === "random" && <path d="M65 90L103 32L183 96L217 38L140 65" />}
      </g>
      <g className="exercise-preview-target">
        <circle
          cx={
            path === "horizontal"
              ? 192
              : path === "circular"
                ? 180
                : path === "random"
                  ? 217
                  : 140
          }
          cy={
            path === "vertical"
              ? 35
              : path === "circular"
                ? 38
                : path === "random"
                  ? 38
                  : 65
          }
          r="15"
          fill="currentColor"
          opacity=".10"
        />
        <circle
          cx={
            path === "horizontal"
              ? 192
              : path === "circular"
                ? 180
                : path === "random"
                  ? 217
                  : 140
          }
          cy={
            path === "vertical"
              ? 35
              : path === "circular"
                ? 38
                : path === "random"
                  ? 38
                  : 65
          }
          r={path === "focus-shift" ? 12 : 7}
          fill="currentColor"
        />
      </g>
      {path === "horizontal" && (
        <>
          <circle cx="48" cy="65" r="3" fill="currentColor" opacity=".4" />
          <circle cx="232" cy="65" r="3" fill="currentColor" opacity=".4" />
        </>
      )}
    </svg>
  );
}
