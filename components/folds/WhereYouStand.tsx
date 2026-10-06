import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { whereYouStand as copy } from "@/content/home";

type CardKey = keyof typeof copy.cards;

// Desktop collage: position (% of the collage box), width, tilt and drift speed per card.
const COLLAGE: Array<{ key: CardKey; className: string; rotate: number; speed: number }> = [
  { key: "assets", className: "z-[1] left-[35%] top-[4%] w-[31%]", rotate: 2, speed: 0.1 },
  { key: "income", className: "z-[2] left-0 top-[6%] w-[48%]", rotate: -4, speed: 0.25 },
  { key: "investments", className: "z-[3] right-0 top-[24%] w-[49%]", rotate: 4, speed: 0.18 },
  { key: "expenses", className: "z-[2] left-[3%] top-[47%] w-[38%]", rotate: -2, speed: 0.35 },
  { key: "goals", className: "z-[4] right-[5%] top-[66%] w-[46%]", rotate: 5, speed: 0.28 },
];

function Card({ k, sizes, className = "" }: { k: CardKey; sizes: string; className?: string }) {
  const c = copy.cards[k];
  return <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes={sizes} className={`h-auto w-full rounded-[20px] ${className}`} />;
}

export function WhereYouStand() {
  return (
    <section aria-labelledby="stand-title" className="hairline overflow-hidden py-24 md:py-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p data-reveal className="eyebrow">{copy.eyebrow}</p>
          <h2 data-reveal id="stand-title" className="display-md mt-5">
            {copy.title}
          </h2>
          <p data-reveal className="body-lg mt-6 max-w-[46ch]">{copy.body}</p>
          <ul data-reveal className="mt-8 space-y-3.5">
            {copy.points.map((p) => (
              <li key={p} className="flex items-start gap-3.5 text-base leading-relaxed text-white/70">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-mint" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative lg:col-span-7">
          <Tag className="absolute -top-2 right-0 z-10 md:right-2">{copy.tag}</Tag>

          {/* Desktop: loose collage, each card drifting at its own speed. */}
          <div className="relative hidden aspect-[6/6.4] md:block">
            <div aria-hidden className="glow-mint absolute inset-[18%] opacity-20" />
            {COLLAGE.map(({ key, className, rotate, speed }) => (
              <Parallax key={key} speed={speed} className={`absolute ${className}`}>
                <div style={{ transform: `rotate(${rotate}deg)` }}>
                  <Card k={key} sizes="(min-width: 1024px) 22vw, 40vw" />
                </div>
              </Parallax>
            ))}
          </div>

          {/* Mobile: a scattered, overlapping collage (varied widths, tilts and offsets). */}
          <div className="relative overflow-visible px-1 pt-6 md:hidden">
            <div aria-hidden className="glow-mint absolute inset-x-8 top-1/4 h-1/2 opacity-20" />
            <div className="relative flex flex-col items-center [&>div]:shadow-[0_14px_40px_-10px_rgba(0,0,0,.65)]">
              <div className="relative z-20 w-[72%] -translate-x-2 self-start rotate-[-4deg]">
                <Card k="income" sizes="72vw" className="rounded-2xl" />
              </div>
              <div className="relative z-30 -mt-5 w-[60%] translate-x-1 self-end rotate-[5deg]">
                <Card k="investments" sizes="60vw" className="rounded-2xl" />
              </div>
              <div className="relative z-10 -mt-6 w-[50%] -translate-x-1 self-start rotate-[-3deg]">
                <Card k="assets" sizes="50vw" className="rounded-2xl" />
              </div>
              <div className="relative z-40 -mt-28 w-[66%] translate-x-2 self-end rotate-[3deg]">
                <Card k="expenses" sizes="66vw" className="rounded-2xl" />
              </div>
              <div className="relative z-50 -mt-10 w-[62%] self-start rotate-[-3deg]">
                <Card k="goals" sizes="62vw" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
