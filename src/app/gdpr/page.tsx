import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { Shield, Mail } from "lucide-react";

export default function GdprPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-blue-900" />
                <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
              </div>
              <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Ochrana osobních údajů</h1>
              <p className="text-xl text-stone-700 leading-relaxed">
                Informace o zpracování osobních údajů v souladu s nařízením GDPR.
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
                <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Správce osobních údajů</h2>
                <p className="text-stone-700 leading-relaxed">
                  Správcem osobních údajů je spolek <strong>TRILOBIT — kmen dětí</strong>, se sídlem
                  v Cholticích. Kontaktní e-mail:{" "}
                  <a href="mailto:kmentrilobit@gmail.com" className="text-blue-900 hover:underline">
                    kmentrilobit@gmail.com
                  </a>, telefon:{" "}
                  <a href="tel:+420602801010" className="text-blue-900 hover:underline">602 801 010</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Jaké údaje zpracováváme</h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  V rámci činnosti spolku zpracováváme následující osobní údaje:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li><strong>Zákonní zástupci (rodiče):</strong> jméno, příjmení, e-mail, telefonní číslo</li>
                  <li><strong>Děti:</strong> jméno, příjmení, věk, zdravotní omezení (pokud je zákonný zástupce uvede)</li>
                  <li><strong>Fotografie a videa:</strong> pořízené během akcí a aktivit spolku</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Účel zpracování</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Organizace akcí a programů pro děti</li>
                  <li>Komunikace se zákonnými zástupci</li>
                  <li>Zajištění bezpečnosti dětí během akcí</li>
                  <li>Prezentace činnosti spolku (fotografie, sociální sítě)</li>
                  <li>Plnění zákonných povinností</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Právní základ zpracování</h2>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li><strong>Souhlas</strong> — zpracování fotografií a videí pro prezentaci spolku</li>
                  <li><strong>Plnění smlouvy</strong> — přihlášky na akce a programy</li>
                  <li><strong>Oprávněný zájem</strong> — bezpečnost dětí, interní evidence členů</li>
                  <li><strong>Zákonná povinnost</strong> — vedení účetnictví a dalších záznamů</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Doba uchování údajů</h2>
                <p className="text-stone-700 leading-relaxed">
                  Osobní údaje uchováváme po dobu trvání členství dítěte v kmeni a následně po dobu
                  nezbytnou pro splnění zákonných povinností (obvykle 3 roky po ukončení členství).
                  Fotografie a videa jsou uchovávány do odvolání souhlasu.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Příjemci údajů</h2>
                <p className="text-stone-700 leading-relaxed">
                  Osobní údaje nepředáváme třetím stranám s výjimkou případů, kdy je to nezbytné
                  pro zajištění bezpečnosti (např. pojišťovna, zdravotnická záchranná služba).
                  Fotografie mohou být zveřejněny na webových stránkách a sociálních sítích spolku.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">7. Vaše práva</h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  Jako subjekt údajů máte právo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Na přístup k osobním údajům</li>
                  <li>Na opravu nepřesných údajů</li>
                  <li>Na výmaz údajů („právo být zapomenut")</li>
                  <li>Na omezení zpracování</li>
                  <li>Na přenositelnost údajů</li>
                  <li>Vznést námitku proti zpracování</li>
                  <li>Odvolat souhlas se zpracováním</li>
                  <li>Podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">8. Zabezpečení údajů</h2>
                <p className="text-stone-700 leading-relaxed">
                  Přijímáme vhodná technická a organizační opatření k ochraně osobních údajů
                  před neoprávněným přístupem, ztrátou, zničením nebo zneužitím.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">9. Kontakt</h2>
                <p className="text-stone-700 leading-relaxed">
                  V případě jakýchkoli dotazů ohledně zpracování osobních údajů nás kontaktujte:
                </p>
                <div className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-900" />
                    <a href="mailto:kmentrilobit@gmail.com" className="text-blue-900 font-medium hover:underline">
                      kmentrilobit@gmail.com
                    </a>
                  </div>
                  <p className="text-sm text-stone-600">
                    Na vaše dotazy odpovíme do 30 dnů od jejich obdržení.
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-500 pt-6 border-t border-stone-200">
                Tyto zásady ochrany osobních údajů jsou platné od 1. 1. 2025 a mohou být průběžně aktualizovány.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
