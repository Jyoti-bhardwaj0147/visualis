"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!preference.matches);

    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return enabled ? <ReactLenis root /> : null;
}
