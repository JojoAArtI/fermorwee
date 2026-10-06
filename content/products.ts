export interface Product {
  title: string;
  status: "live" | "soon";
  description: string;
  href: string;
  image: { src: string; alt: string };
}

export const railCopy = { eyebrow: "What Fermor does", title: "start where you are." };

// Full-bleed editorial imagery (a cohesive blue graphic set) — distinct from the app screens.
export const products: Product[] = [
  {
    title: "calculators",
    status: "live",
    description: "158 free tools for SIP, EMI, tax, salary and retirement.",
    href: "https://fermor.in/calculators",
    image: { src: "/img/rail/calculators.webp", alt: "A grid of binary digits" },
  },
  {
    title: "tax by salary",
    status: "live",
    description: "Your exact tax at every salary, old regime vs new.",
    href: "https://fermor.in/tax/income-tax-on-12-lakh-salary",
    image: { src: "/img/rail/tax.webp", alt: "A hand holding a calendar slip" },
  },
  {
    title: "ask",
    status: "soon",
    description: "Ask about your money. Get answers with the working shown.",
    href: "#waitlist",
    image: { src: "/img/rail/ask.webp", alt: "Two hands reaching toward a mark" },
  },
  {
    title: "portfolio",
    status: "soon",
    description: "Every account and investment in one view.",
    href: "#waitlist",
    image: { src: "/img/rail/portfolio.webp", alt: "A globe drawn from currency symbols" },
  },
  {
    title: "market",
    status: "soon",
    description: "Stocks, funds and ETFs, explained before you buy.",
    href: "#waitlist",
    image: { src: "/img/rail/market.webp", alt: "A swirl of numbers and symbols" },
  },
  {
    title: "health score",
    status: "soon",
    description: "Know where you stand, out of 100.",
    href: "#waitlist",
    image: { src: "/img/rail/health.webp", alt: "A geometric bison" },
  },
];
