import { ClipboardList, Send, CheckCircle2 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Vyberte program nebo akci',
      description: 'Najděte aktivitu, která sedí vašemu dítěti',
    },
    {
      icon: Send,
      title: 'Vyplňte přihlášku',
      description: 'Jednoduchý formulář nebo nám napište email',
    },
    {
      icon: CheckCircle2,
      title: 'Potvrdíme místo',
      description: 'Pošleme info co vzít s sebou a kde se sejdeme',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Jak to funguje
          </h2>
          <p className="text-xl text-stone-600">Přihlášení je jednoduché a rychlé</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6 relative">
                <step.icon className="w-8 h-8 text-amber-700" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {step.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-stone-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            <span>Odpovídáme do 24 hodin</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            <span>Bezpečné a ověřené aktivity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
