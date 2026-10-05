"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";

/** The hero sheet shrinks, rounds and dims as it scrolls away, handing over to the dark page. */
export function LightsOff({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        gsap.to(ref.current, {
          scale: 0.94,
          borderRadius: 48,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
