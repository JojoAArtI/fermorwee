"use client";

import { useRef, type CSSProperties } from "react";
import { PhoneFrame } from "@/components/media/PhoneFrame";
import { Tag } from "@/components/ui/Tag";
import { appFan } from "@/content/home";
import { gsap, useGSAP } from "@/lib/gsap";

// Final fan positions (desktop). x is a share of the stage width.
const FAN = [
  { x: -0.36, r: -14, y: 40, z: 1 },
  { x: -0.12, r: -5, y: 0, z: 3 },
  { x: 0.12, r: 5, y: 0, z: 3 },
  { x: 0.36, r: 14, y: 40, z: 1 },
];
// Gentle tilt for the mobile row.
const TILT = [-4, -1.5, 1.5, 4];

const PHONE_W = "w-[clamp(180px,18vw,260px)] md:w-[min(clamp(180px,18vw,260px),calc((100svh-440px)*0.4615))]";

export function AppFan() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const phones = gsap.utils.toArray<HTMLElement>("[data-phone]");
      const mm = gsap.matchMedia();

      // Desktop: pin for one screen while the stacked phones fan out.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const width = () => stage.current!.offsetWidth;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          phones,
          {
            xPercent: -50,
            x: (i) => (i - 1.5) * 10,
            y: (i) => 20 + Math.abs(i - 1.5) * 6,
            rotation: (i) => (i - 1.5) * 2,
          },
          {
            xPercent: -50,
            x: (i) => FAN[i].x * width(),
            y: (i) => FAN[i].y,
            rotation: (i) => FAN[i].r,
            ease: "none",
            duration: 1,
          },
        );
        // Captions would pile up while the phones are stacked; bring them in as the fan opens.
        tl.fromTo("[data-phone] figcaption", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.7);
      });

      // Mobile: no pin; the row tilts into place once on enter.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(phones, {
          y: 40,
          rotation: 0,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: stage.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="products"
      aria-labelledby="products-title"
      className="relative overflow-hidden py-24 md:flex md:h-svh md:min-h-[720px] md:flex-col md:py-0 md:pt-24"
    >
      <div className="wrap relative z-10 text-center">
        <p className="eyebrow">{appFan.eyebrow}</p>
        <h2 id="products-title" className="display-md mt-5">
          {appFan.title}
        </h2>
        <p className="body-lg mx-auto mt-5 max-w-[52ch]">{appFan.sub}</p>
        <Tag className="mt-6 lg:absolute lg:right-8 lg:top-0 lg:mt-0">{appFan.tag}</Tag>
      </div>

      <div className="relative mt-12 md:mt-8 md:flex-1">
        <div aria-hidden className="glow-mint pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-60" />

        <div
          ref={stage}
          className="no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto px-[max(16px,calc(50vw-90px))] pb-6 pt-4 md:mx-auto md:block md:h-full md:max-w-[1200px] md:overflow-visible md:p-0 md:[container-type:inline-size]"
          role="list"
          aria-label="Fermor app screens"
        >
          {appFan.phones.map((p, i) => (
            <figure
              key={p.src}
              role="listitem"
              data-phone
              className="fan-phone relative shrink-0 snap-center first:ml-0 [&:not(:first-child)]:-ml-6 md:absolute md:left-1/2 md:top-0 md:!ml-0"
              style={
                {
                  zIndex: FAN[i].z,
                  "--x": `${FAN[i].x * 100}cqw`,
                  "--y": `${FAN[i].y}px`,
                  "--r": `${FAN[i].r}deg`,
                  "--rm": `${TILT[i]}deg`,
                } as CSSProperties
              }
            >
              <PhoneFrame src={p.src} alt={p.alt} sizes="(min-width: 768px) 260px, 200px" className={PHONE_W} />
              <figcaption className="mt-3 text-center text-xs text-white/50">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

    </section>
  );
}
