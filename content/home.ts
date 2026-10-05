// Copy for the top half of the page: hero, manifesto, app fan, live calculator.

export const hero = {
  eyebrow: "Personal finance, for India",
  // The headline is split so "math" can carry the mint marker.
  title: { before: "money, with the ", mark: "math", after: " shown." },
  lead: "Fermor turns SIPs, loans, tax and salary into clear numbers. 158 free calculators today, an app that explains every rupee tomorrow. Built for India. No login, no sales pitch.",
  primary: { label: "explore calculators", href: "https://fermor.in/calculators" },
  secondary: { label: "join the app waitlist", href: "#waitlist" },
  trust: ["158 calculators", "runs in your browser", "₹0 to use"],
  card: { eyebrow: "Net worth", value: "₹12,48,230", tag: "preview" },
};

export const manifesto = {
  eyebrow: "Not a members-only club.",
  text: "most money decisions in india are made on a guess. a bank's number. a friend's tip. a spreadsheet nobody checks. we think you deserve the working, not just the answer. so fermor shows the math. every time, to everyone.",
  signature: "— financial clarity. real momentum.",
};

export const appFan = {
  eyebrow: "The Fermor app · coming soon",
  title: "every rupee, explained.",
  sub: "Your accounts, your spending, your investments, with the reasoning shown. Join the waitlist to get it first.",
  tag: "preview · app in waitlist",
  phones: [
    { src: "/img/screens/screen-goals.webp", caption: "home", alt: "Fermor app home screen: a greeting, a financial health score and savings goals for a home, education and a car" },
    { src: "/img/screens/screen-stocks-v2.webp", caption: "stocks", alt: "Fermor app stocks tab: the Nifty 50 at 22,374.65 and a list of popular stocks" },
    { src: "/img/screens/screen-mutualfunds.webp", caption: "mutual funds", alt: "Fermor app mutual funds tab: trending funds, fund categories and SIP options" },
    { src: "/img/screens/screen-etfs.webp", caption: "ETFs", alt: "Fermor app ETFs tab: a list of exchange traded funds with returns" },
  ],
};

export const calculatorCopy = {
  eyebrow: "Try it · no login",
  title: "run it before you sign it.",
  sub: "Real numbers, real formulas, the same math as Fermor's 158 calculators.",
  disclaimer: "Results are indicative and for education only. Not financial advice.",
  links: {
    sip: { label: "open the full SIP calculator", href: "https://fermor.in/calculators/sip-calculator" },
    loan: { label: "open the full home loan calculator", href: "https://fermor.in/calculators/home-loan-calculator" },
    tax: { label: "open the full income tax calculator", href: "https://fermor.in/calculators/income-tax-calculator" },
  },
  taxHint: "FY 2026-27, salaried, below 60. Surcharge not included. Salary capped at ₹50 L.",
};

export const whereYouStand = {
  eyebrow: "Portfolio · preview",
  title: "your whole money life, on one screen.",
  body: "Income, investments, spending, assets and goals, connected. Fermor does the math on your actual life, and tells you the two changes that matter most.",
  points: [
    "A financial health score out of 100, explained",
    "Where your money went this month, by category",
    "Goals that update when your numbers do",
  ],
  tag: "preview",
  cards: {
    income: { src: "/img/cards/card-income.webp", w: 774, h: 481, alt: "Income card from the Fermor app: ₹1,25,000 this month, up 12%" },
    investments: { src: "/img/cards/card-investments.webp", w: 787, h: 496, alt: "Investments card: ₹8,42,300 with a growth chart" },
    expenses: { src: "/img/cards/card-expenses.webp", w: 900, h: 843, alt: "Monthly expenses card: ₹48,320 against a budget ring" },
    assets: { src: "/img/cards/card-assets.webp", w: 700, h: 1207, alt: "Assets card: ₹1,12,50,000 across property, vehicles and gold" },
    goals: { src: "/img/cards/card-goals.webp", w: 734, h: 485, alt: "Goals card: Buy a Home, 60% funded" },
  },
};

export const privacy = {
  eyebrow: "Your numbers aren't our business.",
  text: "every calculation runs in your browser. nothing you type is sent to us to get a result. no login wall. ads and partner links are always labelled.",
  facts: [
    { icon: "lock", label: "Runs on your device" },
    { icon: "user-x", label: "No account needed" },
    { icon: "tag", label: "Ads always labelled" },
  ] as const,
};

export const closing = {
  title: "now everyone gets it.",
  sub: "Clarity isn't a members-only club. Join the waitlist for the Fermor app and be first to get your free financial health check.",
  emailLabel: "Email address",
  placeholder: "you@example.com",
  submit: "join waitlist",
  note: "One email when the app opens. No spam. No sharing.",
  success: "you're on the list. we'll write once, when it's ready.",
  errors: { invalid: "That email doesn't look right.", failed: "Something went wrong. Try again." },
  stores: ["App Store", "Google Play"],
};
