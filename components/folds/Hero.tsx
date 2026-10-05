import { HeroVideo } from "@/components/media/HeroVideo";
import { LightsOff } from "@/components/motion/LightsOff";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { hero } from "@/content/home";

// A rising line that echoes the net-worth chart in the video. Decorative.
const SPARK = "M0 30 L12 27 L22 28 L34 22 L46 24 L58 17 L70 18 L82 11 L94 12 L106 5 L120 2";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="p-3">
      <LightsOff className="on-light relative overflow-hidden rounded-[20px] bg-paper text-ink will-change-transform md:rounded-[28px] lg:h-[min(calc(100svh-24px),980px)] lg:min-h-[680px]">
        <div className="mx-auto grid h-full max-w-[1280px] gap-6 px-5 pb-6 pt-28 sm:px-8 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-0 lg:px-12 lg:pb-10 lg:pt-24">
          <div className="relative z-10 lg:col-span-6 lg:-mr-8">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title" className="display mt-5 text-ink lg:mt-6 lg:text-[clamp(64px,6.6vw,108px)]">
              {hero.title.before}
              <mark className="marker">{hero.title.mark}</mark>
              {hero.title.after}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[clamp(17px,1.35vw,20px)] leading-[1.6] text-ink/70 lg:mt-8">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={hero.primary.href} variant="ink" size="lg" arrow>
                {hero.primary.label}
              </ButtonLink>
              <a
                href={hero.secondary.href}
                className="inline-flex h-11 items-center font-ui text-[15px] font-semibold text-ink underline decoration-ink/25 decoration-1 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                {hero.secondary.label}
              </a>
            </div>
            <p className="mt-6 text-[13px] text-ink/60">
              {hero.trust.map((t, i) => (
                <span key={t} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden className="mx-2">·</span>}
                  {t}
                </span>
              ))}
            </p>
          </div>

          <div className="relative flex justify-center lg:col-span-6 lg:h-full">
            <HeroVideo
              className="aspect-[4/5] w-full max-w-[440px] lg:aspect-[3/4] lg:h-full lg:w-auto lg:max-w-none"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 440px, 100vw"
            />
            <Parallax speed={0.15} className="absolute bottom-[12%] left-[-2%] hidden lg:block xl:left-[-4%]">
              <div className="rise-in w-[230px] rounded-2xl bg-ink p-4 text-white">
                <div className="flex items-center justify-between">
                  <p className="font-ui text-[10.5px] font-semibold uppercase tracking-[.3em] text-white/70">{hero.card.eyebrow}</p>
                  <Tag variant="soon">{hero.card.tag}</Tag>
                </div>
                <p className="num mt-3 text-[28px] leading-none">{hero.card.value}</p>
                <svg viewBox="0 0 120 34" className="mt-3 h-8 w-full" aria-hidden fill="none">
                  <path d={`${SPARK} L120 34 L0 34 Z`} fill="rgb(117 251 144 / .15)" />
                  <path d={SPARK} stroke="#75FB90" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </Parallax>
          </div>
        </div>
      </LightsOff>
    </section>
  );
}
