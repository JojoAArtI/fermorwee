import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE, SITE_URL } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050606",
};

const INTRO_SCRIPT = `try{if(!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("fermor-intro"))document.documentElement.classList.add("intro")}catch(e){}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fermor",
    legalName: "Fermor Technologies Pvt. Ltd.",
    url: "https://fermor.in",
    logo: `${SITE_URL}/brand/fermor-mark.svg`,
    sameAs: ["https://twitter.com/fermor_in"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    inLanguage: "en-IN",
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Before first paint: decide whether the hero intro plays (first visit this session, motion allowed). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:font-ui focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
