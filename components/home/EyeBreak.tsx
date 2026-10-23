"use client";
import { useEffect, useRef, useState } from "react";
import { Coffee, Play, Pause, RotateCcw, Check } from "lucide-react";
import { saveSession } from "@/lib/progress-storage";
import { nextBreakPhase, secondsUntil, type BreakPhase } from "@/lib/break-timer";
export function EyeBreak() {
  const [remaining, setRemaining] = useState(1200);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<BreakPhase>("focus");
  const [error, setError] = useState(false);
  const deadline = useRef(0);
  const id = useRef("");
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      const next = secondsUntil(deadline.current, Date.now());
      setRemaining(next);
      if (next === 0) {
        setRunning(false);
        const nextState = nextBreakPhase(phase);
        setPhase(nextState.phase);
        setRemaining(nextState.seconds);
        if (phase === "break") {
          setError(
            !saveSession({
              id: id.current,
              exerciseType: "eye-break",
              duration: 20,
              completedAt: new Date().toISOString(),
            }),
          );
        }
      }
    }, 200);
    return () => clearInterval(timer);
  }, [running, phase]);
  const reset = () => {
    setRunning(false);
    setRemaining(1200);
    setPhase("focus");
    setError(false);
  };
  return (
    <section id="eye-break" className="eye-break section shell">
      <div className="break-copy">
        <span className="eyebrow">
          <Coffee size={16} /> A LITTLE SPACE FROM YOUR SCREEN
        </span>
        <h2>
          Look away.
          <br />
          <span>Come back refreshed.</span>
        </h2>
        <h3>20-20-20 Eye Break</h3>
        <p>
          Every 20 minutes, take a 20-second break and look at something about
          20 feet away.
        </p>
        <span className="break-footnote">
          Your next good habit starts with a small pause.
        </span>
      </div>
      <div className="break-timer">
        <span className="timer-label">
          {phase === "focus"
            ? "TIME UNTIL YOUR NEXT BREAK"
            : phase === "break"
              ? "LOOK AT SOMETHING ABOUT 20 FEET AWAY"
              : "A MOMENT WELL SPENT"}
        </span>
        <div className="timer-digits" role="timer">
          {phase === "done" ? (
            <Check size={70} />
          ) : (
            <>
              {String(Math.floor(remaining / 60)).padStart(2, "0")}
              <span>:</span>
              {String(remaining % 60).padStart(2, "0")}
            </>
          )}
        </div>
        <p aria-live="polite">
          {phase === "focus"
            ? "A gentle reminder to give your screen a rest."
            : phase === "break"
              ? running
                ? "Enjoy your break. You can look away now."
                : "Ready? Start your 20-second break."
              : "Eye break complete. Welcome back."}
        </p>
        <div className="timer-actions">
          {phase !== "done" && (
            <button
              className="button dark"
              onClick={() => {
                if (!id.current) id.current = crypto.randomUUID();
                if (!running) deadline.current = Date.now() + remaining * 1000;
                setRunning(!running);
              }}
            >
              {running ? <Pause size={16} /> : <Play size={16} />}{" "}
              {running
                ? "Pause"
                : phase === "break"
                  ? "Start Break"
                  : remaining < 1200
                    ? "Resume"
                    : "Start Timer"}
            </button>
          )}
          <button
            className="icon-button reset-button"
            onClick={() => {
              id.current = "";
              reset();
            }}
            aria-label="Reset eye break timer"
          >
            <RotateCcw size={18} />
          </button>
        </div>
        {error && (
          <p role="alert">
            Break complete, but browser storage is unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
