"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const fmt = (n: number, decimals: number) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` once, when 60% visible. The final value is server-rendered,
 * so crawlers, no-JS and reduced-motion users always see the real number.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    // Already on screen at load: leave the number alone rather than flash it to 0.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    const write = (n: number) => (el.textContent = `${prefix}${fmt(n, decimals)}${suffix}`);
    write(0);
    const state = { n: 0 };
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tween = gsap.to(state, { n: value, duration: 1.2, ease: "power2.out", onUpdate: () => write(state.n) });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
      write(value);
    };
  }, [value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
}

/** Shows `format(value)` and tweens between values when it changes (300ms). No tween under reduced motion. */
export function AnimatedNumber({ value, format, className, duration = 0.3 }: { value: number; format: (n: number) => string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || shown.current === value) {
      shown.current = value;
      el.textContent = format(value);
      return;
    }
    const state = { n: shown.current };
    const tween = gsap.to(state, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        shown.current = state.n;
        el.textContent = format(state.n);
      },
      onComplete: () => {
        shown.current = value;
        el.textContent = format(value);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, format, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
