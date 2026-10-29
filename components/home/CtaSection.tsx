"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

function WaterWavesBackground() {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="cta-waves" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-current`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4979d4" stopOpacity="0" />
          <stop offset=".34" stopColor="#6098ee" stopOpacity=".65" />
          <stop offset=".68" stopColor="#9ccfff" stopOpacity=".7" />
          <stop offset="1" stopColor="#5686e3" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-mist`}>
          <stop stopColor="#6ba6f5" stopOpacity=".42" />
          <stop offset="1" stopColor="#345fae" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="16" /></filter>
      </defs>
      <ellipse cx="310" cy="250" rx="570" ry="190" fill={`url(#${id}-mist)`} />
      <g data-wave="primary" filter={`url(#${id}-blur)`}>
        <path d="M-180 365 C110 230 270 365 520 310 S920 200 1180 285 S1510 330 1640 235 L1640 340 C1390 425 1250 345 1050 335 S710 385 465 380 S75 300 -180 440Z" fill={`url(#${id}-current)`} opacity=".7" />
      </g>
      <g data-wave="secondary" filter={`url(#${id}-blur)`}>
        <path d="M-160 260 C120 355 310 225 550 285 S920 420 1190 325 S1480 270 1630 320 L1630 390 C1430 335 1320 425 1080 400 S700 335 490 340 S80 420 -160 330Z" fill={`url(#${id}-current)`} opacity=".45" />
      </g>
      <g data-wave="haze" className="cta-haze" filter={`url(#${id}-blur)`}>
        <path d="M-170 455 C180 335 360 470 650 420 S1050 350 1300 420 S1510 440 1640 400 L1640 510 C1300 460 1170 500 920 470 S470 520 220 475 S-20 520 -170 530Z" fill={`url(#${id}-current)`} opacity=".32" />
      </g>
    </svg>
  );
}

export function CtaSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    let observer: IntersectionObserver | undefined;

    const setup = () => {
      observer?.disconnect();
      context?.revert();
      if (motion.matches) return;
      context = gsap.context(() => {
        const waves = [
          gsap.to('[data-wave="primary"]', { xPercent: 4, duration: 12, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true }),
          gsap.to('[data-wave="secondary"]', { xPercent: -3, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true }),
          gsap.to('[data-wave="haze"]', { y: 6, duration: 12, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true }),
          gsap.to('[data-wave="primary"] path', {
            attr: { d: "M-180 345 C110 310 270 245 520 330 S920 270 1180 240 S1510 370 1640 260 L1640 365 C1390 395 1250 300 1050 365 S710 345 465 400 S75 330 -180 420Z" },
            duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true,
          }),
          gsap.to('[data-wave="secondary"] path', {
            attr: { d: "M-160 300 C120 270 310 355 550 310 S920 340 1190 285 S1480 350 1630 290 L1630 365 C1430 400 1320 350 1080 375 S700 390 490 315 S80 375 -160 360Z" },
            duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true,
          }),
        ];
        let revealed = false;
        observer = new IntersectionObserver(([entry]) => {
          waves.forEach((wave) => entry.isIntersecting ? wave.play() : wave.pause());
          if (entry.isIntersecting && !revealed) {
            revealed = true;
            context?.add(() => {
              gsap.fromTo('[data-cta-reveal]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power2.out", clearProps: "opacity,transform" });
            });
          }
        }, { threshold: 0.1 });
        observer.observe(section);
      }, section);
    };
    setup();
    motion.addEventListener("change", setup);
    return () => { motion.removeEventListener("change", setup); observer?.disconnect(); context?.revert(); };
  }, []);

  return (
    <section ref={root} className="cta-section">
      <WaterWavesBackground />
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-content">
        <span className="eyebrow cta-eyebrow" data-cta-reveal>YOUR NEXT PAUSE IS A GOOD ONE</span>
        <h2 data-cta-reveal>Slow down. <span>Feel renewed.</span></h2>
        <p data-cta-reveal>Build a screen routine that makes room for you.</p>        
      </div>
    </section>
  );
}
