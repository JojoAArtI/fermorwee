"use client";

import { useRef } from "react";
import Image from "next/image";
import { GhostButton } from "@/components/ui/GhostButton";
import { Tag } from "@/components/ui/Tag";
import { products, railCopy, type Product } from "@/content/products";
import { ANY_MOTION, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function ProductCard({ p }: { p: Product }) {
  return (
    <li data-card className="group/card relative h-[clamp(440px,64vh,560px)] w-[min(80vw,360px)] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-panel">
      <Image src={p.image.src} alt={p.image.alt} fill sizes="360px" className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]" />
      {/* Readability gradient over the photo. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(5_6_6/.95)_12%,rgb(5_6_6/.55)_42%,rgb(5_6_6/.12)_100%)]" />

      <Tag variant={p.status} className="absolute left-5 top-5">
        {p.status === "live" ? "Live" : "Soon"}
      </Tag>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
        <h3 className="font-display text-[clamp(28px,2.4vw,34px)] font-light leading-none tracking-[-.01em] lowercase text-white [font-variation-settings:'opsz'_144]">{p.title}</h3>
        <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/70">{p.description}</p>
        <GhostButton
          href={p.href}
          className="mt-6 self-start"
          aria-label={p.status === "live" ? `Know more about ${p.title}` : `Know more about ${p.title}: join the app waitlist`}
        >
          Know more
        </GhostButton>
      </div>
    </li>
  );
}

export function ProductRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  // Motion allowed (desktop and phone): pin the section and turn vertical scroll into horizontal
  // travel, so the rail plays through fully before the page moves on. Reduced motion keeps native swipe.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        const el = track.current!;
        const wrapper = el.parentElement as HTMLElement;
        // Let the pinned track travel outside the wrapper (the section clips it); native scroll was
        // the no-JS / reduced-motion fallback, so only override it once GSAP is actually running.
        wrapper.style.overflowX = "visible";
        const distance = () => Math.max(0, el.scrollWidth - wrapper.clientWidth);
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
        trigger.current = tween.scrollTrigger ?? null;
        return () => {
          trigger.current = null;
          wrapper.style.overflowX = "";
        };
      });
    },
    { scope: section },
  );

  // Keyboard: a card focused off to the side can't be scrolled into view (it's translated, not
  // scrolled), so nudge the page scroll to the point that reveals it.
  const onFocusCapture = (e: React.FocusEvent<HTMLUListElement>) => {
    const st = trigger.current;
    const el = track.current;
    if (!st || !el) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!card) return;
    const distance = Math.max(0, el.scrollWidth - (el.parentElement?.clientWidth ?? 0));
    if (!distance) return;
    const x = Math.min(distance, Math.max(0, card.offsetLeft - 32));
    window.scrollTo({ top: st.start + (x / distance) * (st.end - st.start) });
  };

  return (
    <section ref={section} aria-labelledby="rail-title" className="hairline overflow-hidden py-20 md:py-28">
      <div className="wrap">
        <p className="eyebrow">{railCopy.eyebrow}</p>
        <h2 id="rail-title" className="display-md mt-5">
          {railCopy.title}
        </h2>
      </div>

      <div className="no-scrollbar mt-12 overflow-x-auto md:mt-16">
        <ul
          ref={track}
          onFocusCapture={onFocusCapture}
          aria-label="Fermor products"
          className="flex w-max snap-x snap-mandatory gap-4 px-[max(16px,calc((100vw-1200px)/2+16px))] will-change-transform sm:px-[max(24px,calc((100vw-1200px)/2+24px))] lg:px-[max(32px,calc((100vw-1200px)/2+32px))]"
        >
          {products.map((p) => (
            <ProductCard key={p.title} p={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
