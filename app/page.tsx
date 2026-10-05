import { AppFan } from "@/components/folds/AppFan";
import { Hero } from "@/components/folds/Hero";
import { LiveCalculator } from "@/components/folds/LiveCalculator";
import { Manifesto } from "@/components/folds/Manifesto";
import { Nav } from "@/components/ui/Nav";

// Phase 5 replaces these with real folds.
const placeholders = [
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
        <Hero />
        <Manifesto />
        <AppFan />
        <LiveCalculator />
        {placeholders.map((fold) => (
          <section key={fold.id} id={fold.id} aria-labelledby={`${fold.id}-title`} className="hairline py-24 md:py-36">
            <div className="wrap">
              <h2 id={`${fold.id}-title`} className="display-md t-50">
                {fold.title}
              </h2>
            </div>
          </section>
        ))}
      </main>
      <footer className="hairline px-4 py-20 text-center">
        <p className="t-50 text-sm">Footer</p>
      </footer>
    </>
  );
}
