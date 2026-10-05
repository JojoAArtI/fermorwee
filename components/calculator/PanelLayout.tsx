import type { ReactNode } from "react";

/** Inputs 5/12, result 7/12 on desktop; stacked on mobile. */
export function PanelLayout({ inputs, result }: { inputs: ReactNode; result: ReactNode }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="space-y-7 lg:col-span-5">{inputs}</div>
      <div className="min-w-0 lg:col-span-7">{result}</div>
    </div>
  );
}

/**
 * Font size that never lets a number overflow its column: the design size, or smaller when
 * `chars` characters wouldn't fit. Poppins 700 tabular digits are about 0.6em wide.
 * The parent must be an inline-size container.
 */
export const fitSize = (chars: number, max: string) => `min(${max}, calc(100cqw / ${(Math.max(chars, 4) * 0.6).toFixed(2)}))`;

/** The big number, with the mint glow behind it. `chars` is the length of the final formatted value. */
export function BigResult({ eyebrow, chars, children }: { eyebrow: string; chars: number; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <div className="relative mt-3 [container-type:inline-size]">
        <div aria-hidden className="glow-mint pointer-events-none absolute -left-8 top-1/2 h-[150%] w-[75%] -translate-y-1/2 opacity-70" />
        <p className="num relative whitespace-nowrap leading-none text-white" style={{ fontSize: fitSize(chars, "clamp(44px, 6vw, 88px)") }}>
          {children}
        </p>
      </div>
    </div>
  );
}

/** Polite, debounced announcement of the result for screen readers. */
export function LiveSummary({ text }: { text: string }) {
  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      {text}
    </p>
  );
}
