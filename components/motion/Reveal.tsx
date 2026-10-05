"use client";

import { useRef, type ReactNode } from "react";
import { ANY_MOTION, gsap, useGSAP } from "@/lib/gsap";

/** Default section entrance: fade + 24px rise, 0.9s, once. Children with [data-reveal] stagger. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        const el = ref.current!;
        const items = el.querySelectorAll("[data-reveal]");
        gsap.from(items.length ? items : el, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
