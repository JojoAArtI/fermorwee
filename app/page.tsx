import { Analysis } from "@/components/folds/Analysis";
import { AppFan } from "@/components/folds/AppFan";
import { Closing } from "@/components/folds/Closing";
import { Faq } from "@/components/folds/Faq";
import { Footer } from "@/components/folds/Footer";
import { Hero } from "@/components/folds/Hero";
import { TheWorking } from "@/components/folds/TheWorking";
import { Manifesto } from "@/components/folds/Manifesto";
import { Privacy } from "@/components/folds/Privacy";
import { ProductRail } from "@/components/folds/ProductRail";
import { Proof } from "@/components/folds/Proof";
import { WhereYouStand } from "@/components/folds/WhereYouStand";
import { Nav } from "@/components/ui/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <AppFan />
        <TheWorking />
        <WhereYouStand />
        <ProductRail />
        <Privacy />
        <Proof />
        <Analysis />
        <Closing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
