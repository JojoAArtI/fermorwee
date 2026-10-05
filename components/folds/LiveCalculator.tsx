import { Calculator } from "@/components/calculator/Calculator";
import { calculatorCopy } from "@/content/home";

export function LiveCalculator() {
  return (
    <section id="calculator" aria-labelledby="calculator-title" className="hairline py-24 md:py-36">
      <div className="wrap">
        <div className="max-w-[760px]">
          <p className="eyebrow">{calculatorCopy.eyebrow}</p>
          <h2 id="calculator-title" className="display-md mt-5">
            {calculatorCopy.title}
          </h2>
          <p className="body-lg mt-5 max-w-[52ch]">{calculatorCopy.sub}</p>
        </div>
        <div className="mt-12 md:mt-16">
          <Calculator />
        </div>
      </div>
    </section>
  );
}
