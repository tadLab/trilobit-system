import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function ProgramFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Co když prší?',
      answer:
        'Špatné počasí neexistuje, jen nevhodné oblečení! Aktivity probíhají i za deště. V případě extrémních podmínek (bouřka, silný vítr) vás informujeme s předstihem a akci přesuneme.',
    },
    {
      question: 'Co když se dítě stydí nebo nechce?',
      answer:
        'Je to normální! Nabízíme zkušební účast zdarma, aby se dítě mohlo podívat, jak to probíhá. Naši vedoucí mají zkušenosti s introvertními dětmi a postupně je zapojují do aktivit vlastním tempem.',
    },
    {
      question: 'Co si má dítě vzít s sebou?',
      answer:
        'Vždy outdoorové oblečení podle počasí (nepromokavá bunda, pevná obuv), láhev s pitím a svačinu. Pro konkrétní akce pošleme detailní seznam emailem po přihlášení.',
    },
    {
      question: 'Jak je řešena bezpečnost a dohled?',
      answer:
        'Všichni vedoucí mají platné osvědčení vedoucího dětského tábora a kurz první pomoci. Poměr vedoucích k dětem je max. 1:10. V terénu máme vždy lékárničku a komunikační prostředky.',
    },
    {
      question: 'Můžu akci zrušit a vrátí se peníze?',
      answer:
        'Při zrušení do 7 dní před akcí vracíme 100 % platby. Při zrušení 2–6 dní předem 50 %. Při onemocnění dítěte nabízíme náhradní termín. U pravidelných aktivit je měsíční členství bez závazků.',
    },
    {
      question: 'Budete fotit děti? (GDPR)',
      answer:
        'Fotíme pro interní účely a posíláme rodičům. Pro zveřejnění na webu/sociálních sítích vyžadujeme váš souhlas v přihlášce. Fotky nejsou nikdy zveřejňovány se jmény dětí.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Časté otázky
          </h2>
          <p className="text-xl text-stone-600">
            Odpovědi na to, co rodiče nejčastěji zajímá
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
              >
                <span className="text-lg font-medium text-stone-900 pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
