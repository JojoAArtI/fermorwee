// Indian number formatting. Negatives use a true minus sign (U+2212).

const MINUS = "−";
const whole = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const two = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const sign = (n: number) => (n < 0 ? MINUS : "");

/** Indian digit grouping, no symbol: 1200000 → "12,00,000". */
export function groupIN(n: number) {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n);
  return sign(rounded) + whole.format(Math.abs(rounded));
}

/** ₹22,40,359 */
export function inr(n: number) {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n);
  return `${sign(rounded)}₹${whole.format(Math.abs(rounded))}`;
}

/** ₹22.40 L, ₹1.04 Cr, or the full figure below ₹1 lakh. */
export function inrCompact(n: number) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs < 1e5) return inr(n);
  // Round first so 99,99,999 reads "₹1.00 Cr", not "₹100.00 L".
  const lakhs = Math.round(abs / 1e3) / 100;
  const body = lakhs < 100 ? `${two.format(lakhs)} L` : `${two.format(Math.round(abs / 1e5) / 100)} Cr`;
  return `${sign(n)}₹${body}`;
}

/** 12 → "12%", 12.5 → "12.5%". With `signed`, positives get "+" (+1.6%). */
export function pct(n: number, digits = 1, signed = false) {
  if (!Number.isFinite(n)) return "—";
  const factor = 10 ** digits;
  const rounded = Math.round(n * factor) / factor;
  const body = new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits }).format(Math.abs(rounded));
  const prefix = rounded < 0 ? MINUS : signed && rounded > 0 ? "+" : "";
  return `${prefix}${body}%`;
}

/** 1.8669 → "1.87×" */
export function times(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(2)}×`;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** 53 → "4 years 5 months" */
export function duration(months: number) {
  const m = Math.max(0, Math.round(Number.isFinite(months) ? months : 0));
  const y = Math.floor(m / 12);
  const r = m % 12;
  if (y === 0) return plural(r, "month");
  if (r === 0) return plural(y, "year");
  return `${plural(y, "year")} ${plural(r, "month")}`;
}

/** Parses typed input like "₹10,000", "1,50,000.5" or "12 %". Returns null when it isn't a number. */
export function parseAmount(input: string): number | null {
  const cleaned = input.replace(/[₹,%\s]/g, "").replace(MINUS, "-");
  if (!/^-?\d*\.?\d+$|^-?\d+\.$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}
