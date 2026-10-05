import { WordReveal } from "@/components/motion/WordReveal";
import { manifesto } from "@/content/home";

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="py-24 md:py-40">
      <div className="wrap">
        <div className="mx-auto max-w-[820px]">
          <h2 id="manifesto-title" className="eyebrow">
            {manifesto.eyebrow}
          </h2>
          <WordReveal text={manifesto.text} className="manifesto mt-8 text-white md:mt-10" />
          <p className="mt-12 font-ui text-sm font-medium text-white/50">{manifesto.signature}</p>
        </div>
      </div>
    </section>
  );
}
