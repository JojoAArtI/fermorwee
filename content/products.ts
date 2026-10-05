export interface Product {
  title: string;
  status: "live" | "soon";
  description: string;
  href: string;
  image: { src: string; w: number; h: number; phone?: boolean };
  glow: string;
}

export const railCopy = { eyebrow: "What Fermor does", title: "start where you are." };

export const products: Product[] = [
  {
    title: "calculators",
    status: "live",
    description: "158 free tools for SIP, EMI, tax, salary and retirement.",
    href: "https://fermor.in/calculators",
    image: { src: "/img/cards/card-income.webp", w: 774, h: 481 },
    glow: "rgb(117 251 144 / .45)",
  },
  {
    title: "tax by salary",
    status: "live",
    description: "Your exact tax at every salary, old regime vs new.",
    href: "https://fermor.in/tax/income-tax-on-12-lakh-salary",
    image: { src: "/img/cards/card-goals.webp", w: 734, h: 485 },
    glow: "rgb(140 200 255 / .35)",
  },
  {
    title: "ask",
    status: "soon",
    description: "Ask about your money. Get answers with the working shown.",
    href: "#waitlist",
    image: { src: "/img/screens/screen-goals.webp", w: 720, h: 1556, phone: true },
    glow: "rgb(117 251 144 / .30)",
  },
  {
    title: "portfolio",
    status: "soon",
    description: "Every account and investment in one view.",
    href: "#waitlist",
    image: { src: "/img/cards/card-investments.webp", w: 787, h: 496 },
    glow: "rgb(75 91 255 / .45)",
  },
  {
    title: "market",
    status: "soon",
    description: "Stocks, funds and ETFs, explained before you buy.",
    href: "#waitlist",
    image: { src: "/img/screens/screen-stocks-v2.webp", w: 715, h: 1600, phone: true },
    glow: "rgb(255 255 255 / .18)",
  },
  {
    title: "health score",
    status: "soon",
    description: "Know where you stand, out of 100.",
    href: "#waitlist",
    image: { src: "/img/cards/card-expenses.webp", w: 900, h: 843 },
    glow: "rgb(212 81 81 / .40)",
  },
];
