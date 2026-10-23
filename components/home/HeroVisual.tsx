"use client";
import { motion, useReducedMotion } from "motion/react";
import { Eye, Sparkles } from "lucide-react";
export function HeroVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="hero-visual">
      <div className="visual-label">
        <span className="status-dot" /> YOUR MOMENT OF FOCUS
      </div>
      <div className="orbital">
        <div className="orbit-ring outer" />
        <div className="orbit-ring middle" />
        <div className="orbit-ring inner" />
        <div className="eye-core">
          <Eye strokeWidth={1.1} />
        </div>
        <motion.div
          className="orbit-spinner"
          animate={reduced !== false ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        >
          <span className="orbit-dot" />
        </motion.div>
        <span className="orbit-cross cross-one">+</span>
        <span className="orbit-cross cross-two">+</span>
      </div>
      
    </div>
  );
}
