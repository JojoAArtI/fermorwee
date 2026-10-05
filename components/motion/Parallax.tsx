"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";

/** Drifts children vertically by `speed * 100px` over one pass through the viewport. Desktop only. */
export function Parallax({ children, speed = 0.2, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const d = speed * 50;
        gsap.fromTo(
          ref.current,
          { y: d },
          { y: -d, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
