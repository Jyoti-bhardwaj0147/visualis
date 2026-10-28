"use client";

import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const updateYear = () => setYear(new Date().getFullYear());
    updateYear();
    const timer = window.setInterval(updateYear, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Visualis home">
            <span className="brand-icon"><Eye size={23} /></span>
            visualis<span className="brand-period">.</span>
          </Link>
          <p className="footer-tagline">A little focus. A little calm.</p>
          <p className="footer-description">Simple guided exercises for a more mindful screen routine.</p>
        </div>

        <nav className="footer-explore" aria-label="Footer navigation">
          <h2>Explore</h2>
          <Link href="/exercises">Exercises</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="footer-cta">
          <h2>Your next pause</h2>
          <p>Make a little room for focus.</p>
          <Link className="button primary footer-cta-button" href="/exercises">
            Start an Exercise <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <section className="footer-disclaimer" aria-label="Wellness information">
        <p>Visualis is designed for general wellness and visual-focus exercises. It is not a medical diagnostic tool and does not replace professional eye care.</p>
      </section>

      <div className="footer-bottom">
        <span suppressHydrationWarning>© {year ?? new Date().getFullYear()} Visualis. All rights reserved.</span>
      </div>
    </footer>
  );
}
