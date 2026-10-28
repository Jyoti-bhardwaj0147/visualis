import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
export const metadata = { title: "About" };
export default function About() {
  return (
    <>
      <main className="shell prose-page">
        <span className="eyebrow">A LITTLE SPACE FOR YOU</span>
        <h1>
          Better screen habits.
          <br />
          One small pause at a time.
        </h1>
        <p className="lead">
          Visualis makes it simple to step out of autopilot and bring a little
          intention to your screen routine.
        </p>
        <h2>Focus without the pressure</h2>
        <p>
          Explore six guided movement patterns, adjust your pace, and follow a
          target comfortably. There are no performance scores, rankings, or
          goals to chase. A session is simply a moment you set aside for
          yourself.
        </p>
        <h2>Built for your everyday</h2>
        <p>
          Use the 20-20-20 timer to make room for screen breaks, and see your
          completed activity across the week. Progress stays on your device,
          without an account.
        </p>
        <h2>Wellness, with clear boundaries</h2>
        <p>
          Visualis is designed for general wellness and visual-focus exercises.
          It does not measure eyesight, diagnose eye conditions, or claim to
          improve vision. It does not replace professional eye care. Stop any
          exercise that feels uncomfortable.
        </p>
        <Link href="/exercises" className="button primary">
          Explore the exercises
        </Link>
      </main>
      <Footer />
    </>
  );
}
