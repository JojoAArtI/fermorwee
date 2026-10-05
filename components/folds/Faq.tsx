import { Plus } from "lucide-react";
import { faqCopy, faqs } from "@/content/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="hairline py-24 md:py-36">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">{faqCopy.eyebrow}</p>
          <h2 id="faq-title" className="display-md mt-5">
            {faqCopy.title}
          </h2>
        </div>
        <div className="faq lg:col-span-8">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0} className="border-t border-line last:border-b">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-6 font-ui text-[clamp(17px,1.5vw,20px)] font-medium leading-snug text-white/90 transition-colors hover:text-white">
                {f.q}
                <Plus aria-hidden className="plus size-5 shrink-0 text-white/70 transition-transform duration-300 ease-out-expo" strokeWidth={1.5} />
              </summary>
              <p className="max-w-[62ch] pb-7 pr-10 text-[17px] leading-[1.7] text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
