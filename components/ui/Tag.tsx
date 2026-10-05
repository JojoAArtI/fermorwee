import type { ReactNode } from "react";

type Variant = "live" | "soon" | "preview" | "preview-light";

const styles: Record<Variant, string> = {
  live: "bg-mint text-ink",
  soon: "bg-white/10 text-white/70",
  preview: "border border-white/20 text-white/70",
  "preview-light": "border border-ink/15 text-ink/70",
};

/** Small uppercase status pill: LIVE, SOON, preview. */
export function Tag({ children, variant = "preview", className = "" }: { children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 font-ui text-[10.5px] font-semibold uppercase leading-none tracking-[.2em] ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
