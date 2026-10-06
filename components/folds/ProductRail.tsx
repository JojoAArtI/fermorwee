import Image from "next/image";
import { GhostButton } from "@/components/ui/GhostButton";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { products, railCopy, type Product } from "@/content/products";

function ProductCard({ p }: { p: Product }) {
  return (
    <li data-reveal className="group/card relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-panel">
      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]" />
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
  return (
    <section aria-labelledby="rail-title" className="hairline py-20 md:py-28">
      <div className="wrap">
        <p className="eyebrow">{railCopy.eyebrow}</p>
        <h2 id="rail-title" className="display-md mt-5">
          {railCopy.title}
        </h2>

        <Reveal className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          <ul className="contents" aria-label="Fermor products">
            {products.map((p) => (
              <ProductCard key={p.title} p={p} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
