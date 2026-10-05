"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/motion/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NumberField } from "@/components/ui/NumberField";
import { Slider } from "@/components/ui/Slider";
import { panelId, tabId, Tabs } from "@/components/ui/Tabs";
import { groupIN, inr } from "@/lib/format";
import { sip } from "@/lib/finance";

type Tab = "sip" | "loan" | "tax";

export function Controls() {
  const [tab, setTab] = useState<Tab>("sip");
  const [monthly, setMonthly] = useState(10000);

  return (
    <section className="space-y-6 rounded-[28px] border border-line bg-panel p-6 md:p-10">
      <Eyebrow>Tabs, field, slider</Eyebrow>
      <Tabs
        idPrefix="demo"
        label="Calculator"
        tabs={[{ id: "sip", label: "SIP" }, { id: "loan", label: "home loan" }, { id: "tax", label: "income tax" }]}
        selected={tab}
        onSelect={setTab}
      />
      <div role="tabpanel" id={panelId("demo", tab)} aria-labelledby={tabId("demo", tab)} className="max-w-md space-y-1">
        <div className="flex items-end justify-between gap-4">
          <label id="m-label" htmlFor="m" className="text-sm text-white/70">Monthly investment</label>
          <NumberField
            id="m"
            labelId="m-label"
            value={monthly}
            min={500}
            max={200000}
            onChange={setMonthly}
            format={groupIN}
            prefix="₹"
            rangeHint="Enter between ₹500 and ₹2,00,000"
          />
        </div>
        <Slider id="m-range" labelId="m-label" min={500} max={200000} step={500} value={monthly} onChange={setMonthly} valueText={`${inr(monthly)} per month`} />
        <div className="flex justify-between text-xs text-white/50"><span>₹500</span><span>₹2,00,000</span></div>
        <p className="num pt-6 text-[clamp(44px,6vw,88px)] leading-none">
          <AnimatedNumber value={sip(monthly, 12, 10).value} format={inr} />
        </p>
      </div>
    </section>
  );
}
