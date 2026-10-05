import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { WordReveal } from "@/components/motion/WordReveal";
import { HeroVideo } from "@/components/media/HeroVideo";
import { PhoneFrame } from "@/components/media/PhoneFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GhostButton } from "@/components/ui/GhostButton";
import { Nav } from "@/components/ui/Nav";
import { Tag } from "@/components/ui/Tag";
import { Controls } from "./Controls";

export const metadata: Metadata = { title: "Primitives (dev)", robots: { index: false } };

// Dev-only gallery of the Phase 3 primitives. Not built into production.
export default function Primitives() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-[1200px] space-y-24 px-4 pb-40 pt-32 sm:px-6 lg:px-8">
        <section id="hero" className="on-light rounded-[28px] bg-paper p-6 text-ink md:p-10">
          <Eyebrow>Personal finance, for India</Eyebrow>
          <h1 className="display mt-4">
            money, with the <mark className="marker">math</mark> shown.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="#" variant="ink" size="lg" arrow>explore calculators</ButtonLink>
            <ButtonLink href="#" variant="ghost-ink" size="lg">join the app waitlist</ButtonLink>
            <Tag variant="preview-light">preview</Tag>
          </div>
          <HeroVideo className="mt-8" />
        </section>

        <section className="space-y-6">
          <Eyebrow>Buttons and tags</Eyebrow>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="#" variant="mint">join waitlist</ButtonLink>
            <ButtonLink href="#" variant="ghost" arrow>explore</ButtonLink>
            <GhostButton href="#">Know more</GhostButton>
            <Tag variant="live">Live</Tag>
            <Tag variant="soon">Soon</Tag>
            <Tag>preview · app in waitlist</Tag>
          </div>
        </section>

        <Controls />

        <section className="space-y-4">
          <Eyebrow>Count up</Eyebrow>
          <p className="num text-[clamp(56px,7vw,104px)] leading-none">
            <CountUp value={2472} />
          </p>
        </section>

        <section className="space-y-6">
          <Eyebrow>Not a members-only club.</Eyebrow>
          <WordReveal
            className="manifesto max-w-[820px]"
            text="most money decisions in india are made on a guess. a bank's number. a friend's tip. a spreadsheet nobody checks. we think you deserve the working, not just the answer. so fermor shows the math. every time, to everyone."
          />
        </section>

        <section className="flex flex-wrap items-end gap-8">
          <Parallax speed={0.3}>
            <PhoneFrame src="/img/screens/screen-goals.webp" alt="Fermor app home with goals" />
          </Parallax>
          <PhoneFrame src="/img/screens/screen-stocks-v2.webp" alt="Fermor app stocks tab" />
        </section>
        <div className="h-[60svh]" />
      </main>
    </>
  );
}
