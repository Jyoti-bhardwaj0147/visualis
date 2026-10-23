import { notFound } from "next/navigation";
import { exercises } from "@/lib/exercises";
import { ExerciseExperience } from "@/components/exercises/ExerciseExperience";
export function generateStaticParams() {
  return exercises.map((exercise) => ({ exercise: exercise.id }));
}
export default async function ExercisePage({
  params,
}: {
  params: Promise<{ exercise: string }>;
}) {
  const { exercise: id } = await params;
  const exercise = exercises.find((item) => item.id === id);
  if (!exercise) notFound();
  return <ExerciseExperience exercise={exercise} />;
}
