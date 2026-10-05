"use client";

import { useRef, useState } from "react";
import { parseAmount } from "@/lib/format";

interface NumberFieldProps {
  id: string;
  labelId: string;
  value: number;
  min: number;
  max: number;
  /** Called with valid, in-range values while typing, and with the clamped value on blur. */
  onChange: (value: number) => void;
  /** How the number shows at rest, without prefix/suffix: 10000 → "10,000". */
  format: (n: number) => string;
  /** Helper shown while the typed value is out of range: "Enter between ₹500 and ₹2,00,000". */
  rangeHint: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/** Editable value next to a slider. Accepts typed Indian-format input; clamps on blur. */
export function NumberField({ id, labelId, value, min, max, onChange, format, rangeHint, prefix, suffix, decimals = 0 }: NumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null); // null = not editing
  const parsed = draft === null ? value : parseAmount(draft);
  const invalid = draft !== null && (parsed === null || parsed < min || parsed > max);
  const hintId = `${id}-hint`;
  const cancelled = useRef(false);

  const round = (n: number) => Number(n.toFixed(decimals));

  const commit = () => {
    if (draft === null || cancelled.current) {
      cancelled.current = false;
      setDraft(null);
      return;
    }
    const n = parseAmount(draft);
    if (n !== null) onChange(round(Math.min(max, Math.max(min, n))));
    setDraft(null);
  };

  return (
    <div className="flex flex-col items-end">
      <div
        className={`flex items-baseline gap-1 border-b pb-1 transition-colors duration-200 focus-within:border-mint focus-within:shadow-[0_1px_0_0_var(--color-mint)] ${
          invalid ? "border-loss focus-within:border-loss focus-within:shadow-[0_1px_0_0_var(--color-loss)]" : "border-white/20"
        }`}
      >
        {prefix && <span className="num text-[18px] text-white/70" aria-hidden>{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          aria-labelledby={labelId}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? hintId : undefined}
          value={draft ?? format(value)}
          size={Math.max(2, (draft ?? format(value)).length)}
          onFocus={(e) => {
            setDraft(format(value));
            requestAnimationFrame(() => e.target.select());
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = parseAmount(e.target.value);
            if (n !== null && n >= min && n <= max) onChange(round(n));
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") {
              cancelled.current = true;
              e.currentTarget.blur();
            }
          }}
          className="num -my-2 h-11 min-w-11 bg-transparent text-right text-[18px] text-white outline-none [field-sizing:content]"
        />
        {suffix && <span className="num text-[15px] text-white/70" aria-hidden>{suffix}</span>}
      </div>
      {invalid && (
        <p id={hintId} className="mt-1.5 text-xs text-[#F08A8A]">
          {rangeHint}
        </p>
      )}
    </div>
  );
}
