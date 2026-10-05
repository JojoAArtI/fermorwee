import { AtSign } from "lucide-react";
import { Mark } from "@/components/ui/Mark";
import { conceptCredit, copyright, disclosure, footerColumns, socials } from "@/content/footer";

// Simple monochrome brand glyphs (lucide doesn't ship brand icons).
const SOCIAL_ICONS: Record<Exclude<(typeof socials)[number]["name"], "threads">, React.ReactNode> = {
  x: <path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />,
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
  ),
  youtube: (
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
  ),
};

export function Footer() {
  return (
    <footer className="hairline relative overflow-hidden pt-20">
      <div className="wrap">
        {/* Row 1: brand + link columns */}
        <div className="grid gap-12 lg:grid-cols-12">
          <a href="#main" className="flex items-center gap-2.5 self-start rounded-full lg:col-span-4" aria-label="Fermor, back to top">
            <Mark className="h-7 w-auto" />
            <span className="font-ui text-xl font-semibold">Fermor</span>
          </a>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h2 className="font-ui text-xs font-semibold uppercase tracking-[.3em] text-white/90">{col.heading}</h2>
                <ul className="mt-5 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="inline-flex min-h-9 items-center text-[15px] text-white/50 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Row 2: socials */}
        <ul className="mt-16 flex gap-3">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                className="grid size-11 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                {s.name === "threads" ? (
                  <AtSign aria-hidden className="size-[18px]" strokeWidth={1.75} />
                ) : (
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                    {SOCIAL_ICONS[s.name]}
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Row 3: disclosure (exact wording) */}
        <p className="mt-12 max-w-[90ch] text-[13px] leading-relaxed text-white/50">{disclosure}</p>

        {/* Row 4: legal line + concept credit */}
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-white/50 md:flex-row md:justify-between">
          <p>{copyright}</p>
          <p>
            Concept homepage by {conceptCredit.author} · {conceptCredit.note}
          </p>
        </div>
      </div>

      {/* Giant clipped wordmark */}
      <div aria-hidden className="relative mt-16 flex flex-col items-center">
        <span className="h-0.5 w-20 bg-mint" />
        <p className="mt-6 translate-y-[20%] select-none font-display text-[22vw] font-bold leading-[.8] tracking-[-.04em] text-white/[.06] [font-variation-settings:'opsz'_144]">
          fermor
        </p>
      </div>
    </footer>
  );
}
