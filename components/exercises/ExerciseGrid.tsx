import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { exercises } from "@/lib/exercises";
import { ExercisePreview } from "./ExercisePreview";
import { HomeExerciseCard } from "@/components/home/HomeAnimations";
export function ExerciseGrid({ animated = false }: { animated?: boolean }) {
  return (
    <div className="exercise-grid">
      {exercises.map((exercise, i) => {
        const content = (
          <>
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
          </>
        );
        const props = {
          href: `/exercises/${exercise.id}`,
          className: `exercise-card tone-${i}`,
        };
        return animated ? (
          <HomeExerciseCard key={exercise.id} {...props} index={i}>{content}</HomeExerciseCard>
        ) : (
          <Link key={exercise.id} {...props}>{content}</Link>
        );
      })}
    </div>
  );
}
