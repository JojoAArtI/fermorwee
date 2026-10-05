"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { loginLink, navLinks, waitlistLink } from "@/content/nav";
import { getLenis, scrollToId } from "@/lib/lenis";
import { ButtonLink } from "./Button";
import { Mark } from "./Mark";

const links = [...navLinks, loginLink];

/** Full-screen menu for < 768px. Traps focus, closes on Esc, locks page scroll. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: (returnFocus?: boolean) => void }) {
  const sheet = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    getLenis()?.stop();
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const items = sheet.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // Close if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && onClose();
    mq.addEventListener("change", onResize);

    return () => {
      root.style.overflow = prevOverflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  // In-page links: close first (unlocking scroll), then scroll on the next frame.
  const follow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href") ?? "";
    if (!href.startsWith("#")) return onClose(false);
    e.preventDefault();
    onClose(false);
    requestAnimationFrame(() => scrollToId(href));
  };

  return (
    <div
      ref={sheet}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!open}
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex flex-col bg-void px-4 pb-6 pt-3 md:hidden"
    >
      <div className="flex h-14 items-center justify-between pl-4 pr-1.5">
        <span className="flex items-center gap-2.5">
          <Mark className="h-6 w-auto" />
          <span className="font-ui text-lg font-semibold">Fermor</span>
        </span>
        <button
          ref={closeButton}
          type="button"
          onClick={() => onClose()}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line"
        >
          <X aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      <ul className="mt-10 flex flex-col px-4">
        {links.map((link, i) => (
          <li key={link.label} className="hairline first:border-t-0">
            <a
              href={link.href}
              title={link.title}
              onClick={follow}
              style={{ animationDelay: `${80 + i * 60}ms` }}
              className="menu-item block py-4 font-display text-[36px] font-semibold leading-none tracking-[-.02em] text-white [font-variation-settings:'opsz'_144]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto px-4">
        <ButtonLink href={waitlistLink.href} onClick={follow} variant="mint" size="lg" arrow className="w-full">
          {waitlistLink.label}
        </ButtonLink>
        <p className="t-50 mt-4 text-center text-[13px]">158 free calculators. The app is in waitlist.</p>
      </div>
    </div>
  );
}
