import { describe, expect, it } from "vitest";
import { duration, groupIN, inr, inrCompact, parseAmount, pct, times } from "@/lib/format";

describe("inr", () => {
  it("uses Indian grouping and rounds to the rupee", () => {
    expect(inr(2240358.7)).toBe("₹22,40,359");
    expect(inr(43391)).toBe("₹43,391");
    expect(inr(0)).toBe("₹0");
    expect(inr(10413879)).toBe("₹1,04,13,879");
  });

  it("uses a true minus sign and never prints NaN", () => {
    expect(inr(-5000)).toBe("−₹5,000");
    expect(inr(-0.2)).toBe("₹0");
    expect(inr(NaN)).toBe("—");
    expect(inr(Infinity)).toBe("—");
  });
});

describe("groupIN", () => {
  it("groups without a symbol", () => {
    expect(groupIN(1200000)).toBe("12,00,000");
    expect(groupIN(500)).toBe("500");
  });
});

describe("inrCompact", () => {
  it("lakhs and crores with two decimals", () => {
    expect(inrCompact(2240359)).toBe("₹22.40 L");
    expect(inrCompact(1389250)).toBe("₹13.89 L");
    expect(inrCompact(10413879)).toBe("₹1.04 Cr");
    expect(inrCompact(125000000)).toBe("₹12.50 Cr");
  });

  it("shows the full figure below ₹1 lakh", () => {
    expect(inrCompact(43391)).toBe("₹43,391");
    expect(inrCompact(99999)).toBe("₹99,999");
  });

  it("rolls over to crores at the boundary", () => {
    expect(inrCompact(9999999)).toBe("₹1.00 Cr");
    expect(inrCompact(100000)).toBe("₹1.00 L");
  });

  it("handles negatives", () => {
    expect(inrCompact(-1389250)).toBe("−₹13.89 L");
  });
});

describe("pct", () => {
  it("drops trailing zeros", () => {
    expect(pct(12)).toBe("12%");
    expect(pct(12.5)).toBe("12.5%");
    expect(pct(108.276, 0)).toBe("108%");
  });

  it("signs when asked, with a true minus", () => {
    expect(pct(1.6, 1, true)).toBe("+1.6%");
    expect(pct(-1.6)).toBe("−1.6%");
    expect(pct(0, 1, true)).toBe("0%");
  });
});

describe("times", () => {
  it("two decimals and a multiplication sign", () => {
    expect(times(1.8669)).toBe("1.87×");
  });
});

describe("duration", () => {
  it("years and months", () => {
    expect(duration(53)).toBe("4 years 5 months");
    expect(duration(13)).toBe("1 year 1 month");
    expect(duration(24)).toBe("2 years");
    expect(duration(5)).toBe("5 months");
    expect(duration(0)).toBe("0 months");
  });
});

describe("parseAmount", () => {
  it("reads typed rupee and percent values", () => {
    expect(parseAmount("₹10,000")).toBe(10000);
    expect(parseAmount("1,50,000")).toBe(150000);
    expect(parseAmount(" 12.5 % ")).toBe(12.5);
    expect(parseAmount("8.")).toBe(8);
    expect(parseAmount(".5")).toBe(0.5);
  });

  it("rejects junk", () => {
    expect(parseAmount("")).toBeNull();
    expect(parseAmount("abc")).toBeNull();
    expect(parseAmount("1.2.3")).toBeNull();
    expect(parseAmount("12e5")).toBeNull();
  });
});
