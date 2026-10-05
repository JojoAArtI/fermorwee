"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/**
 * The phone video. Plays once and holds its last frame (the phone upright).
 * The poster is a real <Image priority> underneath, so it is the LCP element and shows
 * with JS off or under reduced motion; the video fades in only once it is playing.
 */
/** `className` sizes the box (aspect ratio / height); the video covers it, centred on the phone. */
export function HeroVideo({ className = "aspect-video w-full", sizes = "(min-width: 1024px) 45vw, 100vw" }: { className?: string; sizes?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // Start after the page has loaded, so decoding doesn't compete with first render.
    const start = () => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Pause while off screen; resume only if the user didn't pause it and it hasn't ended.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) v.pause();
      else if (!userPaused.current && !v.ended && v.currentTime > 0) v.play().catch(() => {});
    });
    io.observe(v);
    return () => {
      io.disconnect();
      window.removeEventListener("load", start);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/video/hero-poster.jpg"
        alt="The Fermor app home screen on an iPhone, showing a net worth of ₹12,48,230 and a rising chart"
        fill
        priority
        fetchPriority="high"
        sizes={sizes}
        className="object-cover"
      />
      <video
        ref={video}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${started ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero-1080.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-2 right-2 grid size-11 place-items-center rounded-full"
      >
        <span className="grid size-9 place-items-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink/15">
          {playing ? <Pause aria-hidden className="size-3.5" fill="currentColor" /> : <Play aria-hidden className="ml-0.5 size-3.5" fill="currentColor" />}
        </span>
      </button>
    </div>
  );
}
