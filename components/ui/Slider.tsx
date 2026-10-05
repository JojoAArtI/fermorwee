import type { CSSProperties } from "react";

interface SliderProps {
  id: string;
  labelId: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  /** Spoken value, e.g. "₹10,000 per month". */
  valueText: string;
}

/** Native range input. The filled part of the track is driven by --fill. */
export function Slider({ id, labelId, min, max, step, value, onChange, valueText }: SliderProps) {
  const clamped = Math.min(max, Math.max(min, value));
  const fill = ((clamped - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      className="range"
      min={min}
      max={max}
      step={step}
      value={clamped}
      aria-labelledby={labelId}
      aria-valuetext={valueText}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--fill": `${fill}%` } as CSSProperties}
    />
  );
}
