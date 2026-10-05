import { Nav } from "@/components/ui/Nav";

// Placeholder: each fold is replaced by its real component in later phases.
const folds = [
  { id: "hero", title: "money, with the math shown." },
  { id: "manifesto", title: "not a members-only club." },
  { id: "products", title: "every rupee, explained." },
  { id: "calculator", title: "run it before you sign it." },
  { id: "where-you-stand", title: "your whole money life, on one screen." },
  { id: "rail", title: "start where you are." },
  { id: "privacy", title: "your numbers aren't our business." },
  { id: "proof", title: "the math checks out." },
  { id: "analysis", title: "news, with the math done." },
  { id: "waitlist", title: "now everyone gets it." },
  { id: "faq", title: "asked, answered." },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {folds.map((fold, i) => (
          <section
            key={fold.id}
            id={fold.id}
            aria-labelledby={`${fold.id}-title`}
            className={`mx-auto flex min-h-[80svh] max-w-[1200px] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-32 ${i ? "hairline" : ""}`}
          >
            <p className="eyebrow">Fold {String(i + 1).padStart(2, "0")}</p>
            {i === 0 ? (
              <h1 id={`${fold.id}-title`} className="display mt-6">
                {fold.title}
              </h1>
            ) : (
              <h2 id={`${fold.id}-title`} className="display-md mt-6">
                {fold.title}
              </h2>
            )}
          </section>
        ))}
      </main>
      <footer className="hairline px-4 py-20 text-center">
        <p className="t-50 text-sm">Footer</p>
      </footer>
    </>
  );
}
