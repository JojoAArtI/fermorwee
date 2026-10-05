"use client";

import { useEffect, useRef, useState } from "react";
import { ANY_MOTION, gsap, useGSAP } from "@/lib/gsap";

interface WordRevealProps {
  text: string;
  as?: "p" | "h2";
  id?: string;
  className?: string;
  /** Opacity each word starts from once the effect runs. */
  from?: number;
  /** Opacity of the whole text when the effect doesn't run (no JS, reduced motion). */
  restOpacity?: number;
}

/**
 * Words light up one by one as the text scrolls through the viewport.
 * The full sentence is server-rendered; it is split into word spans only on the client,
 * and only when motion is allowed. Screen readers get the sentence once, unsplit.
 */
export function WordReveal({ text, as: Tag = "p", id, className = "", from = 0.25, restOpacity = 0.7 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    // Split after hydration so server and client markup match.
    if (window.matchMedia(ANY_MOTION).matches) setSplit(true);
  }, []);

  useGSAP(
    () => {
      if (!split || !ref.current) return;
      const words = ref.current.querySelectorAll("[data-word]");
      gsap.fromTo(
        words,
        { opacity: from },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref, dependencies: [split] },
  );

  const words = text.split(/(\s+)/);

  return (
    <Tag ref={ref as never} id={id} className={className} style={{ opacity: split ? 1 : restOpacity }}>
      {split ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {words.map((w, i) =>
              /^\s+$/.test(w) ? w : (
                <span key={i} data-word className="inline-block" style={{ opacity: from }}>
                  {w}
                </span>
              ),
            )}
          </span>
        </>
      ) : (
        text
      )}
    </Tag>
  );
}
