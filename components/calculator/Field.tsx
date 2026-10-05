"use client";

import { NumberField } from "@/components/ui/NumberField";
import { Slider } from "@/components/ui/Slider";

export interface FieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  /** Number as typed/shown in the field, without prefix/suffix. */
  format: (n: number) => string;
  /** Spoken slider value, e.g. "₹10,000 per month". */
  valueText: (n: number) => string;
  minLabel: string;
  maxLabel: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  children?: React.ReactNode;
}

/** Label + editable value on one line, a slider below, and the range under it. */
export function Field({ id, label, value, min, max, step, onChange, format, valueText, minLabel, maxLabel, prefix, suffix, decimals, children }: FieldProps) {
  const labelId = `${id}-label`;
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label id={labelId} htmlFor={id} className="pb-1.5 text-sm text-white/70">
          {label}
        </label>
        <NumberField
          id={id}
          labelId={labelId}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          format={format}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          rangeHint={`Enter between ${minLabel} and ${maxLabel}`}
        />
      </div>
      <Slider id={`${id}-range`} labelId={labelId} min={min} max={max} step={step} value={value} onChange={onChange} valueText={valueText(value)} />
      <div className="-mt-1.5 flex justify-between text-xs text-white/50">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      {children}
    </div>
  );
}
