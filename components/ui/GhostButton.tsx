import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** CRED-style uppercase ghost link: KNOW MORE → */
export function GhostButton({ children, className = "", ...rest }: { children: ReactNode; className?: string } & ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={`group/ghost inline-flex h-11 items-center gap-2.5 rounded-full border border-white/30 px-5 font-ui text-xs font-semibold uppercase tracking-[.25em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink ${className}`}
      {...rest}
    >
      {children}
      <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 ease-out-expo group-hover/ghost:translate-x-1" strokeWidth={2} />
    </a>
  );
}
