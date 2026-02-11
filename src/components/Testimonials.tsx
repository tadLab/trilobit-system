import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Můj syn se už celý týden těší na další výpravu. Díky TRILOBITu získal spoustu nových kamarádů a jeho sebedůvěra výrazně vzrostla. Jsme moc spokojení!",
    author: "Jana Nováková",
    role: "Maminka Matěje (8 let)",
  },
  {
    quote:
      "Jsem rád, že jsem našel klub, kde dcera tráví čas venku místo u obrazovky. Vedoucí jsou milí, zodpovědní a děti si to tam opravdu užívají. Skvělá zkušenost pro celou rodinu.",
    author: "Petr Dvořák",
    role: "Tatínek Elišky (10 let)",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-blue-700 text-blue-700"
                />
              ))}
            </div>
            <span className="text-stone-700 font-medium">
              4.9/5 rodičů doporučuje
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm"
            >
              <Quote className="w-10 h-10 text-blue-900 mb-6" />
              <p className="text-lg text-stone-700 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center">
                  <span className="text-stone-600 font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-stone-900 font-medium">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-stone-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
