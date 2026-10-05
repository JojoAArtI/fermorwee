"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/media/PhoneFrame";
import { GhostButton } from "@/components/ui/GhostButton";
import { Tag } from "@/components/ui/Tag";
import { products, railCopy, type Product } from "@/content/products";

function ProductCard({ p }: { p: Product }) {
  return (
    <li className="group/card relative flex h-[500px] w-[min(78vw,340px)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-panel transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
      <div className="relative h-[55%] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(60% 60% at 50% 40%, ${p.glow} 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03]">
          {p.image.phone ? (
            <PhoneFrame src={p.image.src} alt="" sizes="150px" className="mt-16 w-[150px] rounded-[30px] p-1.5 [&>div]:rounded-[24px]" />
          ) : (
            <Image src={p.image.src} alt="" width={p.image.w} height={p.image.h} sizes="260px" className="h-auto max-h-full w-[80%] rounded-2xl object-contain" />
          )}
        </div>
        <Tag variant={p.status} className="absolute left-5 top-5">
          {p.status === "live" ? "Live" : "Soon"}
        </Tag>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-5">
        <h3 className="font-display text-[32px] font-semibold leading-none tracking-[-.02em] lowercase [font-variation-settings:'opsz'_144]">{p.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-white/70">{p.description}</p>
        <GhostButton
          href={p.href}
          className="mt-auto self-start"
          aria-label={p.status === "live" ? `Know more about ${p.title}` : `Know more about ${p.title}: join the app waitlist`}
        >
          Know more
        </GhostButton>
      </div>
    </li>
  );
}

export function ProductRail() {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse drag-to-scroll (touch and trackpads already scroll natively).
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !rail.current) return;
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const el = rail.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = rail.current;
    if (!drag.current || !el) return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    delete el.dataset.dragging;
    // Keep `moved` until the click that follows the drag has been swallowed.
    setTimeout(() => (drag.current = null), 0);
  };

  return (
    <section aria-labelledby="rail-title" className="hairline py-24 md:py-36">
      <div className="wrap flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{railCopy.eyebrow}</p>
          <h2 id="rail-title" className="display-md mt-5">
            {railCopy.title}
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous products" className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-white disabled:opacity-30 disabled:hover:border-white/30">
            <ArrowLeft aria-hidden className="size-4" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next products" className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-white disabled:opacity-30 disabled:hover:border-white/30">
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        tabIndex={0}
        aria-label="Fermor products"
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className="rail no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-2 md:mt-16 md:cursor-grab md:data-[dragging]:cursor-grabbing md:data-[dragging]:snap-none"
      >
        {products.map((p) => (
          <ProductCard key={p.title} p={p} />
        ))}
      </ul>
    </section>
  );
}
