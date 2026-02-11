import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-8">O nás</h2>
        <p className="text-xl text-stone-700 leading-relaxed mb-8">
          TRILOBIT je dětský klub inspirovaný životem v přírodě a týmovým
          duchem. Každý týden vyrážíme s dětmi na výpravy do přírody v
          Cholticích a okolí, kde zažívají dobrodružství, rozvíjí praktické
          dovednosti a budují si přátelství na celý život. Naši zkušení vedoucí
          vytvářejí bezpečné a podporující prostředí, kde se každé dítě může
          rozvíjet svým vlastním tempem.
        </p>
        <Link
          href="/o-nas"
          className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors inline-flex items-center gap-2"
        >
          Zjistit více
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
