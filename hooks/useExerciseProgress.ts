"use client";
import { useEffect, useState } from "react";
import { getSessions } from "@/lib/progress-storage";
import type { ExerciseSession } from "@/types/exercise";
export function useExerciseProgress() {
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const update = () => {
      setSessions(getSessions());
      setLoaded(true);
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("visualis-progress", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("visualis-progress", update);
    };
  }, []);
  return { sessions, loaded };
}
