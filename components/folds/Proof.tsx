import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { amcs, proofCopy, stats } from "@/content/stats";

function AmcRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {amcs.map((a) => (
        <li
          key={a.slug}
          className="flex items-center gap-3 opacity-50 grayscale transition-opacity duration-300 hover:opacity-100"
        >
          <Image src={`/img/amc/${a.slug}.png`} alt="" width={28} height={28} className="size-7 rounded-md brightness-[1.6]" />
          <span className="whitespace-nowrap font-ui text-sm font-medium text-white">{a.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="border-y border-line bg-gradient-to-b from-panel to-void py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">{proofCopy.eyebrow}</p>
          <h2 id="proof-title" className="display-bold mt-5">
            {proofCopy.title}
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:col-span-7 lg:gap-x-10 lg:gap-y-16">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-4 max-w-[280px] text-[11px] leading-[1.7] sm:text-xs">{s.label}</dt>
              <dd className="num text-[clamp(56px,7vw,104px)] leading-[.9] text-white">
                {s.prefix && <span className="mr-[.06em] text-[.4em] font-semibold align-[.95em]">{s.prefix}</span>}
                {s.countUp ? <CountUp value={s.value} /> : s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-20 md:mt-28">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee flex w-max">
            <AmcRow />
            <AmcRow hidden />
          </div>
        </div>
        <p className="wrap mt-6 text-center text-[13px] text-white/50">{proofCopy.amcCaption}</p>
      </div>
    </section>
  );
}
