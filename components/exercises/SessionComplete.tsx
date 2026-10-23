import Link from "next/link";
import { Check, RotateCcw, ArrowRight } from "lucide-react";
export function SessionComplete({
  name,
  duration,
  saved,
  onRepeat,
}: {
  name: string;
  duration: number;
  saved: boolean | null;
  onRepeat: () => void;
}) {
  return (
    <div className="completion">
      <span className="complete-icon">
        <Check size={35} />
      </span>
      <span className="eyebrow">A SMALL PAUSE, WELL SPENT</span>
      <h1>Session Complete</h1>
      <p>You made a little space for yourself.</p>
      <div className="completion-detail">
        <strong>{name}</strong>
        <span>{duration} seconds completed</span>
      </div>
      <p role="status" className="save-status">
        {saved === null
          ? "Saving your session…"
          : saved
            ? "Your session is saved on this browser."
            : "Session complete, but your browser could not save it. Check your storage settings."}
      </p>
      <div className="completion-actions">
        <button className="button primary" onClick={onRepeat}>
          <RotateCcw size={16} />
          Repeat Exercise
        </button>
        <Link href="/exercises" className="button secondary">
          Back to Exercises
          <ArrowRight size={16} />
        </Link>
      </div>
      <p className="rest-note">
        Before you continue, take a moment to look away from your screen.
      </p>
    </div>
  );
}
