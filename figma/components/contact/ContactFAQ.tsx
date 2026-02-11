import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../../App';

export function ContactFAQ() {
  const { navigateTo } = useNavigation();

  const faqs = [
    {
      question: 'Jak se přihlásit?',
      answer: 'Vyplňte formulář výše, napište email nebo zavolejte. Domluvíme si detaily a pošleme přihlášku.',
    },
    {
      question: 'Co když prší?',
      answer: 'Akce probíhají i za deště. Jen si vezměte vhodné oblečení. V případě bouřky vás informujeme předem.',
    },
    {
      question: 'Pro jaký věk je Trilobit?',
      answer: 'Pro děti 6–12 let. Máme dva programy: Malý kmen (6–8) a Velký kmen (9–12).',
    },
    {
      question: 'Kde se scházíme?',
      answer: 'Většinou v centru Choltic nebo v blízkém okolí. Přesné místo srazu posíláme vždy před akcí.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Časté otázky
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-stone-50 rounded-xl p-6 border border-stone-200"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-stone-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigateTo('programs')}
            className="text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-2 font-medium"
          >
            Zobrazit všechny FAQ
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
