import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "mint" | "ink" | "ghost" | "ghost-ink";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  mint: "bg-mint text-ink hover:bg-[#8dfca3]",
  ink: "bg-ink text-white hover:bg-black",
  ghost: "border border-white/30 text-white hover:border-white/70 hover:bg-white/5",
  "ghost-ink": "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px] sm:text-base",
};

interface Common {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

export function buttonClass({ variant = "mint", size = "md", className = "" }: Pick<Common, "variant" | "size" | "className">) {
  return `group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-ui font-semibold lowercase tracking-[-.005em] transition-[background-color,border-color,transform] duration-300 ease-out-expo active:scale-[.98] disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
}

function Arrow() {
  return <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" strokeWidth={2} />;
}

/** Pill link. Use for navigation, including in-page anchors. */
export function ButtonLink({ variant, size, arrow, children, className, ...rest }: Common & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={buttonClass({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/** Pill button. Use for actions (submit, toggle). */
export function Button({ variant, size, arrow, children, className, type = "button", ...rest }: Common & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
