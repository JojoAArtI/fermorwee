import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { analysisCopy as copy, articles, articleUrl, featured, formatDate } from "@/content/articles";

const meta = (a: { category: string; date: string; minutes: number }) => `${a.category} · ${formatDate(a.date)} · ${a.minutes} min read`;

export function Analysis() {
  return (
    <section aria-labelledby="analysis-title" className="py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="analysis-title" className="display-md mt-5">
              {copy.title}
            </h2>
          </div>
          <a href={copy.all.href} className="group inline-flex min-h-11 items-center gap-1.5 font-ui text-[15px] font-medium text-white/90 hover:text-white">
            {copy.all.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </a>
        </div>

        <Reveal className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Featured */}
          <article data-reveal className="group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-panel lg:col-span-7">
            <div className="relative h-40 overflow-hidden md:h-52">
              <div aria-hidden className="glow-mint absolute -top-1/2 left-[10%] h-[150%] w-[80%] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="eyebrow absolute bottom-5 left-6 md:left-8">{featured.category}</p>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-2 md:p-8 md:pt-2">
              <h3 className="font-display text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.12] tracking-[-.015em] [font-variation-settings:'opsz'_72]">
                <a href={articleUrl(featured.slug)} target="_blank" rel="noopener" className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-mint">
                  {featured.title}
                </a>
              </h3>
              <p className="mt-4 text-[13px] text-white/50">{meta(featured)}</p>
              <p className="mt-4 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-white/70">{featured.summary}</p>
              <p aria-hidden className="mt-8 inline-flex items-center gap-1.5 font-ui text-sm font-medium text-white/90 group-hover:text-white">
                {copy.read}
                <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </p>
            </div>
          </article>

          {/* Compact rows */}
          <ul data-reveal className="flex flex-col lg:col-span-5">
            {articles.map((a) => (
              <li key={a.slug} className="border-t border-line last:border-b">
                <a
                  href={articleUrl(a.slug)}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-start justify-between gap-6 py-6 text-white/80 transition-colors duration-300 hover:text-white"
                >
                  <span>
                    <span className="eyebrow block text-[11px]">
                      {a.category} · {formatDate(a.date)}
                    </span>
                    <span className="mt-3 block font-ui text-lg font-semibold leading-snug tracking-[-.01em]">{a.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="mt-7 size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-10 text-sm text-white/50">
          {copy.languagesLead}{" "}
          {copy.languages.map((l, i) => (
            <span key={l.lang}>
              {i > 0 && <span aria-hidden> · </span>}
              <span lang={l.lang}>{l.label}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
