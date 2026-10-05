"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  year: number;
  invested: number;
  value: number;
}

const W = 600;
const H = 120;
const PAD = 4;

/** Area chart of projected value with a dashed invested line. The line draws once on first view. */
export function Sparkline({ points, label }: { points: Point[]; label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // Drawn by default (no JS, reduced motion); undrawn only while waiting to animate.
  const [drawn, setDrawn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setDrawn(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => setDrawn(true));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const last = points[points.length - 1];
  const max = Math.max(1, ...points.map((p) => p.value));
  const n = Math.max(1, points.length - 1);
  const x = (i: number) => (i / n) * W;
  const y = (v: number) => H - PAD - (v / max) * (H - PAD * 2);

  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const invested = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.invested).toFixed(1)}`).join(" ");

  return (
    <figure>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-[120px] w-full overflow-visible" role="img" aria-label={label}>
        <path d={area} fill="rgb(117 251 144 / .15)" className={`transition-opacity duration-700 ${drawn ? "opacity-100" : "opacity-0"}`} />
        <path d={invested} fill="none" stroke="rgb(255 255 255 / .25)" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
        <path
          d={line}
          fill="none"
          stroke="#75FB90"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={drawn ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
      <figcaption className="mt-2 flex justify-between text-xs text-white/50">
        <span>today</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-px w-4 border-t border-dashed border-white/40" /> invested
          </span>
          <span>year {last?.year ?? 0}</span>
        </span>
      </figcaption>
    </figure>
  );
}
