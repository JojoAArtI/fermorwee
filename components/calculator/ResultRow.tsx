import type { ReactNode } from "react";

/** One hairline-separated result line: label left, value right. */
export function ResultRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-3.5">
      <dt className="text-[15px] text-white/70">{label}</dt>
      <dd className="num text-[17px] tracking-[-.02em] text-white">{children}</dd>
    </div>
  );
}
