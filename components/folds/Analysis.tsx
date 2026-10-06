"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { analysisCopy as copy, articles, articleUrl, featured, formatDate } from "@/content/articles";

const all = [featured, ...articles];
const n2 = (i: number) => String(i + 1).padStart(2, "0");

export function Analysis() {
  // The expanded article. Defaults to the first; follows hover/focus.
  const [active, setActive] = useState(0);

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
          <a href={copy.all.href} className="group inline-flex min-h-11 items-center gap-1.5 font-ui text-[15px] font-medium text-white/70 transition-colors hover:text-white">
            {copy.all.label}
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <Reveal className="mt-10 md:mt-14">
          <ul onMouseLeave={() => setActive(0)}>
            {all.map((a, i) => {
              const open = i === active;
              return (
                <li key={a.slug} data-reveal className="border-t border-line last:border-b">
                  <a
                    href={articleUrl(a.slug)}
                    target="_blank"
                    rel="noopener"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={open || undefined}
                    // Desktop uses fixed heights so exactly one row is tall and the list height never
                    // changes as hover moves the active row (that stopped the reflow loop). Touch has
                    // no hover, so mobile uses natural height and the full summary is visible.
                    className={`group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-6 md:gap-x-10 md:overflow-hidden md:transition-[height] md:duration-500 md:ease-out-expo ${
                      open ? "md:h-[clamp(200px,26vh,250px)]" : "md:h-[92px]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`font-display font-light leading-none transition-[font-size,color] duration-500 ease-out-expo [font-variation-settings:'opsz'_144] ${
                        open ? "text-[clamp(26px,3vw,42px)] text-white/40" : "text-[clamp(20px,1.9vw,30px)] text-white/20"
                      }`}
                    >
                      {n2(i)}
                    </span>

                    <span className="min-w-0 self-start">
                      <span className="eyebrow block text-[11px]">
                        {a.category} <span className="text-white/30">·</span> {formatDate(a.date)}
                        {open && (
                          <>
                            {" "}
                            <span className="text-white/30">·</span> {a.minutes} min
                          </>
                        )}
                      </span>
                      <span
                        className={`mt-2.5 block font-display font-light leading-[1.14] tracking-[-.01em] transition-[font-size,color] duration-500 ease-out-expo [font-variation-settings:'opsz'_72] ${
                          open ? "text-[clamp(24px,2.8vw,40px)] text-white" : "text-[clamp(18px,1.8vw,24px)] text-white/70 group-hover:text-white"
                        }`}
                      >
                        {a.title}
                      </span>

                      {/* Summary fades in on the active row. The row's fixed height already reserves
                          its space, so showing it never reflows the list. */}
                      <span
                        className={`mt-4 block max-w-[60ch] overflow-hidden text-[15px] leading-relaxed text-white/55 transition-opacity duration-500 ease-out-expo [-webkit-box-orient:vertical] [-webkit-line-clamp:2] ${
                          open ? "opacity-100 [display:-webkit-box]" : "opacity-0 hidden md:[display:-webkit-box]"
                        }`}
                      >
                        {a.summary}
                      </span>
                    </span>

                    <ArrowUpRight
                      aria-hidden
                      className={`size-5 shrink-0 self-start transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 ${
                        open ? "mt-1 text-white" : "text-white/40"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
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
