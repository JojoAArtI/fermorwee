"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { loginLink, navLinks, waitlistLink } from "@/content/nav";
import { ButtonLink } from "./Button";
import { Mark } from "./Mark";
import { MobileMenu } from "./MobileMenu";

const SCROLLED_AT = 120; // px scrolled before the words give way to the pill bar

/**
 * Two navs in one landmark:
 *  - at the top of the page, plain words over the hero (brand on two lines, links on the right);
 *  - once you scroll, a floating pill bar slides in. It turns light over light panels ([data-nav-light]).
 * Only the active layer is reachable: the other is `inert`.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const topMenuButton = useRef<HTMLButtonElement>(null);
  const barMenuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLLED_AT);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Light panels (the closing panel) mark themselves with data-nav-light.
    const panels = document.querySelectorAll("[data-nav-light]");
    if (!panels.length) return;
    const under = new Set<Element>();
    let io: IntersectionObserver | undefined;

    // Watch a 1px line across the bar's vertical centre (44px from the top).
    const observe = () => {
      io?.disconnect();
      under.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) under.add(e.target);
            else under.delete(e.target);
          }
          setLight(under.size > 0);
        },
        { rootMargin: `-44px 0px -${Math.max(0, window.innerHeight - 45)}px 0px` },
      );
      panels.forEach((p) => io!.observe(p));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      window.removeEventListener("resize", observe);
      io?.disconnect();
    };
  }, []);

  const closeMenu = useCallback(
    (returnFocus = true) => {
      setOpen(false);
      if (returnFocus) (scrolled ? barMenuButton : topMenuButton).current?.focus();
    },
    [scrolled],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main">
        {/* Top of page: just words. */}
        <div
          data-nav-words
          inert={scrolled}
          className={`flex items-start justify-between px-4 pt-5 transition-[opacity,transform] duration-500 ease-out-expo sm:px-8 sm:pt-8 ${
            scrolled ? "pointer-events-none -translate-y-3 opacity-0" : "opacity-100"
          }`}
        >
          <a href="#main" className="-my-3 block py-3 font-sans text-[15px] leading-[1.35] text-white">
            <span data-split className="block font-medium">
              Fermor
            </span>
            <span data-split className="block text-white/70">
              Money, with the math shown.
            </span>
          </a>

          <ul className="hidden items-start gap-10 md:flex lg:gap-16">
            {[...navLinks, loginLink].map((link) => (
              <li key={link.label}>
                <a href={link.href} title={link.title} data-split className="-my-3 block min-w-11 py-3 font-sans text-[15px] capitalize leading-[1.35] text-white transition-opacity hover:opacity-60">
                  {link.label === "for CAs" ? "For CAs" : link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={topMenuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 -mt-3 inline-flex h-11 items-center px-2 font-sans text-[15px] text-white md:hidden"
          >
            <span data-split>Menu</span>
          </button>
        </div>

        {/* After scrolling: the floating pill bar. */}
        <div
          inert={!scrolled}
          data-light={light || undefined}
          className={`group/nav absolute inset-x-3 top-3 mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full border border-line bg-black/40 pl-4 pr-1.5 text-white backdrop-blur-md transition-[background-color,border-color,color,opacity,transform] duration-500 ease-out-expo data-[light]:border-ink/10 data-[light]:bg-white/70 data-[light]:text-ink md:top-4 md:pl-5 md:pr-2 ${
            scrolled ? "opacity-100" : "pointer-events-none -translate-y-[140%] opacity-0"
          }`}
        >
          <a href="#main" className="-ml-1 flex items-center gap-2.5 rounded-full px-1 py-2" aria-label="Fermor, back to top">
            <Mark className="h-6 w-auto" />
            <span className="font-ui text-lg font-semibold tracking-[-.01em]">Fermor</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  title={link.title}
                  className="inline-flex h-11 items-center rounded-full px-3.5 font-ui text-sm font-medium text-white/70 transition-colors hover:text-white group-data-[light]/nav:text-ink/70 group-data-[light]/nav:hover:text-ink lg:px-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1.5 md:flex">
            <a
              href={loginLink.href}
              className="inline-flex h-11 items-center rounded-full px-4 font-ui text-sm font-semibold text-white/90 transition-colors hover:text-white group-data-[light]/nav:text-ink/80 group-data-[light]/nav:hover:text-ink"
            >
              {loginLink.label}
            </a>
            <ButtonLink href={waitlistLink.href} variant="mint" className="h-11">
              {waitlistLink.label}
            </ButtonLink>
          </div>

          <button
            ref={barMenuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
          >
            <Menu aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={closeMenu} />
    </header>
  );
}
