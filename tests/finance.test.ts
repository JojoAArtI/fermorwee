import { describe, expect, it } from "vitest";
import { emi, incomeTax, prepay, projection, sip } from "@/lib/finance";

// toBeCloseTo(x, 0) passes when |diff| < 0.5, so widen to the ±1 rupee tolerance explicitly.
const near = (actual: number, expected: number, tol = 1) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tol);

describe("sip", () => {
  it("matches fermor.in for ₹25,000 at 12% for 10 years", () => {
    near(sip(25000, 12, 10).value, 5600897);
  });

  it("₹10,000 at 12% for 10 years", () => {
    const r = sip(10000, 12, 10);
    near(r.value, 2240359);
    expect(r.invested).toBe(1200000);
    near(r.returns, 1040359);
    expect(r.multiplier).toBeCloseTo(1.87, 2);
    expect(r.months).toBe(120);
    expect(r.monthlyRate * 100).toBeCloseTo(0.9489, 4);
  });

  it("never returns NaN for zero or bad input", () => {
    expect(sip(10000, 0, 10).value).toBe(1200000);
    expect(sip(0, 12, 10).multiplier).toBe(0);
    expect(sip(NaN, 12, 10).value).toBe(0);
    expect(sip(10000, 12, 0).value).toBe(0);
  });
});

describe("emi", () => {
  it("₹50 L at 8.5% for 20 years", () => {
    const r = emi(5000000, 8.5, 20);
    near(r.emi, 43391);
    near(r.interest, 5413879);
    near(r.total, 10413879);
    expect(r.months).toBe(240);
  });

  it("handles a zero rate and zero tenure", () => {
    expect(emi(1200000, 0, 10).emi).toBe(10000);
    expect(emi(1200000, 8.5, 0).emi).toBe(0);
  });
});

describe("prepay", () => {
  it("₹5,000 extra a month on ₹50 L at 8.5% for 20 years", () => {
    const r = prepay(5000000, 8.5, 20, 5000);
    expect(r.months).toBe(187);
    near(r.interest, 4024629);
    near(r.interestSaved, 1389250);
    expect(r.monthsSaved).toBe(53);
  });

  it("with no extra payment it matches the plain EMI schedule", () => {
    const r = prepay(5000000, 8.5, 20, 0);
    expect(r.months).toBe(240);
    near(r.interestSaved, 0);
    expect(r.monthsSaved).toBe(0);
  });
});

describe("incomeTax", () => {
  it("new regime, ₹12 L: zero after the 87A rebate", () => {
    const r = incomeTax(1200000, { regime: "new" });
    expect(r.taxable).toBe(1125000);
    expect(r.total).toBe(0);
  });

  it("new regime, ₹12.8 L: marginal relief", () => {
    const r = incomeTax(1280000, { regime: "new" });
    expect(r.taxable).toBe(1205000);
    expect(r.slabTax).toBe(60750);
    expect(r.marginalRelief).toBe(true);
    expect(r.total).toBe(5200);
  });

  it("new regime, ₹15 L", () => {
    const r = incomeTax(1500000, { regime: "new" });
    expect(r.marginalRelief).toBe(false);
    expect(r.total).toBe(97500);
  });

  it("old regime, ₹12 L with full 80C", () => {
    expect(incomeTax(1200000, { regime: "old", deductions80C: 150000 }).total).toBe(117000);
  });

  it("old regime, ₹15 L with full 80C", () => {
    expect(incomeTax(1500000, { regime: "old", deductions80C: 150000 }).total).toBe(210600);
  });

  it("caps 80C at ₹1.5 L, ignores it in the new regime, and clamps salary at ₹50 L", () => {
    expect(incomeTax(1200000, { regime: "old", deductions80C: 500000 }).total).toBe(117000);
    expect(incomeTax(1500000, { regime: "new", deductions80C: 150000 }).total).toBe(97500);
    expect(incomeTax(9000000, { regime: "new" }).gross).toBe(5000000);
  });

  it("slab rows add up to the slab tax", () => {
    const r = incomeTax(1500000, { regime: "new" });
    expect(r.slabs.reduce((s, x) => s + x.tax, 0)).toBe(r.slabTax);
    expect(r.slabs.reduce((s, x) => s + x.amount, 0)).toBe(r.taxable);
  });

  it("zero salary is zero tax", () => {
    expect(incomeTax(0, { regime: "old" }).total).toBe(0);
  });
});

describe("projection", () => {
  it("returns a point per year that ends at the SIP value", () => {
    const pts = projection(0, 10000, 12, 10);
    expect(pts).toHaveLength(11);
    expect(pts[0]).toEqual({ year: 0, invested: 0, value: 0 });
    near(pts[10].value, 2240359);
    expect(pts[10].invested).toBe(1200000);
  });

  it("grows a starting corpus at the annual rate", () => {
    const pts = projection(100000, 0, 10, 2);
    near(pts[2].value, 121000);
    expect(pts[2].invested).toBe(100000);
  });
});
