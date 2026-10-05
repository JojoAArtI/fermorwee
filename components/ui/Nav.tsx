"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { loginLink, navLinks, waitlistLink } from "@/content/nav";
import { ButtonLink } from "./Button";
import { Mark } from "./Mark";
import { MobileMenu } from "./MobileMenu";

/** Floating pill nav. Turns light while it sits over a light panel ([data-nav-light]). */
export function Nav() {
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Light panels (hero sheet, closing panel) mark themselves with data-nav-light.
    const panels = document.querySelectorAll("[data-nav-light]");
    if (!panels.length) return;
    const under = new Set<Element>();
    let io: IntersectionObserver | undefined;

    // Watch a 1px line across the nav's vertical centre (44px from the top).
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

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:top-4">
      <nav
        aria-label="Main"
        data-light={light || undefined}
        className="group/nav mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full border border-line bg-black/40 pl-4 pr-1.5 text-white backdrop-blur-md transition-[background-color,border-color,color] duration-500 data-[light]:border-ink/10 data-[light]:bg-white/70 data-[light]:text-ink md:pl-5 md:pr-2"
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
          ref={menuButton}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
        >
          <Menu aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </nav>

      <MobileMenu open={open} onClose={closeMenu} />
    </header>
  );
}
