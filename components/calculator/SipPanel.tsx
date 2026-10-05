"use client";

import { useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/motion/CountUp";
import { projection, sip } from "@/lib/finance";
import { groupIN, inr, times } from "@/lib/format";
import { Field } from "./Field";
import { BigResult, LiveSummary, PanelLayout } from "./PanelLayout";
import { ResultRow } from "./ResultRow";
import { MathLine, Pow, ShowTheMath } from "./ShowTheMath";
import { Sparkline } from "./Sparkline";
import { SplitBar } from "./SplitBar";
import { useDebounced } from "./useDebounced";

const YEAR_CHIPS = [5, 10, 15, 20, 25];
const yearsLabel = (y: number) => `${y} year${y === 1 ? "" : "s"}`;
const plain = (n: number) => String(Number(n.toFixed(2)));

export function SipPanel() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const r = sip(monthly, rate, years);
  const points = useMemo(() => projection(0, monthly, rate, years), [monthly, rate, years]);
  const live = useDebounced(
    `In ${yearsLabel(years)}: ${inr(r.value)}. Invested ${inr(r.invested)}, estimated returns ${inr(r.returns)}.`,
  );
  const growth = Math.pow(1 + r.monthlyRate, r.months);

  return (
    <PanelLayout
      inputs={
        <>
          <Field
            id="sip-monthly"
            label="Monthly investment"
            value={monthly}
            min={500}
            max={200000}
            step={500}
            onChange={setMonthly}
            format={groupIN}
            prefix="₹"
            valueText={(n) => `${inr(n)} per month`}
            minLabel="₹500"
            maxLabel="₹2,00,000"
          />
          <Field
            id="sip-rate"
            label="Expected return (a year)"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            decimals={1}
            onChange={setRate}
            format={plain}
            suffix="%"
            valueText={(n) => `${plain(n)}% a year`}
            minLabel="1%"
            maxLabel="30%"
          />
          <Field
            id="sip-years"
            label="Time period"
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={setYears}
            format={String}
            suffix={years === 1 ? "year" : "years"}
            valueText={yearsLabel}
            minLabel="1 year"
            maxLabel="40 years"
          >
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Quick periods">
              {YEAR_CHIPS.map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={years === y}
                  aria-label={`${y}Y, ${yearsLabel(y)}`}
                  onClick={() => setYears(y)}
                  className="relative h-9 rounded-full border border-white/15 px-3.5 font-ui text-[13px] font-medium text-white/70 transition-colors after:absolute after:-inset-1 hover:border-white/40 hover:text-white aria-pressed:border-mint aria-pressed:bg-mint aria-pressed:text-ink"
                >
                  {y}Y
                </button>
              ))}
            </div>
          </Field>
        </>
      }
      result={
        <>
          <BigResult eyebrow={`In ${yearsLabel(years)}`} chars={inr(r.value).length}>
            <AnimatedNumber value={r.value} format={inr} />
          </BigResult>

          <dl className="mt-8">
            <ResultRow label="Invested">{inr(r.invested)}</ResultRow>
            <ResultRow label="Est. returns">
              <span className="text-gain">+{inr(r.returns)}</span>
            </ResultRow>
            <ResultRow label="Wealth multiplier">{times(r.multiplier)}</ResultRow>
          </dl>

          <div className="mt-6">
            <SplitBar
              label={`Invested ${inr(r.invested)}, returns ${inr(r.returns)}`}
              parts={[
                { label: "Invested", value: `${Math.round((r.invested / r.value) * 100)}%`, share: r.invested / r.value, tone: "dim" },
                { label: "Returns", value: `${Math.round((r.returns / r.value) * 100)}%`, share: r.returns / r.value, tone: "mint" },
              ]}
            />
          </div>

          <div className="mt-8">
            <Sparkline points={points} label={`Projected value rises from ₹0 today to ${inr(r.value)} in ${yearsLabel(years)}.`} />
          </div>

          <ShowTheMath>
            <MathLine>
              FV = P × [((1 + i)<Pow>n</Pow> − 1) / i] × (1 + i)
            </MathLine>
            <MathLine muted>
              P = {inr(monthly)}, i = {(r.monthlyRate * 100).toFixed(3)}% a month ({plain(rate)}% a year, compounded monthly), n = {r.months} months
            </MathLine>
            <MathLine muted>
              (1 + i)<Pow>n</Pow> = {(1 + r.monthlyRate).toFixed(5)}<Pow>{r.months}</Pow> = {growth.toFixed(4)}
            </MathLine>
            <MathLine>
              FV = {inr(monthly)} × [({growth.toFixed(4)} − 1) / {r.monthlyRate.toFixed(5)}] × {(1 + r.monthlyRate).toFixed(5)} ={" "}
              <strong className="font-semibold text-white">{inr(r.value)}</strong>
            </MathLine>
          </ShowTheMath>

          <LiveSummary text={live} />
        </>
      }
    />
  );
}
