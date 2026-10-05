import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { sip } from "@/lib/finance";
import { inr } from "@/lib/format";

export const alt = "Fermor: money, with the math shown. ₹10,000 a month for 10 years grows to ₹22,40,359.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og can't read woff2, so these are .woff copies (see app/_og/).
const font = (file: string) => readFile(join(process.cwd(), "app/_og", file));

export default async function OpengraphImage() {
  const [fraunces, poppins, poppinsExt] = await Promise.all([font("fraunces-700.woff"), font("poppins-600.woff"), font("poppins-600-ext.woff")]);
  const value = inr(sip(10000, 12, 10).value);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#050606", padding: "72px 80px", position: "relative" }}>
        {/* Soft mint glow behind the headline */}
        <div style={{ position: "absolute", left: 420, top: -40, width: 760, height: 760, background: "radial-gradient(circle, rgba(117,251,144,0.16) 0%, rgba(117,251,144,0) 65%)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="62" height="47" viewBox="-1.04 -0.79 2.08 1.58" fill="#75FB90">
            <path d="M0.9526 -0.7447 L0.7342 -0.4684 L0.1684 -0.4684 L-0.2895 0.1132 L-1 0.1132 L-0.7868 -0.1579 L-0.4342 -0.1579 L0.0289 -0.7447 Z" />
            <path d="M-0.9526 0.7447 L-0.7342 0.4684 L-0.1684 0.4684 L0.2895 -0.1132 L1 -0.1132 L0.7868 0.1579 L0.4342 0.1579 L-0.0289 0.7447 Z" />
          </svg>
          <div style={{ fontFamily: "Poppins", fontSize: 34, color: "#fff" }}>Fermor</div>
        </div>

        <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 112, lineHeight: 0.95, letterSpacing: "-0.03em", color: "#fff", maxWidth: 900 }}>
          money, with the math shown.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: "Poppins, PoppinsRupee", fontSize: 34, color: "rgba(255,255,255,.7)" }}>
          <span>₹10,000/month for 10 years</span>
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="#75FB90" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h34M26 3l10 9-10 9" />
          </svg>
          <span style={{ color: "#75FB90" }}>{value}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 700, style: "normal" },
        { name: "Poppins", data: poppins, weight: 600, style: "normal" },
        { name: "PoppinsRupee", data: poppinsExt, weight: 600, style: "normal" },
      ],
    },
  );
}
