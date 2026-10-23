"use client";
import Link from "next/link";
import {
  Clock3,
  CheckCheck,
  Coffee,
  Flame,
  ArrowUpRight,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useExerciseProgress } from "@/hooks/useExerciseProgress";
import {
  clearProgress,
  getWeeklySessions,
  getWeeklyExerciseTime,
  getStreak,
} from "@/lib/progress-storage";
export function ProgressSummary({ full = false }: { full?: boolean }) {
  const { sessions, loaded } = useExerciseProgress();
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const weekly = getWeeklySessions(sessions);
  const exercises = weekly.filter((s) => s.exerciseType !== "eye-break");
  const seconds = getWeeklyExerciseTime(sessions);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = days.map((_, i) =>
    exercises
      .filter((s) => (new Date(s.completedAt).getDay() + 6) % 7 === i)
      .reduce((sum, s) => sum + s.duration, 0),
  );
  const max = Math.max(...values, 60);
  return (
    <div className="progress-panel" aria-busy={!loaded}>
      <div className="progress-stats">
        {[
          {
            icon: Clock3,
            value: Math.round((seconds / 60) * 10) / 10,
            unit: "min",
            label: "Exercise time",
          },
          {
            icon: CheckCheck,
            value: exercises.length,
            unit: "",
            label: "Sessions completed",
          },
          {
            icon: Coffee,
            value: weekly.filter((s) => s.exerciseType === "eye-break").length,
            unit: "",
            label: "Eye breaks taken",
          },
          {
            icon: Flame,
            value: getStreak(sessions),
            unit: getStreak(sessions) === 1 ? "day" : "days",
            label: "Current streak",
          },
        ].map(({ icon: Icon, value, unit, label }) => (
          <div className="stat" key={label}>
            <span className="stat-label">
              <Icon size={16} />
              {label}
            </span>
            <div>
              {loaded ? value : "—"} <small>{unit}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-heading">
        <h3>A little consistency goes a long way.</h3>
        <span>
          <i />
          Exercise minutes
        </span>
      </div>
      <div
        className="weekly-chart"
        role="img"
        aria-label={days
          .map(
            (day, i) =>
              `${day}: ${Math.round((values[i] / 60) * 10) / 10} minutes`,
          )
          .join(", ")}
      >
        {days.map((day, i) => (
          <div className="chart-column" key={day}>
            <span className="chart-value">
              {Math.round((values[i] / 60) * 10) / 10}
              <small> min</small>
            </span>
            <div className="bar-track">
              <div
                className="bar"
                style={{ height: `${(values[i] / max) * 100}%` }}
              />
            </div>
            <span className="day">{day}</span>
          </div>
        ))}
      </div>
      <div className="progress-bottom">
        <p>
          {!loaded
            ? "Loading your activity…"
            : sessions.length === 0
              ? "Your progress will appear here after your first exercise."
              : "Every small pause counts. Keep making time for yourself."}
        </p>
        <Link href="/exercises">
          {sessions.length ? "Keep your rhythm" : "Start your first session"}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      {full && (
        <div className="history">
          <h3>Session history</h3>
          {sessions.length === 0 ? (
            <p>No completed sessions yet.</p>
          ) : (
            <ul>
              {[...sessions].reverse().map((s) => (
                <li key={s.id}>
                  <span>{s.exerciseType.replaceAll("-", " ")}</span>
                  <span>
                    {s.duration}s ·{" "}
                    {new Date(s.completedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {sessions.length > 0 &&
            (confirm ? (
              <div className="clear-confirm">
                <p>Delete all activity saved on this browser?</p>
                <button
                  className="button danger"
                  onClick={() => {
                    if (clearProgress()) setConfirm(false);
                    else
                      setError(
                        "Your browser could not clear progress. Please try again.",
                      );
                  }}
                >
                  Delete all activity
                </button>
                <button
                  className="button secondary"
                  onClick={() => setConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="text-button" onClick={() => setConfirm(true)}>
                <Trash2 size={15} />
                Clear progress
              </button>
            ))}
          {error && <p role="alert">{error}</p>}
        </div>
      )}
    </div>
  );
}
