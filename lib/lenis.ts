import type Lenis from "lenis";

// The one Lenis instance, so the menu can stop scrolling and links can scroll to anchors.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Smooth-scroll to a selector (via Lenis when active), and move focus there for keyboard users. */
export function scrollToId(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instance) instance.scrollTo(el, { offset: -24 });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.replaceState(null, "", hash);
}
