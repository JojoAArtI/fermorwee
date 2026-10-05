import localFont from "next/font/local";

// Self-hosted (see scripts/build-fonts.py). Each family gets a tiny companion face
// holding only "₹", which the Latin subsets don't include.

export const fraunces = localFont({
  src: "./fonts/fraunces-latin.woff2",
  weight: "100 900",
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const frauncesRupee = localFont({
  src: "./fonts/fraunces-rupee.woff2",
  weight: "100 900",
  variable: "--font-fraunces-rupee",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

export const poppins = localFont({
  src: [
    { path: "./fonts/poppins-500-latin.woff2", weight: "500" },
    { path: "./fonts/poppins-600-latin.woff2", weight: "600" },
    { path: "./fonts/poppins-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const poppinsRupee = localFont({
  src: [
    { path: "./fonts/poppins-500-rupee.woff2", weight: "500" },
    { path: "./fonts/poppins-600-rupee.woff2", weight: "600" },
    { path: "./fonts/poppins-700-rupee.woff2", weight: "700" },
  ],
  variable: "--font-poppins-rupee",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

export const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const interRupee = localFont({
  src: "./fonts/inter-rupee.woff2",
  weight: "100 900",
  variable: "--font-inter-rupee",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

export const fontVariables = [fraunces, frauncesRupee, poppins, poppinsRupee, inter, interRupee]
  .map((f) => f.variable)
  .join(" ");
