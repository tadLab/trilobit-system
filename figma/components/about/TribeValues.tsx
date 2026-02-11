import { Heart, Zap, Users, Target, Sparkles } from 'lucide-react';

export function TribeValues() {
  const values = [
    {
      icon: Heart,
      title: 'Respekt',
      description: 'K sobě, druhým a přírodě. Základ našeho kmene.',
    },
    {
      icon: Zap,
      title: 'Odvaha',
      description: 'Zkoušet nové věci, i když jsou náročné. Učíme se z chyb.',
    },
    {
      icon: Users,
      title: 'Spolupráce',
      description: 'Kmen = tým. Spolu dokážeme víc než sami.',
    },
    {
      icon: Target,
      title: 'Zodpovědnost',
      description: 'Dohody platí. Každý má svou roli a my se na sebe můžeme spolehnout.',
    },
    {
      icon: Sparkles,
      title: 'Zážitky',
      description: 'Učení skrze praxi. Skutečné zkušenosti jsou cenější než teorie.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Na čem si zakládáme
          </h2>
          <p className="text-xl text-stone-600">
            Hodnoty, které vedou náš kmen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-amber-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                {value.title}
              </h3>
              <p className="text-stone-700 leading-relaxed text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
