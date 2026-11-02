"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";

// Edit these values to adjust homepage reveals (times are in seconds).
const reveal = { duration: 0.55, distance: 16, cardDelay: 0.12 };
const MotionLink = motion.create(Link);

export function HomeReveal({ children, className, afterLoader = false }: {
  children: ReactNode;
  className?: string;
  afterLoader?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -24px 0px" });
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(!afterLoader);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!afterLoader) return;
    const update = () => setReady(!document.documentElement.classList.contains("focus-orbit-intro"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [afterLoader]);

  const visible = reduceMotion || focused || (ready && inView);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : reveal.distance }}
      transition={{ duration: reduceMotion ? 0 : reveal.duration, ease: "easeOut" }}
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </motion.div>
  );
}

// Fade the whole card; its body and preview have no separate reveal animation.
export function HomeExerciseCard({ children, href, className, index }: {
  children: ReactNode;
  href: string;
  className: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -24px 0px" });
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const visible = reduceMotion || focused || inView;

  return (
    <MotionLink
      ref={ref}
      href={href}
      className={className}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        duration: reduceMotion || focused ? 0 : reveal.duration,
        delay: visible && !reduceMotion && !focused ? index * reveal.cardDelay : 0,
        ease: "easeOut",
      }}
      onFocus={() => setFocused(true)}
    >
      {children}
    </MotionLink>
  );
}
