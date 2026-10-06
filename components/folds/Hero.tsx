"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { hero } from "@/content/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

const SCALE = 0.17; // tile size as a share of the viewport
const GAP = 32;
const ROTATIONS = [-15, 5, -7.5, 10, -2.5];
const VIDEO_INDEX = 2; // the middle tile becomes the hero

/**
 * Full-bleed hero. On the first visit of a session (motion allowed) it plays an intro: a loading
 * bar, five tilted tiles sliding into a row, the outer four flying off while the middle one (the
 * video) grows to fill the screen, then the headline rising line by line.
 *
 * The server renders the finished state. An inline script in the layout adds `.intro` to <html>
 * before first paint, which hides the copy under the loader until this timeline takes over.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("intro")) return;
      const finish = () => {
        html.classList.remove("intro");
        getLenis()?.start();
        try {
          sessionStorage.setItem("fermor-intro", "1");
        } catch {}
      };
      // Landed mid-page (refresh, anchor): skip the intro.
      if (window.scrollY > 10) return finish();
      getLenis()?.stop();

      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
      const vw = window.innerWidth;
      const tileW = vw * SCALE;
      const rowW = tileW * tiles.length + GAP * (tiles.length - 1);
      const rowX = (vw - rowW) / 2;
      const offX = rowX - vw * 1.3;
      const at = (start: number, i: number) => start + i * (tileW + GAP) + tileW / 2 - vw / 2;

      tiles.forEach((tile, i) => {
        gsap.set(tile, { scale: SCALE, x: at(offX, i), rotation: ROTATIONS[i], borderRadius: "2.5rem", autoAlpha: 1 });
      });

      const header = document.querySelector("header");
      const opts = { type: "lines", mask: "lines", linesClass: "line", autoSplit: false, aria: "none" } as const;
      const navSplit = SplitText.create(document.querySelectorAll("[data-nav-words] [data-split]"), opts);
      const headSplit = SplitText.create("[data-split-head]", opts);
      const linkSplit = SplitText.create("[data-split]", opts);
      const splits = [navSplit, headSplit, linkSplit];
      gsap.set([...navSplit.lines, ...headSplit.lines, ...linkSplit.lines], { yPercent: 125 });
      gsap.set("[data-intro-hide]", { opacity: 1 });

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          splits.forEach((s) => s.revert());
          gsap.set(tiles, { clearProps: "all" });
          gsap.set("[data-intro-hide], [data-intro-fade]", { clearProps: "opacity,transform" });
          if (header) gsap.set(header, { clearProps: "opacity" });
          finish();
        },
      });

      tl.to("[data-loader-bar]", { scaleX: 1, duration: 1.1, ease: "glide" })
        .set("[data-loader-bar]", { transformOrigin: "right center" })
        .to("[data-loader-bar]", { scaleX: 0, duration: 0.9, ease: "hop" })
        .to("[data-loader]", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.9, ease: "hop" }, "<0.5");

      tiles.forEach((tile, i) => tl.to(tile, { x: at(rowX, i), duration: 1.3, ease: "glide" }, i ? "<0.025" : "<0.1"));

      tl.addLabel("spread");
      tiles.forEach((tile, i) => {
        if (i === VIDEO_INDEX) return;
        tl.to(tile, { x: i < VIDEO_INDEX ? "-=100vw" : "+=100vw", duration: 1.3, ease: "glide" }, "spread");
      });
      tl.to(tiles[VIDEO_INDEX], { scale: 1, x: 0, rotation: 0, borderRadius: 0, duration: 1.3, ease: "glide" }, "spread");

      // Words rise line by line: nav, then the statement, then the links.
      if (header) tl.set(header, { opacity: 1 }, "spread+=1");
      tl.to(navSplit.lines, { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "spread+=1");
      tl.to(headSplit.lines, { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "<");
      tl.to(linkSplit.lines, { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "<0.25");
      tl.fromTo("[data-intro-fade]", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.4");
    },
    { scope: root },
  );

  // Ambient video: plays muted on a loop, never under reduced motion, pauses off screen.
  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.preload = "auto";
    v.load();
    v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!userPaused.current) v.play().catch(() => {});
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    userPaused.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const sideTiles = [hero.tiles[0], hero.tiles[1], null, hero.tiles[2], hero.tiles[3]];

  return (
    <section ref={root} id="hero" aria-labelledby="hero-title" className="relative h-svh min-h-[600px] overflow-hidden bg-void">
      {/* Loader (only shown while <html> has .intro) */}
      <div data-loader aria-hidden className="hero-loader fixed inset-0 z-[70] bg-[#0f0f0f] [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
        <div data-loader-bar className="absolute inset-x-0 top-0 h-2 origin-left scale-x-0 bg-white" />
      </div>

      {/* Tiles. Each is a full-screen box; the intro scales them down to cards. */}
      {sideTiles.map((src) =>
        src === null ? (
          <div key="video" data-tile className="absolute inset-0 overflow-hidden will-change-transform">
            <Image src={hero.video.poster} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
            <video
              ref={video}
              muted
              loop
              playsInline
              preload="none"
              poster={hero.video.poster}
              aria-hidden
              tabIndex={-1}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {hero.video.sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
            {/* Keep the copy readable over bright frames. */}
            <div aria-hidden className="absolute inset-0 bg-[#0f0f0f]/55" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
          </div>
        ) : (
          <div key={src} data-tile aria-hidden className="hero-side-tile absolute inset-0 overflow-hidden bg-panel will-change-transform">
            <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
          </div>
        ),
      )}

      {/* Copy: one statement top-left, links bottom-left (layout after the reference). */}
      <div className="relative z-10 flex h-full flex-col justify-between px-4 pb-8 pt-[15svh] sm:px-8 lg:pb-[15svh]">
        <div data-intro-hide className="w-full lg:w-[60%]">
          <h1 id="hero-title" data-split-head className="font-sans text-[clamp(30px,3.4vw,52px)] font-normal leading-[1.1] tracking-[-.01em] text-white">
            {hero.title}
          </h1>
        </div>

        <div data-intro-hide className="flex flex-col items-start font-sans text-[15px] leading-[1.35] text-white">
          <p data-split className="text-white/60">
            {hero.links.label}
          </p>
          {hero.links.items.map((l) => (
            <a key={l.label} href={l.href} data-split className="flex min-h-11 w-fit items-center transition-opacity hover:opacity-60">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        data-intro-fade
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-4 right-4 z-20 grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors hover:border-white/60 md:bottom-6 md:right-6"
      >
        {playing ? <Pause aria-hidden className="size-3.5" fill="currentColor" /> : <Play aria-hidden className="ml-0.5 size-3.5" fill="currentColor" />}
      </button>
    </section>
  );
}
