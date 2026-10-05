"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { panelId, tabId, Tabs } from "@/components/ui/Tabs";
import { calculatorCopy } from "@/content/home";
import { EmiPanel } from "./EmiPanel";
import { SipPanel } from "./SipPanel";
import { TaxPanel } from "./TaxPanel";

type Tab = "sip" | "loan" | "tax";

const TABS: { id: Tab; label: string }[] = [
  { id: "sip", label: "SIP" },
  { id: "loan", label: "home loan" },
  { id: "tax", label: "income tax" },
];

const PANELS: Record<Tab, () => React.ReactElement> = { sip: SipPanel, loan: EmiPanel, tax: TaxPanel };

/**
 * Three calculators in one panel. A panel mounts the first time its tab is opened (less work on
 * page load) and then stays mounted, so each keeps its inputs.
 */
export function Calculator() {
  const [tab, setTab] = useState<Tab>("sip");
  const [opened, setOpened] = useState<Set<Tab>>(() => new Set(["sip"]));
  const select = (id: Tab) => {
    setTab(id);
    setOpened((s) => (s.has(id) ? s : new Set(s).add(id)));
  };
  const link = calculatorCopy.links[tab];

  return (
    <div className="rounded-[20px] border border-line bg-panel p-5 sm:p-8 md:rounded-[28px] lg:p-10">
      <Tabs idPrefix="calc" label="Calculator" tabs={TABS} selected={tab} onSelect={select} />

      {TABS.map(({ id }) => {
        const Panel = PANELS[id];
        return (
          <div
            key={id}
            role="tabpanel"
            id={panelId("calc", id)}
            aria-labelledby={tabId("calc", id)}
            hidden={tab !== id}
            className="pt-8 lg:pt-10"
          >
            {opened.has(id) && <Panel />}
          </div>
        );
      })}

      <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/50">{calculatorCopy.disclaimer}</p>
        <a href={link.href} className="group inline-flex min-h-11 items-center gap-1.5 font-ui text-sm font-medium text-white/90 hover:text-white">
          {link.label}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
