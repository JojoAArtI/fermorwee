import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Sparkline } from "@/components/calculator/Sparkline";
import { sip, projection } from "@/lib/finance";
import { inr } from "@/lib/format";

// One worked example, laid out instead of a calculator: the same "show the math" idea, as a
// quiet editorial piece. The calculators themselves live on fermor.in.
const MONTHLY = 10000;
const RATE = 12;
const YEARS = 10;

export function TheWorking() {
  const r = sip(MONTHLY, RATE, YEARS);
  const points = projection(0, MONTHLY, RATE, YEARS);

  return (
    <section id="show-the-math" aria-labelledby="working-title" className="hairline py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p data-reveal className="eyebrow">Show the math</p>
          <h2 data-reveal id="working-title" className="display-md mt-5">
            the working, not just the answer.
          </h2>
          <p data-reveal className="body-lg mt-6 max-w-[42ch]">
            Most tools hand you a number and hope you trust it. Fermor lays out how it is built, line
            by line, so you can check it, question it and change it.
          </p>
          <a
            data-reveal
            href="https://fermor.in/calculators"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 font-ui text-[15px] font-medium text-white/90 hover:text-white"
          >
            explore all 158 calculators
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="lg:col-span-7">
          <div className="rounded-[20px] border border-line bg-panel p-6 sm:p-8 md:rounded-[28px] lg:p-10">
            <p className="font-ui text-sm text-white/55">
              <span className="num text-white">{inr(MONTHLY)}</span> invested every month,{" "}
              <span className="num text-white">{RATE}%</span> a year, for{" "}
              <span className="num text-white">{YEARS} years</span>, becomes
            </p>

            <div className="relative mt-4">
              <div aria-hidden className="glow-mint pointer-events-none absolute -left-6 top-1/2 h-[150%] w-[70%] -translate-y-1/2 opacity-35" />
              <p className="num relative text-[clamp(48px,8vw,104px)] leading-none text-white">
                <CountUp value={r.value} prefix="₹" />
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-white/70">
              <span>
                Invested <span className="num text-white">{inr(r.invested)}</span>
              </span>
              <span>
                Returns <span className="num text-gain">+{inr(r.returns)}</span>
              </span>
              <span>
                Growth <span className="num text-white">{r.multiplier.toFixed(2)}×</span>
              </span>
            </div>

            <div className="mt-8">
              <Sparkline points={points} label={`Projected value grows from ₹0 today to ${inr(r.value)} in ${YEARS} years.`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
