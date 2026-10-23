"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export function useExerciseSession(duration: number) {
  const [status, setStatus] = useState<
    "setup" | "running" | "paused" | "complete"
  >("setup");
  const [elapsed, setElapsed] = useState(0);
  const clock = useRef(0);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (status !== "running") return;
    let frame: number;
    last.current = null;
    const tick = (now: number) => {
      if (last.current !== null)
        clock.current += Math.min(now - last.current, 100) / 1000;
      last.current = now;
      setElapsed(Math.min(clock.current, duration));
      if (clock.current >= duration) {
        setStatus("complete");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status, duration]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden) setStatus((s) => (s === "running" ? "paused" : s));
    };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, []);
  const start = useCallback(() => {
    clock.current = 0;
    setElapsed(0);
    setStatus("running");
  }, []);
  return {
    status,
    elapsed,
    remaining: Math.ceil(duration - elapsed),
    start,
    pause: () => setStatus("paused"),
    resume: () => setStatus("running"),
    stop: () => {
      clock.current = 0;
      setElapsed(0);
      setStatus("setup");
    },
  };
}
