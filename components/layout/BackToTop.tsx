"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const MotionArrowUp = motion.create(ArrowUp);

export function BackToTop() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        setProgress(height ? Math.min(100, Math.max(0, window.scrollY / height * 100)) : 0);
        setVisible(window.scrollY > 200);
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis && !reducedMotion) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <motion.button type="button" className={`back-to-top overflow-hidden${visible ? " is-visible" : ""}`} onClick={scrollToTop} aria-label="Back to top" tabIndex={visible ? 0 : -1} initial="idle" animate="idle" whileHover={reducedMotion ? undefined : "hover"}>
      <svg className="back-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="back-to-top-track" cx="24" cy="24" r="21" />
        <circle className="back-to-top-progress" cx="24" cy="24" r="21" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} />
      </svg>
      <MotionArrowUp
        size={19}
        aria-hidden="true"
        variants={{
          idle: { y: 0, opacity: 1, transition: { duration: 0.2 } },
          hover: {
            y: [0, -28, 28, 0],
            opacity: [1, 0, 0, 1],
            transition: { duration: 0.55, times: [0, 0.45, 0.46, 1], ease: "easeInOut" },
          },
        }}
      />
    </motion.button>
  );
}
