import { Pause, Play, Square, RotateCcw } from "lucide-react";
export function ExerciseControls({
  paused,
  onPause,
  onResume,
  onStop,
  onRestart,
}: {
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="focus-controls">
      <button className="button primary" onClick={paused ? onResume : onPause}>
        {paused ? <Play size={17} /> : <Pause size={17} />}{" "}
        {paused ? "Resume" : "Pause"}
      </button>
      <button className="button secondary" onClick={onStop}>
        <Square size={15} />
        Stop
      </button>
      <button
        className="icon-button"
        onClick={onRestart}
        aria-label="Restart exercise"
      >
        <RotateCcw size={19} />
      </button>
    </div>
  );
}
