// The deployed origin. Set NEXT_PUBLIC_SITE_URL on the host (e.g. https://fermor-concept.vercel.app).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const SITE = {
  name: "Fermor",
  title: "Fermor: money, with the math shown",
  description:
    "158 free calculators for SIP, EMI, income tax and salary, built for India. Run the numbers before you decide. No login, the math is always shown.",
  twitter: "@fermor_in",
};
