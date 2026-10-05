import { Lock, ShieldCheck, Tag as TagIcon, UserX } from "lucide-react";
import { WordReveal } from "@/components/motion/WordReveal";
import { Mark } from "@/components/ui/Mark";
import { privacy } from "@/content/home";

const ICONS = { lock: Lock, "user-x": UserX, tag: TagIcon };

export function Privacy() {
  return (
    <section aria-labelledby="privacy-title" className="hairline py-24 md:py-40">
      <div className="wrap flex flex-col items-center text-center">
        <div className="relative grid size-14 place-items-center" aria-hidden>
          <ShieldCheck className="size-14 text-white/90" strokeWidth={1.25} />
          <Mark className="absolute bottom-[-6px] right-[-10px] h-4 w-auto" />
        </div>
        <h2 id="privacy-title" className="eyebrow mt-8">
          {privacy.eyebrow}
        </h2>
        <WordReveal
          text={privacy.text}
          from={0.15}
          className="mt-8 max-w-[30ch] font-ui text-[clamp(24px,3.2vw,44px)] font-medium leading-[1.35] tracking-[-.01em] text-white"
        />
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {privacy.facts.map(({ icon, label }) => {
            const Icon = ICONS[icon];
            return (
              <li key={label} className="flex items-center gap-2 text-sm text-white/70">
                <Icon aria-hidden className="size-4 text-white/90" strokeWidth={1.5} />
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
