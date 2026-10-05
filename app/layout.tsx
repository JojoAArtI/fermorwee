import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fermor: money, with the math shown",
  description:
    "158 free calculators for SIP, EMI, income tax and salary, built for India. Run the numbers before you decide. No login, the math is always shown.",
};

export const viewport: Viewport = {
  themeColor: "#050606",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:font-ui focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
