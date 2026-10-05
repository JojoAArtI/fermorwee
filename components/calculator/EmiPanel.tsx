"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/motion/CountUp";
import { emi, prepay } from "@/lib/finance";
import { duration, groupIN, inr, inrCompact, pct } from "@/lib/format";
import { Field } from "./Field";
import { BigResult, LiveSummary, PanelLayout } from "./PanelLayout";
import { ResultRow } from "./ResultRow";
import { MathLine, Pow, ShowTheMath } from "./ShowTheMath";
import { SplitBar } from "./SplitBar";
import { useDebounced } from "./useDebounced";

const yearsLabel = (y: number) => `${y} year${y === 1 ? "" : "s"}`;
const plain = (n: number) => String(Number(n.toFixed(2)));

export function EmiPanel() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [extra, setExtra] = useState(0);

  const r = emi(amount, rate, years);
  const p = prepay(amount, rate, years, extra);
  const growth = Math.pow(1 + r.monthlyRate, r.months);
  const interestShare = r.total > 0 ? r.interest / r.total : 0;

  const live = useDebounced(
    `EMI ${inr(r.emi)} a month. Total interest ${inr(r.interest)}, total paid ${inr(r.total)}.` +
      (extra > 0 ? ` Paying ${inr(extra)} more each month saves ${inrCompact(p.interestSaved)} in interest.` : ""),
  );

  return (
    <PanelLayout
      inputs={
        <>
          <Field
            id="loan-amount"
            label="Loan amount"
            value={amount}
            min={100000}
            max={50000000}
            step={100000}
            onChange={setAmount}
            format={groupIN}
            prefix="₹"
            valueText={(n) => inr(n)}
            minLabel="₹1,00,000"
            maxLabel="₹5,00,00,000"
          />
          <Field
            id="loan-rate"
            label="Interest rate (a year)"
            value={rate}
            min={6}
            max={15}
            step={0.05}
            decimals={2}
            onChange={setRate}
            format={plain}
            suffix="%"
            valueText={(n) => `${plain(n)}% a year`}
            minLabel="6%"
            maxLabel="15%"
          />
          <Field
            id="loan-years"
            label="Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            format={String}
            suffix={years === 1 ? "year" : "years"}
            valueText={yearsLabel}
            minLabel="1 year"
            maxLabel="30 years"
          />
          <Field
            id="loan-extra"
            label="Prepay extra each month"
            value={extra}
            min={0}
            max={100000}
            step={500}
            onChange={setExtra}
            format={groupIN}
            prefix="₹"
            valueText={(n) => `${inr(n)} extra per month`}
            minLabel="₹0"
            maxLabel="₹1,00,000"
          />
        </>
      }
      result={
        <>
          <BigResult eyebrow="Your EMI" chars={inr(r.emi).length + 4}>
            <AnimatedNumber value={r.emi} format={inr} />
            <span className="ml-2 align-baseline font-ui text-[.26em] font-medium tracking-normal text-white/70">/ month</span>
          </BigResult>

          <dl className="mt-8">
            <ResultRow label="Total interest">{inr(r.interest)}</ResultRow>
            <ResultRow label="Total paid">{inr(r.total)}</ResultRow>
            <ResultRow label="Interest as % of loan">{pct(amount > 0 ? (r.interest / amount) * 100 : 0, 0)}</ResultRow>
          </dl>

          <div className="mt-6">
            <SplitBar
              label={`Principal ${inr(amount)}, interest ${inr(r.interest)}`}
              parts={[
                { label: "Principal", value: `${Math.round((1 - interestShare) * 100)}%`, share: 1 - interestShare, tone: "mint" },
                { label: "Interest", value: `${Math.round(interestShare * 100)}%`, share: interestShare, tone: "dim" },
              ]}
            />
          </div>

          {extra > 0 && (
            <p className="mt-8 border-l-2 border-mint pl-4 text-[15px] leading-relaxed text-white/90">
              Paying {inr(extra)} more each month saves about <strong className="font-semibold text-white">{inrCompact(p.interestSaved)}</strong> in
              interest{p.monthsSaved > 0 ? (
                <>
                  {" "}and closes the loan <strong className="font-semibold text-white">{duration(p.monthsSaved)}</strong> early.
                </>
              ) : (
                "."
              )}
            </p>
          )}

          <ShowTheMath>
            <MathLine>
              EMI = P × i × (1 + i)<Pow>n</Pow> / ((1 + i)<Pow>n</Pow> − 1)
            </MathLine>
            <MathLine muted>
              P = {inr(amount)}, i = {(r.monthlyRate * 100).toFixed(4)}% a month ({plain(rate)}% ÷ 12), n = {r.months} months
            </MathLine>
            <MathLine muted>
              (1 + i)<Pow>n</Pow> = {(1 + r.monthlyRate).toFixed(6)}<Pow>{r.months}</Pow> = {growth.toFixed(4)}
            </MathLine>
            <MathLine>
              EMI = {inr(amount)} × {r.monthlyRate.toFixed(6)} × {growth.toFixed(4)} / ({growth.toFixed(4)} − 1) ={" "}
              <strong className="font-semibold text-white">{inr(r.emi)}</strong>
            </MathLine>
            <MathLine muted>
              Total paid = EMI × n = {inr(r.total)}. Interest = total paid − P = {inr(r.interest)}.
            </MathLine>
            {extra > 0 && (
              <MathLine muted>
                With {inr(extra)} extra each month, a month-by-month schedule closes the loan in {p.months} months and charges {inr(p.interest)} in interest.
              </MathLine>
            )}
          </ShowTheMath>

          <LiveSummary text={live} />
        </>
      }
    />
  );
}
