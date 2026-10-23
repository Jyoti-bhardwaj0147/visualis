export function ExerciseTimer({ remaining }: { remaining: number }) {
  return (
    <span
      className="session-timer"
      role="timer"
      aria-label={`${remaining} seconds remaining`}
    >
      {String(Math.floor(remaining / 60)).padStart(2, "0")}:
      {String(remaining % 60).padStart(2, "0")}
    </span>
  );
}
