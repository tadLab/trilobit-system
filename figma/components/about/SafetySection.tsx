import { Shield, Phone, Camera } from 'lucide-react';

export function SafetySection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Bezpečí a soukromí
          </h2>
          <p className="text-xl text-stone-600">
            Vaše dítě je v dobrých rukou
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Dohled a bezpečnost
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Všichni vedoucí mají platné osvědčení vedoucího dětského tábora a kurz první pomoci. 
                  Poměr vedoucích k dětem je maximálně 1:10. V terénu máme vždy kompletní lékárničku 
                  a komunikační prostředky. Před každou akcí rodičům sdělujeme přesný plán a kontaktní údaje.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Nouzový kontakt
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  V přihlášce uvádíte kontakt pro případ potřeby. Během akce jsme dostupní 
                  na telefonu. V případě jakéhokoliv problému vás okamžitě kontaktujeme. 
                  WhatsApp skupina slouží pro běžnou komunikaci a sdílení informací.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-amber-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Fotky a soukromí (GDPR)
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Fotíme pro interní účely a posíláme rodičům. Pro zveřejnění fotek na webu 
                  nebo sociálních sítích vyžadujeme váš písemný souhlas v přihlášce. Fotografie 
                  nejsou nikdy zveřejňovány se jmény dětí. Vaše osobní údaje zpracováváme 
                  v souladu s GDPR pouze pro účely činnosti kmene.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
