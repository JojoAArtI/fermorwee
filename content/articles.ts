export interface Article {
  title: string;
  category: string;
  date: string; // ISO
  minutes: number;
  slug: string;
  summary?: string;
}

export const analysisCopy = {
  eyebrow: "Latest analysis",
  title: "news, with the math done.",
  all: { label: "all articles", href: "https://fermor.in/blogs" },
  read: "read the analysis",
  languagesLead: "Guides also in",
  languages: [
    { label: "हिन्दी", lang: "hi" },
    { label: "मराठी", lang: "mr" },
    { label: "తెలుగు", lang: "te" },
    { label: "ਪੰਜਾਬੀ", lang: "pa" },
    { label: "বাংলা", lang: "bn" },
  ],
};

export const articleUrl = (slug: string) => `https://fermor.in/blogs/${slug}`;

export const featured: Article = {
  title: "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down",
  category: "Stock Market",
  date: "2026-09-29",
  minutes: 13,
  slug: "sensex-nifty-crash-september-2026",
  summary:
    "The Nifty logged its seventh straight weekly fall, matching its longest losing streak since 2020. What's driving it, and what could turn flows positive again.",
};

export const articles: Article[] = [
  {
    title: "UPI Charges Above Rs 2,000: New MDR Rule Explained",
    category: "Regulation",
    date: "2026-09-22",
    minutes: 13,
    slug: "upi-charges-above-2000",
    summary: "A new merchant discount rate applies to some high-value person-to-merchant UPI payments. Who actually pays it, who stays exempt, and what it changes for everyday transfers.",
  },
  {
    title: "Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works",
    category: "Regulation",
    date: "2026-09-25",
    minutes: 12,
    slug: "bank-strike-september-2026",
    summary: "A bank union strike lands next to a weekend and a holiday, closing branches for a stretch. Which services keep running, what to finish beforehand, and when counters reopen.",
  },
  {
    title: "Income Tax Rebate Under Section 87A: Limits and Marginal Relief",
    category: "Income Tax",
    date: "2026-07-30",
    minutes: 11,
    slug: "section-87a-rebate",
    summary: "The 87A rebate can take your tax to zero up to a threshold, with marginal relief softening the jump just above it. How both work, with the arithmetic laid out step by step.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-29" → "Sep 29, 2026". Fixed format, so server and client always agree. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
