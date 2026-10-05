"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string> {
  /** Prefix for tab/panel ids: tab = `${idPrefix}-tab-${id}`, panel = `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  label: string;
  tabs: TabItem<T>[];
  selected: T;
  onSelect: (id: T) => void;
  className?: string;
}

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/** WAI-ARIA tabs (automatic activation) with a sliding mint underline. */
export function Tabs<T extends string>({ idPrefix, label, tabs, selected, onSelect, className = "" }: TabsProps<T>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      // Underline the label text, not the button padding.
      const el = refs.current[selected];
      const text = el?.firstElementChild as HTMLElement | null;
      if (el && text) setBar({ x: el.offsetLeft + text.offsetLeft, w: text.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [selected]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === selected);
    const next =
      e.key === "ArrowRight" ? (i + 1) % tabs.length
      : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length
      : e.key === "Home" ? 0
      : e.key === "End" ? tabs.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`relative flex gap-1 border-b border-line ${className}`}>
      {tabs.map((tab) => {
        const active = tab.id === selected;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, tab.id)}
            aria-selected={active}
            aria-controls={panelId(idPrefix, tab.id)}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            className={`relative h-12 min-w-11 px-3 font-ui text-[15px] font-medium transition-colors duration-200 first:pl-0 sm:px-4 sm:first:pl-0 ${
              active ? "text-white" : "text-white/60 hover:text-white/90"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
      <span
        aria-hidden
        className="absolute -bottom-px left-0 h-0.5 w-px origin-left bg-mint transition-transform duration-[240ms] ease-out-expo"
        style={{
          transform: bar ? `translateX(${bar.x}px) scaleX(${bar.w})` : "scaleX(0)",
        }}
      />
    </div>
  );
}
