"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0,
        );
        setProgress(
          scrollableHeight > 0
            ? Math.min(100, (window.scrollY / scrollableHeight) * 100)
            : 0,
        );
        setVisible(window.scrollY > 200);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis && !reduceMotion) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={visible ? "back-to-top visible" : "back-to-top"}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg className="back-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="back-to-top-track" cx="24" cy="24" r="21" />
        <circle
          className="back-to-top-progress"
          cx="24"
          cy="24"
          r="21"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
        />
      </svg>
      <ArrowUp className="back-to-top-arrow" size={19} aria-hidden="true" />
    </button>
  );
}
