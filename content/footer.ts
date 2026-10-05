const F = "https://fermor.in";

export const footerColumns = [
  {
    heading: "Calculators",
    links: [
      { label: "SIP", href: `${F}/calculators/sip-calculator` },
      { label: "EMI", href: `${F}/calculators/emi-calculator` },
      { label: "Home loan", href: `${F}/calculators/home-loan-calculator` },
      { label: "Income tax", href: `${F}/calculators/income-tax-calculator` },
      { label: "PPF", href: `${F}/calculators/ppf-calculator` },
      { label: "FD", href: `${F}/calculators/fd-calculator` },
      { label: "All 158 →", href: `${F}/calculators` },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Articles", href: `${F}/blogs` },
      { label: "Tax by salary", href: `${F}/tax` },
      { label: "Tax by city", href: `${F}/tax/by-city` },
      { label: "Mutual funds", href: `${F}/mutual-funds` },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: `${F}/about` },
      { label: "Contact", href: "mailto:fermor.in.contact@gmail.com" },
      { label: "For CAs", href: `${F}/calculators` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: `${F}/privacy` },
      { label: "Terms", href: `${F}/terms` },
    ],
  },
];

export const socials = [
  { name: "x", label: "Fermor on X", href: "https://twitter.com/fermor_in" },
  { name: "linkedin", label: "Fermor on LinkedIn", href: "#" }, // TODO: real URL
  { name: "youtube", label: "Fermor on YouTube", href: "#" }, // TODO: real URL
  { name: "threads", label: "Fermor on Threads", href: "#" }, // TODO: real URL
] as const;

export const disclosure =
  "Fermor Technologies Pvt. Ltd. is registered in India and operates fermor.in, a financial calculator and education platform for Indian users. Fermor is not a SEBI-registered investment adviser and does not provide personalized financial, investment, or tax advice. All calculators, content, and tools on this platform are provided for educational and informational purposes only; individual results may vary.";

export const copyright = "© 2026 Fermor Technologies Pvt. Ltd. · Made in India";

// Concept credit: this page is an assignment, not the official site.
export const conceptCredit = { author: "Joel Inian F", note: "not the official site" };
