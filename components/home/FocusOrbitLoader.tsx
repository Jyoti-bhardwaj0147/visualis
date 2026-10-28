"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FocusOrbitLoader() {
  const root = useRef<HTMLDivElement>(null);
  const cleanupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (cleanupTimer.current !== null) {
      clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    const element = root.current;
    const html = document.documentElement;
    if (!element || !html.classList.contains("focus-orbit-intro")) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => html.classList.remove("focus-orbit-intro");
    if (preference.matches) {
      finish();
      return;
    }
    try {
      window.sessionStorage.setItem("visualis-focus-orbit-v2-seen", "1");
    } catch {
      // Storage can be unavailable in restricted browsing modes.
    }

    const context = gsap.context(() => {
      gsap.timeline({ onComplete: finish })
        .fromTo(".focus-orbit__traveler", { rotation: -65 }, { rotation: 235, duration: 0.95, ease: "power1.inOut" }, 0.1)
        .to(".focus-orbit__wordmark", { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.45)
        .to(".focus-orbit__tagline", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.65)
        .to(element, { autoAlpha: 0, y: -8, duration: 0.35, ease: "power2.inOut" }, 1.15);
    }, element);

    const onPreferenceChange = () => {
      if (preference.matches) {
        context.revert();
        finish();
      }
    };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      preference.removeEventListener("change", onPreferenceChange);
      context.revert();
      // Defer removal so React's development effect remount can restart the intro.
      cleanupTimer.current = setTimeout(finish, 0);
    };
  }, []);

  return (
    <div className="focus-orbit" ref={root} aria-hidden="true">
      <div className="focus-orbit__content">
        <div className="focus-orbit__mark">
          <svg viewBox="0 0 128 128" fill="none" aria-hidden="true">
            <circle cx="64" cy="64" r="48" stroke="var(--line)" strokeWidth="1.5" />
            <circle cx="64" cy="64" r="4" fill="var(--blue)" opacity="0.7" />
          </svg>
          <span className="focus-orbit__traveler"><span /></span>
        </div>
        <div className="focus-orbit__wordmark">visualis<span>.</span></div>
        <p className="focus-orbit__tagline">A little focus. A little calm.</p>
      </div>
    </div>
  );
}
