"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/motion/CountUp";
import { Tag } from "@/components/ui/Tag";
import { calculatorCopy } from "@/content/home";
import { incomeTax, type Regime, type SlabRow } from "@/lib/finance";
import { groupIN, inr, pct } from "@/lib/format";
import { Field } from "./Field";
import { fitSize, LiveSummary, PanelLayout } from "./PanelLayout";
import { MathLine, ShowTheMath } from "./ShowTheMath";
import { useDebounced } from "./useDebounced";

const lakh = (n: number) => `₹${String(Number((n / 1e5).toFixed(2)))} L`;
const slabLabel = (s: SlabRow) => (s.to === null ? `above ${lakh(s.from)}` : `${s.from === 0 ? "₹0" : lakh(s.from)} – ${lakh(s.to)}`);
const NAMES: Record<Regime, string> = { new: "New regime", old: "Old regime" };

export function TaxPanel() {
  const [salary, setSalary] = useState(1200000);
  const [c80, setC80] = useState(150000);
  const [pick, setPick] = useState<Regime | null>(null);

  const t = { new: incomeTax(salary, { regime: "new" }), old: incomeTax(salary, { regime: "old", deductions80C: c80 }) };
  const better: Regime | null = t.new.total === t.old.total ? null : t.new.total < t.old.total ? "new" : "old";
  const saving = Math.abs(t.new.total - t.old.total);
  const verdict = better
    ? `The ${better} regime saves you ${inr(saving)} at this salary.`
    : "Both regimes come to the same tax at this salary.";
  const shown: Regime = pick ?? better ?? "new";
  const m = t[shown];

  const live = useDebounced(`New regime ${inr(t.new.total)}, old regime ${inr(t.old.total)}. ${verdict}`);

  return (
    <PanelLayout
      inputs={
        <>
          <Field
            id="tax-salary"
            label="Gross annual salary"
            value={salary}
            min={0}
            max={5000000}
            step={10000}
            onChange={setSalary}
            format={groupIN}
            prefix="₹"
            valueText={(n) => `${inr(n)} a year`}
            minLabel="₹0"
            maxLabel="₹50,00,000"
          />
          <Field
            id="tax-80c"
            label="80C investments (old regime only)"
            value={c80}
            min={0}
            max={150000}
            step={5000}
            onChange={setC80}
            format={groupIN}
            prefix="₹"
            valueText={(n) => inr(n)}
            minLabel="₹0"
            maxLabel="₹1,50,000"
          />
          <p className="text-xs leading-relaxed text-white/50">{calculatorCopy.taxHint}</p>
        </>
      }
      result={
        <>
          <p className="eyebrow">Your tax this year</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-6">
            {(["new", "old"] as const).map((reg) => (
              <div key={reg} className={`rounded-[20px] border p-4 [container-type:inline-size] sm:p-5 ${better === reg ? "border-mint/40 bg-mint/[.04]" : "border-line"}`}>
                <div className="flex min-h-6 flex-wrap items-center justify-between gap-2">
                  <p className="font-ui text-sm font-medium text-white/90">{NAMES[reg]}</p>
                  {better === reg && <Tag variant="live">Better</Tag>}
                </div>
                <p className="num mt-4 whitespace-nowrap leading-none text-white" style={{ fontSize: fitSize(inr(t[reg].total).length, "clamp(36px, 4vw, 52px)") }}>
                  <AnimatedNumber value={t[reg].total} format={inr} />
                </p>
                <p className="mt-3 text-[13px] leading-snug text-white/60">
                  {inr(t[reg].total / 12)} a month
                  <br />
                  {pct(t[reg].gross > 0 ? (t[reg].total / t[reg].gross) * 100 : 0)} of salary
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[17px] leading-relaxed text-white">{verdict}</p>

          <ShowTheMath>
            <div role="radiogroup" aria-label="Show the math for" className="flex gap-2">
              {(["new", "old"] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  role="radio"
                  aria-checked={shown === reg}
                  onClick={() => setPick(reg)}
                  className="relative h-9 rounded-full border border-white/15 px-3.5 font-ui text-[13px] font-medium text-white/70 transition-colors after:absolute after:-inset-1 hover:text-white aria-checked:border-mint aria-checked:bg-mint aria-checked:text-ink"
                >
                  {NAMES[reg]}
                </button>
              ))}
            </div>

            <dl className="space-y-0.5">
              <MathRow label="Gross salary" value={inr(m.gross)} />
              <MathRow label="Standard deduction" value={`− ${inr(m.standardDeduction)}`} />
              {shown === "old" && <MathRow label="80C" value={`− ${inr(m.deduction80C)}`} />}
              <MathRow label="Taxable income" value={inr(m.taxable)} strong />
            </dl>

            <table className="w-full text-left text-[13px] sm:text-[14px]">
              <caption className="sr-only">Tax by slab, {NAMES[shown].toLowerCase()}</caption>
              <thead className="text-white/50">
                <tr>
                  <th scope="col" className="py-1 font-normal">Slab</th>
                  <th scope="col" className="py-1 text-right font-normal">Rate</th>
                  <th scope="col" className="py-1 text-right font-normal">Tax</th>
                </tr>
              </thead>
              <tbody>
                {m.slabs.map((s) => (
                  <tr key={s.from} className={`border-t border-line ${s.amount > 0 ? "text-white/90" : "text-white/50"}`}>
                    <td className="py-1.5">{slabLabel(s)}</td>
                    <td className="py-1.5 text-right">{s.rate}%</td>
                    <td className="py-1.5 text-right">{inr(s.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="space-y-0.5">
              <MathRow label="Tax on slabs" value={inr(m.slabTax)} />
              {m.rebate > 0 && (
                <MathRow label={m.marginalRelief ? "Marginal relief (87A)" : "Rebate under 87A"} value={`− ${inr(m.rebate)}`} />
              )}
              <MathRow label="Health and education cess, 4%" value={`+ ${inr(m.cess)}`} />
              <MathRow label="Total tax" value={inr(m.total)} strong />
            </dl>
            {m.marginalRelief && (
              <MathLine muted>
                Marginal relief: above ₹12 L of taxable income, tax can&apos;t be more than the income above ₹12 L ({inr(m.taxable - 1200000)}).
              </MathLine>
            )}
          </ShowTheMath>

          <LiveSummary text={live} />
        </>
      }
    />
  );
}

function MathRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "text-white" : "text-white/60"}>{label}</dt>
      <dd className={strong ? "font-semibold text-white" : "text-white/90"}>{value}</dd>
    </div>
  );
}
