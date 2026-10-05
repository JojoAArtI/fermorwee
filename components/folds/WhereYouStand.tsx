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
            <div aria-hidden className="glow-mint absolute inset-[15%] opacity-40" />
            {COLLAGE.map(({ key, className, rotate, speed }) => (
              <Parallax key={key} speed={speed} className={`absolute ${className}`}>
                <div style={{ transform: `rotate(${rotate}deg)` }}>
                  <Card k={key} sizes="(min-width: 1024px) 22vw, 40vw" />
                </div>
              </Parallax>
            ))}
          </div>

          {/* Mobile: 2-column grid, then the tall assets card. */}
          <div className="grid grid-cols-2 gap-3 pt-8 md:hidden">
            {(["income", "investments", "expenses", "goals"] as const).map((k) => (
              <Card key={k} k={k} sizes="45vw" className="rounded-2xl" />
            ))}
            <div className="col-span-2 mx-auto w-full max-w-[300px] pt-2">
              <Card k="assets" sizes="300px" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
