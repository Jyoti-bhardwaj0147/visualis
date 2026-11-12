"use client";
import { useEffect, useState } from "react";
import { getSessions } from "@/lib/progress-storage";
import type { ExerciseSession } from "@/types/exercise";
export function useExerciseProgress() {
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let midnightTimer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(midnightTimer);
      setSessions(getSessions());
      setLoaded(true);
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      midnightTimer = setTimeout(update, midnight.getTime() - now.getTime());
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("visualis-progress", update);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(midnightTimer);
      window.removeEventListener("storage", update);
      window.removeEventListener("visualis-progress", update);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return { sessions, loaded };
}
