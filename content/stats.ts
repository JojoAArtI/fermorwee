export const proofCopy = {
  eyebrow: "Fermor today",
  title: "the math checks out.",
  amcCaption: "Funds from every AMC in India. Logos are for identification only.",
};

// Fermor's own published figures (fermor.in, October 2026). Nothing here is estimated.
export const stats: { value: number; prefix?: string; label: string; countUp: boolean }[] = [
  { value: 158, label: "Free calculators", countUp: true },
  { value: 2472, label: "Mutual funds tracked daily", countUp: true },
  { value: 7, label: "Indian languages", countUp: true },
  { value: 0, prefix: "₹", label: "To use. No login wall.", countUp: false },
];

export const amcs = [
  { slug: "axis", name: "Axis" },
  { slug: "hdfc", name: "HDFC" },
  { slug: "icici-prudential", name: "ICICI Prudential" },
  { slug: "invesco", name: "Invesco" },
  { slug: "motilal-oswal", name: "Motilal Oswal" },
  { slug: "sbi", name: "SBI" },
  { slug: "tata", name: "Tata" },
  { slug: "uti", name: "UTI" },
];
