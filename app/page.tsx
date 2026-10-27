import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  ScanEye,
  Coffee,
  ChartNoAxesCombined,
  MousePointer2,
  SlidersHorizontal,
  Eye,
  Leaf,
  Check,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ExerciseGrid } from "@/components/exercises/ExerciseGrid";
import { EyeBreak } from "@/components/home/EyeBreak";
import { ProgressSummary } from "@/components/progress/ProgressSummary";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="hero-background section-surface">
          <div className="hero-aurora" aria-hidden="true" />
          <section className="hero shell">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">
                <span className="status-dot" />A HEALTHIER SCREEN ROUTINE, ONE
                GAZE AT A TIME
              </span>
              <h1>
                Train Your
                <br />
                Visual Focus
                <br />
                with <span>Visualis.</span>
              </h1>
              <p>
                Simple guided eye-movement exercises designed for screen-time
                breaks, visual tracking practice, and healthier digital habits.
              </p>
              <div className="hero-actions">
                <Link href="/exercises/circular-focus" className="button primary">
                  <Play size={16} fill="currentColor" />
                  Start an Exercise
                  <ArrowUpRight size={17} />
                </Link>
                <Link href="#exercises" className="button secondary">
                  View Exercises
                  <ArrowRight size={17} />
                </Link>
              </div>
              <div className="hero-features">
                <span>
                  <ScanEye />
                  Guided Exercises
                </span>
                <span>
                  <Coffee />
                  Screen Breaks
                </span>
                <span>
                  <ChartNoAxesCombined />
                  Track Your Progress
                </span>
              </div>
            </div>
            <HeroVisual />
          </section>
        </div>

        {/* Choose Your Exercise Section */}
        <section className="section section-surface section-ink" id="exercises">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FIND YOUR FOCUS</span>
                <h2>Choose Your Exercise</h2>
                <p>Simple visual tracking exercises for focused screen breaks.
                  Choose a pattern, find your pace, and make a moment for yourself.</p>
              </div>
            </div>
            <ExerciseGrid />
          </div>
        </section>


        <section className="section section-surface" id="progress">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SMALL HABITS, VISIBLE PROGRESS</span>
                <h2>Your week in focus</h2>
                <p>Real moments, at your own pace. Your activity is stored only on this browser. </p>
              </div>

            </div>
            <div className="week-label">
              <span>This Week</span>
              <span>MONDAY — SUNDAY</span>
            </div>
            <ProgressSummary />
          </div>
        </section>

        {/* CTA */}
        <section className="closing section-surface section-ink">
          <div className="shell">
            <span className="eyebrow">YOUR NEXT PAUSE IS A GOOD ONE</span>
            <h2>
              A little focus.<span> A little calm.</span>
            </h2>
            <p>Build a screen routine that makes room for you.</p>
            <Link href="/exercises" className="button primary">
              Find Your Exercise
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
