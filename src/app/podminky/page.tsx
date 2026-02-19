import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { FileText, Mail } from "lucide-react";

export default function PodminkyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-blue-900" />
                <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
              </div>
              <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Podmínky použití</h1>
              <p className="text-xl text-stone-700 leading-relaxed">
                Podmínky účasti v programech a na akcích kmene Trilobit.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-stone prose-lg max-w-none space-y-10">

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Obecná ustanovení</h2>
                <p className="text-stone-700 leading-relaxed">
                  Tyto podmínky upravují práva a povinnosti zákonných zástupců dětí
                  (dále jen „rodiče") a spolku <strong>TRILOBIT — kmen dětí</strong>
                  (dále jen „spolek") při účasti na programech a akcích organizovaných spolkem.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Přihlášení a účast</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Přihlášení dítěte probíhá vyplněním přihlašovacího formuláře na těchto stránkách nebo osobně u vedoucích.</li>
                  <li>Přihlášení je závazné po potvrzení ze strany spolku.</li>
                  <li>Účast na akcích je určena dětem ve věku 6–12 let.</li>
                  <li>Spolek si vyhrazuje právo odmítnout přihlášku v případě naplnění kapacity.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Povinnosti rodičů</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Poskytnout pravdivé a úplné údaje při přihlášení dítěte.</li>
                  <li>Informovat vedoucí o zdravotním stavu dítěte, alergiích a dalších důležitých okolnostech.</li>
                  <li>Zajistit, aby dítě bylo na akci vybaveno přiměřeným oblečením a vybavením dle pokynů vedoucích.</li>
                  <li>Včas informovat vedoucí o neúčasti dítěte na plánované akci.</li>
                  <li>Zajistit odvoz dítěte z místa konání akce v určeném čase.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Povinnosti spolku</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Zajistit bezpečné prostředí pro děti během akcí a programů.</li>
                  <li>Mít k dispozici proškolené vedoucí s platným zdravotnickým kurzem.</li>
                  <li>Informovat rodiče o programu, místě a čase konání akcí.</li>
                  <li>V případě úrazu nebo zdravotních potíží neprodleně kontaktovat zákonné zástupce.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Bezpečnost a pravidla chování</h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  Děti jsou povinny během akcí dodržovat pokyny vedoucích. Mezi základní pravidla patří:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Respektovat ostatní členy kmene a vedoucí.</li>
                  <li>Dodržovat bezpečnostní pravidla při aktivitách v přírodě.</li>
                  <li>Neopouštět skupinu bez souhlasu vedoucího.</li>
                  <li>Chovat se šetrně k přírodě a životnímu prostředí.</li>
                </ul>
                <p className="text-stone-700 leading-relaxed mt-3">
                  V případě opakovaného porušování pravidel si spolek vyhrazuje právo
                  vyloučit dítě z programu po předchozím upozornění rodičů.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Platby a storno podmínky</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Výše příspěvku a platební podmínky jsou stanoveny pro každý program zvlášť.</li>
                  <li>Platba je splatná před zahájením programu nebo akce, pokud není dohodnuto jinak.</li>
                  <li>V případě zrušení účasti více než 7 dní před akcí je možné požádat o vrácení příspěvku.</li>
                  <li>Při zrušení méně než 7 dní před akcí se příspěvek nevrací, pokud není dohodnuto jinak.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">7. Fotografie a videa</h2>
                <p className="text-stone-700 leading-relaxed">
                  Během akcí mohou být pořizovány fotografie a videa dokumentující činnost spolku.
                  Tyto materiály mohou být využity na webových stránkách a sociálních sítích spolku.
                  Souhlas s pořizováním a použitím fotografií je součástí přihlášky. Souhlas je
                  možné kdykoli odvolat písemně na kontaktní e-mail spolku.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">8. Odpovědnost</h2>
                <p className="text-stone-700 leading-relaxed">
                  Spolek odpovídá za bezpečnost dětí během trvání akce v rozsahu stanoveném
                  platnými právními předpisy. Spolek neodpovídá za ztrátu nebo poškození
                  osobních věcí dětí, pokud k nim nedošlo zaviněním vedoucích.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">9. Závěrečná ustanovení</h2>
                <p className="text-stone-700 leading-relaxed">
                  Tyto podmínky se řídí právním řádem České republiky. Spolek si vyhrazuje
                  právo podmínky aktualizovat. O změnách budou rodiče informováni e-mailem
                  nebo prostřednictvím webových stránek.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">10. Kontakt</h2>
                <p className="text-stone-700 leading-relaxed">
                  V případě dotazů k těmto podmínkám nás kontaktujte:
                </p>
                <div className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-900" />
                    <a href="mailto:kmentrilobit@gmail.com" className="text-blue-900 font-medium hover:underline">
                      kmentrilobit@gmail.com
                    </a>
                  </div>
                  <p className="text-sm text-stone-600">
                    Rádi vám zodpovíme jakékoli otázky.
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-500 pt-6 border-t border-stone-200">
                Tyto podmínky jsou platné od 1. 1. 2025 a mohou být průběžně aktualizovány.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
