import { CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const expectations = [
    {
      title: 'Malé skupiny a dohled',
      description: 'Max. 10 dětí na jednoho vedoucího. Vždy známe každé dítě a víme, co se děje.',
    },
    {
      title: 'Bezpečnost na prvním místě',
      description: 'Všichni vedoucí mají kurz první pomoci. V terénu máme vždy lékárničku a komunikační prostředky.',
    },
    {
      title: 'Co když prší?',
      description: 'Špatné počasí neexistuje, jen nevhodné oblečení! Akce probíhají i za deště. V případě extrémního počasí (bouřka) vás informujeme předem.',
    },
    {
      title: 'Co si dítě vezme s sebou',
      description: 'Vždy outdoorové oblečení podle počasí, pevnou obuv, láhev na pití a svačinu. Detailní seznam pošleme před každou akcí.',
    },
    {
      title: 'Komunikace s rodiči',
      description: 'Před akcí posíláme email s detaily (místo srazu, co vzít s sebou). Po akci sdílíme fotky. Pro rychlý kontakt používáme WhatsApp skupinu.',
    },
    {
      title: 'Jak se přihlásit',
      description: 'Vyplňte přihlášku nebo nám napište email. Nabízíme zkušební účast zdarma - přijďte se podívat, jak to u nás funguje.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Jak to u nás funguje
          </h2>
          <p className="text-xl text-stone-600">
            Co můžete od nás očekávat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {expectations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-600 transition-colors"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-colors text-lg">
            Zkusit první akci
          </button>
        </div>
      </div>
    </section>
  );
}
