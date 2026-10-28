import { Footer } from "@/components/layout/Footer";
import { ExerciseGrid } from "@/components/exercises/ExerciseGrid";
export const metadata = { title: "Exercises" };
export default function Exercises() {
  return (
    <>
      <main className="shell section route-page">
        <span className="eyebrow">FIND YOUR FOCUS</span>
        <h1>Choose Your Exercise</h1>
        <p className="page-description">
          Simple visual tracking exercises for focused screen breaks.
          <br />
          Choose a pattern, find your pace, and make a moment for yourself.
        </p>
        <ExerciseGrid />
      </main>
      <Footer />
    </>
  );
}
