import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Native disclosure with the formula and the user's numbers substituted. */
export function ShowTheMath({ children }: { children: ReactNode }) {
  return (
    <details className="group mt-6 border-t border-line pt-4">
      <summary className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full font-ui text-sm font-medium text-white/90 hover:text-white">
        show the math
        <ChevronDown aria-hidden className="chev size-4 transition-transform duration-300 ease-out-expo" />
      </summary>
      <div className="mt-3 space-y-3 rounded-2xl bg-white/[.03] p-4 text-[14px] leading-[1.9] text-white/80 [font-variant-numeric:tabular-nums] sm:p-5">
        {children}
      </div>
    </details>
  );
}

/** One line of the worked math. */
export function MathLine({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return <p className={muted ? "text-white/60" : "text-white/90"}>{children}</p>;
}

/** Superscript exponent that screen readers read as "to the power of". */
export function Pow({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="sr-only"> to the power of </span>
      <sup>{children}</sup>
    </>
  );
}
