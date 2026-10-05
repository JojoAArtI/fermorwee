"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Check, Loader2, Smartphone } from "lucide-react";
import { Mark } from "@/components/ui/Mark";
import { closing as copy } from "@/content/home";
import { isValidEmail } from "@/lib/email";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";

type Status = "idle" | "submitting" | "success" | "error";

export function Closing() {
  const section = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Desktop + motion: two halves of the silk part like a curtain to reveal the panel.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        gsap.set("[data-curtain]", { display: "block" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-panel]", start: "top 70%", end: "top 10%", scrub: true },
        });
        tl.to("[data-curtain=left]", { xPercent: -100, ease: "none" }, 0).to("[data-curtain=right]", { xPercent: 100, ease: "none" }, 0);
      });
    },
    { scope: section },
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = input.current?.value.trim() ?? "";
    if (!isValidEmail(email)) {
      setStatus("error");
      setError(copy.errors.invalid);
      input.current?.focus();
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) return setStatus("success");
      const body = await res.json().catch(() => ({}));
      setStatus("error");
      setError(res.status === 400 && body.error ? body.error : copy.errors.failed);
    } catch {
      setStatus("error");
      setError(copy.errors.failed);
    }
  };

  const invalid = status === "error";

  return (
    <section ref={section} id="waitlist" aria-labelledby="waitlist-title" className="p-3">
      <div data-panel data-nav-light className="on-light relative isolate overflow-hidden rounded-[20px] bg-cream text-ink md:rounded-[28px]">
        {/* Soft silk behind the content (the only view on mobile / reduced motion). */}
        <Image src="/img/curtain.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />

        <div className="mx-auto flex max-w-[960px] flex-col items-center px-5 py-20 text-center md:min-h-[90svh] md:justify-center md:py-28">
          <span className="grid size-14 place-items-center rounded-2xl bg-ink">
            <Mark className="h-6 w-auto" />
          </span>
          <h2 id="waitlist-title" className="display mt-8 text-balance text-ink">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[clamp(17px,1.4vw,18px)] leading-relaxed text-ink/70">{copy.sub}</p>

          <div className="mt-10 w-full max-w-[520px]">
            {status === "success" ? (
              <p role="status" className="flex items-center justify-center gap-3 rounded-full bg-white/70 px-6 py-4 font-ui text-base font-semibold lowercase text-ink">
                <span className="grid size-7 place-items-center rounded-full bg-mint">
                  <Check aria-hidden className="size-4" strokeWidth={2.5} />
                </span>
                {copy.success}
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="waitlist-email" className="sr-only">
                  {copy.emailLabel}
                </label>
                <input
                  ref={input}
                  id="waitlist-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={254}
                  placeholder={copy.placeholder}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? "waitlist-error" : "waitlist-note"}
                  onChange={() => status === "error" && setStatus("idle")}
                  className={`h-14 min-w-0 flex-1 rounded-full border bg-white px-6 text-base text-ink outline-none transition-colors placeholder:text-ink/45 focus-visible:border-mint-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-deep ${
                    invalid ? "border-[#B42318]" : "border-ink/15"
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-7 font-ui text-base font-semibold lowercase text-white transition-colors hover:bg-black disabled:opacity-80"
                >
                  {status === "submitting" && <Loader2 aria-hidden className="size-4 animate-spin" />}
                  {status === "submitting" ? "joining…" : copy.submit}
                </button>
              </form>
            )}
            {invalid && (
              <p id="waitlist-error" role="alert" className="mt-3 text-left text-sm text-[#B42318] sm:pl-6">
                {error}
              </p>
            )}
            {status !== "success" && (
              <p id="waitlist-note" className="mt-4 text-xs text-ink/60">
                {copy.note}
              </p>
            )}
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-3" aria-label="Mobile apps">
            {copy.stores.map((s) => (
              <li
                key={s}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-4 font-ui text-[13px] font-medium text-ink/70"
              >
                <Smartphone aria-hidden className="size-4" strokeWidth={1.5} />
                {s} · coming soon
              </li>
            ))}
          </ul>
        </div>

        {/* Curtain halves: hidden until GSAP shows them (desktop + motion only). */}
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            data-curtain={side}
            aria-hidden
            className={`absolute inset-y-0 z-10 hidden w-1/2 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
          >
            <Image
              src="/img/curtain.webp"
              alt=""
              fill
              sizes="100vw"
              className={`!w-[200%] max-w-none object-cover ${side === "left" ? "!left-0" : "!left-auto !right-0"}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
