import { Heart, Zap, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Pevná parta a přátelství",
    description:
      "Vaše dítě najde kamarády, s kterými sdílí lásku k přírodě a dobrodružství. Není samo.",
  },
  {
    icon: Zap,
    title: "Odvaha a samostatnost",
    description:
      "Překonávání výzv v přírodě přirozeně buduje sebedůvěru. Dítě roste bez tlaku.",
  },
  {
    icon: Leaf,
    title: "Dovednosti venku + pohyb",
    description:
      "Místo obrazovky aktivní pohyb, praktické dovednosti a zdravý vztah k přírodě.",
  },
];

export function Benefits() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <benefit.icon className="w-8 h-8 text-blue-950" />
              </div>
              <h3 className="text-2xl text-stone-900 mb-4">{benefit.title}</h3>
              <p className="text-stone-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
