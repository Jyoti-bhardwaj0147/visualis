"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Play, SlidersHorizontal, Eye, Info } from "lucide-react";
import { useExerciseSession } from "@/hooks/useExerciseSession";
import { saveSession } from "@/lib/progress-storage";
import type { Exercise, Speed, TargetSize } from "@/types/exercise";
import { ExercisePreview } from "./ExercisePreview";
import { ExerciseCanvas } from "./ExerciseCanvas";
import { ExerciseControls } from "./ExerciseControls";
import { ExerciseTimer } from "./ExerciseTimer";
import { SessionComplete } from "./SessionComplete";
function Options<T extends string | number>({
  label,
  values,
  value,
  onChange,
}: {
  label: string;
  values: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="option-group">
      <legend>{label}</legend>
      <div>
        {values.map((option) => (
          <button
            key={option.value}
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
            className={option.value === value ? "option selected" : "option"}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
export function ExerciseExperience({ exercise }: { exercise: Exercise }) {
  const [duration, setDuration] = useState(60);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [size, setSize] = useState<TargetSize>("medium");
  const [direction, setDirection] = useState(1);
  const [saved, setSaved] = useState<boolean | null>(null);
  const session = useExerciseSession(duration);
  const sessionId = useRef("");
  const savedId = useRef("");
  const focusHeading = useRef<HTMLHeadingElement>(null);
  const start = () => {
    sessionId.current = crypto.randomUUID();
    setSaved(null);
    session.start();
  };
  useEffect(() => {
    if (
      session.status === "complete" &&
      savedId.current !== sessionId.current
    ) {
      savedId.current = sessionId.current;
      setSaved(
        saveSession({
          id: sessionId.current,
          exerciseType: exercise.id,
          duration,
          completedAt: new Date().toISOString(),
        }),
      );
    }
  }, [session.status, exercise.id, duration]);
  useEffect(() => {
    if (session.status === "running" || session.status === "complete")
      focusHeading.current?.focus();
  }, [session.status]);
  if (session.status === "complete")
    return (
      <main className="focus-screen">
        <h2 ref={focusHeading} tabIndex={-1} className="sr-only">
          Session complete
        </h2>
        <SessionComplete
          name={exercise.name}
          duration={duration}
          saved={saved}
          onRepeat={start}
        />
      </main>
    );
  if (session.status !== "setup")
    return (
      <main className="focus-screen">
        <div className="focus-top">
          <span className="brand">
            <Eye size={23} />
            visualis.
          </span>
          <span className="focus-mode-label">FOCUS MODE</span>
          <ExerciseTimer remaining={session.remaining} />
        </div>
        <h1 className="focus-title" ref={focusHeading} tabIndex={-1}>
          {exercise.name}
        </h1>
        <p className="focus-instruction" aria-live="polite">
          {session.status === "paused"
            ? "Paused. Take your time."
            : "Relax your shoulders. Follow the dot comfortably."}
        </p>
        <ExerciseCanvas
          path={exercise.path}
          speed={speed}
          targetSize={size}
          elapsed={session.elapsed}
          direction={direction}
        />
        <ExerciseControls
          paused={session.status === "paused"}
          onPause={session.pause}
          onResume={session.resume}
          onStop={session.stop}
          onRestart={start}
        />
        <p className="focus-footnote">
          Stop whenever you feel uncomfortable. There is no score to chase.
        </p>
      </main>
    );
  return (
    <main className="shell setup-page">
      <Link href="/exercises" className="back-link">
        <ArrowLeft size={16} />
        All exercises
      </Link>
      <div className="setup-grid">
        <div className="setup-intro">
          <span className="eyebrow">MAKE A MOMENT FOR YOURSELF</span>
          <h1>{exercise.name}</h1>
          <p>{exercise.description}</p>
          <div className="setup-preview">
            <ExercisePreview path={exercise.path} />
          </div>
          <p className="comfort-note">
            <Info size={18} />
            Sit comfortably, keep your head relaxed, and follow with your eyes.
            Choose a pace that feels easy.
          </p>
        </div>
        <div className="setup-card">
          <h2>
            <SlidersHorizontal size={20} />
            Your session, your pace.
          </h2>
          <p>A few small adjustments, then a little focus.</p>
          <Options
            label="Duration"
            value={duration}
            onChange={setDuration}
            values={[
              { value: 30, label: "30 sec" },
              { value: 60, label: "60 sec" },
              { value: 90, label: "90 sec" },
              { value: 120, label: "2 min" },
            ]}
          />
          <Options
            label="Speed"
            value={speed}
            onChange={setSpeed}
            values={[
              { value: "calm", label: "Calm" },
              { value: "standard", label: "Standard" },
              { value: "dynamic", label: "Dynamic" },
            ]}
          />
          <Options
            label="Target size"
            value={size}
            onChange={setSize}
            values={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
          />
          {exercise.path === "circular" && (
            <Options
              label="Direction"
              value={direction}
              onChange={setDirection}
              values={[
                { value: 1, label: "Clockwise" },
                { value: -1, label: "Counterclockwise" },
              ]}
            />
          )}
          <button className="button primary start-session" onClick={start}>
            <Play size={17} />
            Start Exercise
          </button>
          <small>Motion begins only when you are ready.</small>
        </div>
      </div>
    </main>
  );
}
