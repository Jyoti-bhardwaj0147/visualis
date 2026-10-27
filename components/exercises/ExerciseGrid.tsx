import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { exercises } from "@/lib/exercises";
import { ExercisePreview } from "./ExercisePreview";
export function ExerciseGrid() {
  return (
    <div className="exercise-grid">
      {exercises.map((exercise, i) => (
        <Link
          href={`/exercises/${exercise.id}`}
          className={`exercise-card tone-${i}`}
          key={exercise.id}
        >
          <div className="preview-box">
            <ExercisePreview path={exercise.path} />
            <span className="preview-tag">{exercise.tag}</span>
          </div>
          <div className="exercise-card-body">
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <div className="card-bottom">             
              <span className="start-link">
                Start <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
