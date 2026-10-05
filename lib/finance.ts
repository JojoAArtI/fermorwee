// Pure finance math. No UI imports. All amounts in rupees, rates in percent a year.

const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const nonNeg = (n: number) => Math.max(0, finite(n));

/** Future value of a monthly annuity due (payment at the start of each month). */
function annuityDue(monthly: number, i: number, n: number) {
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

// SIP: matches fermor.in (effective monthly rate, payment at start of month)
export function sip(monthly: number, annualPct: number, years: number) {
  monthly = nonNeg(monthly);
  const i = Math.pow(1 + nonNeg(annualPct) / 100, 1 / 12) - 1;
  const n = Math.round(nonNeg(years) * 12);
  const value = annuityDue(monthly, i, n);
  const invested = monthly * n;
  return {
    value,
    invested,
    returns: value - invested,
    multiplier: invested > 0 ? value / invested : 0,
    monthlyRate: i,
    months: n,
  };
}

export function emi(principal: number, annualPct: number, years: number) {
  principal = nonNeg(principal);
  const i = nonNeg(annualPct) / 12 / 100;
  const n = Math.round(nonNeg(years) * 12);
  let e = 0;
  if (n > 0) e = i === 0 ? principal / n : (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return { emi: e, total: e * n, interest: e * n - principal, monthlyRate: i, months: n };
}

// Month-by-month simulation with an extra monthly payment
export function prepay(principal: number, annualPct: number, years: number, extraMonthly: number) {
  const base = emi(principal, annualPct, years);
  const i = base.monthlyRate;
  const payment = base.emi + nonNeg(extraMonthly);

  let balance = nonNeg(principal);
  let months = 0;
  let interest = 0;
  // The base schedule always closes within base.months, so this loop is bounded.
  while (balance > 0.005 && months < base.months) {
    const monthInterest = balance * i;
    interest += monthInterest;
    balance -= Math.min(payment - monthInterest, balance);
    months++;
  }

  return {
    months,
    interest,
    interestSaved: Math.max(0, base.interest - interest),
    monthsSaved: Math.max(0, base.months - months),
  };
}

export type Regime = "new" | "old";

export interface SlabRow {
  from: number;
  to: number | null; // null = no upper limit
  rate: number; // percent
  amount: number; // income falling in this slab
  tax: number;
}

const SLABS: Record<Regime, Array<[from: number, rate: number]>> = {
  new: [[0, 0], [400000, 5], [800000, 10], [1200000, 15], [1600000, 20], [2000000, 25], [2400000, 30]],
  old: [[0, 0], [250000, 5], [500000, 20], [1000000, 30]],
};

export const TAX_RULES = {
  new: { standardDeduction: 75000, rebateLimit: 1200000 },
  old: { standardDeduction: 50000, rebateLimit: 500000, max80C: 150000 },
  maxSalary: 5000000,
  cessPct: 4,
} as const;

// Indian income tax, salaried individual below 60, FY 2026-27
export function incomeTax(grossSalary: number, opts: { regime: Regime; deductions80C?: number }) {
  const { regime } = opts;
  const gross = Math.min(nonNeg(grossSalary), TAX_RULES.maxSalary);
  const standardDeduction = TAX_RULES[regime].standardDeduction;
  const deduction80C = regime === "old" ? Math.min(nonNeg(opts.deductions80C ?? 0), TAX_RULES.old.max80C) : 0;
  const taxable = Math.max(0, gross - standardDeduction - deduction80C);

  const table = SLABS[regime];
  const slabs: SlabRow[] = table.map(([from, rate], k) => {
    const to = k + 1 < table.length ? table[k + 1][0] : null;
    const amount = Math.max(0, Math.min(taxable, to ?? Infinity) - from);
    return { from, to, rate, amount, tax: (amount * rate) / 100 };
  });
  const slabTax = slabs.reduce((sum, s) => sum + s.tax, 0);

  // 87A rebate, plus marginal relief in the new regime (tax can't exceed income above ₹12 L).
  const limit = TAX_RULES[regime].rebateLimit;
  let afterRebate = slabTax;
  let marginalRelief = false;
  if (taxable <= limit) {
    afterRebate = 0;
  } else if (regime === "new" && taxable - limit < slabTax) {
    afterRebate = taxable - limit;
    marginalRelief = true;
  }

  const rebate = slabTax - afterRebate;
  const cess = (afterRebate * TAX_RULES.cessPct) / 100;
  const total = Math.round(afterRebate + cess);

  return { gross, standardDeduction, deduction80C, taxable, slabs, slabTax, rebate, marginalRelief, cess, total };
}

// Wealth projection used by the forecast/sparkline: yearly points for SIP + starting corpus
export function projection(start: number, monthly: number, annualPct: number, years: number) {
  start = nonNeg(start);
  const r = nonNeg(annualPct) / 100;
  const total = Math.round(nonNeg(years));
  const points: Array<{ year: number; invested: number; value: number }> = [];
  for (let year = 0; year <= total; year++) {
    const s = sip(monthly, annualPct, year);
    points.push({ year, invested: start + s.invested, value: start * Math.pow(1 + r, year) + s.value });
  }
  return points;
}
