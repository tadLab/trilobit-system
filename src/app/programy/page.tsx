"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { QuickContact } from "@/components/QuickContact";
import { Calendar, X, ClipboardList, Send, CheckCircle2, ChevronDown, ChevronUp, Users, MapPin, Clock, CheckCircle, Info } from "lucide-react";
import Link from "next/link";

/* ── Hero ── */
function ProgramsHero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17L11 22" strokeLinecap="round" />
            </svg>
            <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
          </div>
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Programy &amp; aktivity</h1>
          <p className="text-xl text-stone-700 mb-10">
            Pravidelné outdoorové aktivity pro děti v Cholticích a okolí. Vaše dítě získá kamarády, dovednosti a sebedůvěru skrze zážitky v přírodě.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">
              Přihlásit dítě
            </Link>
            <Link href="/kalendar" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Kalendář akcí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Filters ── */
function ProgramFilters({ selectedAge, selectedType, selectedSeason, onAgeChange, onTypeChange, onSeasonChange }: {
  selectedAge: string | null; selectedType: string | null; selectedSeason: string | null;
  onAgeChange: (v: string | null) => void; onTypeChange: (v: string | null) => void; onSeasonChange: (v: string | null) => void;
}) {
  const ages = ["6–8 let", "9–10 let", "11–12 let"];
  const types = ["Pravidelné", "Výpravy", "Speciální akce"];
  const seasons = ["Jaro", "Léto", "Podzim", "Zima"];
  const hasActive = selectedAge || selectedType || selectedSeason;

  return (
    <section className="py-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-stone-700">Filtrovat programy:</h3>
            {hasActive && (
              <button onClick={() => { onAgeChange(null); onTypeChange(null); onSeasonChange(null); }} className="text-sm text-blue-900 hover:text-blue-950 transition-colors">
                Zrušit filtry
              </button>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <FilterGroup label="Věk:" items={ages} selected={selectedAge} onToggle={onAgeChange} />
            <FilterGroup label="Typ:" items={types} selected={selectedType} onToggle={onTypeChange} />
            <FilterGroup label="Sezóna:" items={seasons} selected={selectedSeason} onToggle={onSeasonChange} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, items, selected, onToggle }: { label: string; items: string[]; selected: string | null; onToggle: (v: string | null) => void }) {
  return (
    <div className="flex-1">
      <p className="text-xs text-stone-600 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button key={item} onClick={() => onToggle(selected === item ? null : item)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${selected === item ? "bg-blue-900 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}>
            {item}
            {selected === item && <X className="inline-block w-3 h-3 ml-1" />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Program Cards ── */
const programs = [
  {
    name: "Malý kmen", age: "6–8 let", type: "Pravidelné", season: "Celý rok",
    description: "Vaše dítě získá první zkušenosti v přírodě, kamarády a radost z pohybu venku.",
    location: "Choltice", frequency: "Každý týden", duration: "2 hodiny",
    whatKidsDo: ["Hry a aktivity v přírodě", "Základní outdoorové dovednosti", "Týmová spolupráce a kamarádství"],
    forParents: ["Sraz vždy v centru Choltic", "Dítě potřebuje outdoorové oblečení + láhev na pití"],
  },
  {
    name: "Velký kmen", age: "9–12 let", type: "Pravidelné", season: "Celý rok",
    description: "Pokročilejší aktivity, samostatnost a výzvy. Dítě posílí sebedůvěru a získá praktické dovednosti.",
    location: "Choltice a okolí", frequency: "Každý týden", duration: "3 hodiny",
    whatKidsDo: ["Orientace v terénu a stopování", "Stavba přístřešků a táborová řemesla", "Náročnější výpravy a expedice"],
    forParents: ["Děti jsou pod dohledem zkušených vedoucích", "Fotky z akcí posíláme rodičům"],
  },
  {
    name: "Víkendové výpravy", age: "6–12 let", type: "Výpravy", season: "Jaro/Léto/Podzim",
    description: "Celodenní dobrodružství v přírodě. Dítě pozná nová místa a zažije skutečnou expedici.",
    location: "Region Pardubicka", frequency: "1× měsíčně", duration: "Celý den",
    whatKidsDo: ["Túry do zajímavých přírodních lokalit", "Poznávání přírody a historie", "Táborové ohně a společné aktivity"],
    forParents: ["Svačina a oběd zajištěn", "Doprava zajištěna z Choltic"],
  },
  {
    name: "Letní tábor", age: "6–12 let", type: "Speciální akce", season: "Léto",
    description: "Týdenní pobyt v přírodě plný her, výzev a nezapomenutelných zážitků.",
    location: "Tábořiště v okolí Choltic", frequency: "Červenec/Srpen", duration: "5–7 dní",
    whatKidsDo: ["Stanování a táborový život", "Velké hry a dobrodružné úkoly", "Nové kamarádství a týmový duch"],
    forParents: ["Kapacita omezena na 30 dětí", "Registrace od března"],
  },
];

function ProgramCards({ selectedAge, selectedType, selectedSeason }: { selectedAge: string | null; selectedType: string | null; selectedSeason: string | null }) {
  const filtered = programs.filter((p) => {
    if (selectedAge && p.age !== selectedAge) return false;
    if (selectedType && p.type !== selectedType) return false;
    if (selectedSeason && !p.season.includes(selectedSeason)) return false;
    return true;
  });

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">Žádné programy neodpovídají vybraným filtrům. Zkuste změnit filtry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-blue-900 transition-all hover:shadow-lg">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-stone-900">{program.name}</h3>
                    <span className="text-sm font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-full">{program.age}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{program.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-stone-200">
                  <div className="flex items-center gap-2 text-sm text-stone-600"><MapPin className="w-4 h-4 text-blue-900" /><span>{program.location}</span></div>
                  <div className="flex items-center gap-2 text-sm text-stone-600"><Calendar className="w-4 h-4 text-blue-900" /><span>{program.frequency}</span></div>
                  <div className="flex items-center gap-2 text-sm text-stone-600"><Clock className="w-4 h-4 text-blue-900" /><span>{program.duration}</span></div>
                  <div className="flex items-center gap-2 text-sm text-stone-600"><Users className="w-4 h-4 text-blue-900" /><span>Pro děti</span></div>
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-900 mb-3">Co děti dělají:</h4>
                  <ul className="space-y-2">
                    {program.whatKidsDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <CheckCircle className="w-4 h-4 text-blue-900 flex-shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">Pro rodiče:</h4>
                  <ul className="space-y-1">
                    {program.forParents.map((item, i) => (<li key={i} className="text-sm text-stone-700">&bull; {item}</li>))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/prihlasit" className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors font-medium text-center">Přihlásit dítě</Link>
                  <button className="flex-1 bg-white text-stone-700 px-6 py-3 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors font-medium flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" />Více info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const steps = [
    { icon: ClipboardList, title: "Vyberte program nebo akci", description: "Najděte aktivitu, která sedí vašemu dítěti" },
    { icon: Send, title: "Vyplňte přihlášku", description: "Jednoduchý formulář nebo nám napište email" },
    { icon: CheckCircle2, title: "Potvrdíme místo", description: "Pošleme info co vzít s sebou a kde se sejdeme" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Jak to funguje</h2>
          <p className="text-xl text-stone-600">Přihlášení je jednoduché a rychlé</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 relative">
                <step.icon className="w-8 h-8 text-blue-900" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</div>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">{step.title}</h3>
              <p className="text-stone-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-stone-600">
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-900" /><span>Odpovídáme do 24 hodin</span></div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-900" /><span>Bezpečné a ověřené aktivity</span></div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function ProgramFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { question: "Co když prší?", answer: "Špatné počasí neexistuje, jen nevhodné oblečení! Aktivity probíhají i za deště. V případě extrémních podmínek (bouřka, silný vítr) vás informujeme s předstihem a akci přesuneme." },
    { question: "Co když se dítě stydí nebo nechce?", answer: "Je to normální! Nabízíme zkušební účast zdarma, aby se dítě mohlo podívat, jak to probíhá. Naši vedoucí mají zkušenosti s introvertními dětmi a postupně je zapojují do aktivit vlastním tempem." },
    { question: "Co si má dítě vzít s sebou?", answer: "Vždy outdoorové oblečení podle počasí (nepromokavá bunda, pevná obuv), láhev s pitím a svačinu. Pro konkrétní akce pošleme detailní seznam emailem po přihlášení." },
    { question: "Jak je řešena bezpečnost a dohled?", answer: "Všichni vedoucí mají platné osvědčení vedoucího dětského tábora a kurz první pomoci. Poměr vedoucích k dětem je max. 1:10. V terénu máme vždy lékárničku a komunikační prostředky." },
    { question: "Můžu akci zrušit a vrátí se peníze?", answer: "Při zrušení do 7 dní před akcí vracíme 100 % platby. Při zrušení 2–6 dní předem 50 %. Při onemocnění dítěte nabízíme náhradní termín. U pravidelných aktivit je měsíční členství bez závazků." },
    { question: "Budete fotit děti? (GDPR)", answer: "Fotíme pro interní účely a posíláme rodičům. Pro zveřejnění na webu/sociálních sítích vyžadujeme váš souhlas v přihlášce. Fotky nejsou nikdy zveřejňovány se jmény dětí." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Časté otázky</h2>
          <p className="text-xl text-stone-600">Odpovědi na to, co rodiče nejčastěji zajímá</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors">
                <span className="text-lg font-medium text-stone-900 pr-8">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="w-5 h-5 text-blue-900 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5"><p className="text-stone-700 leading-relaxed">{faq.answer}</p></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function ProgramCTA() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">Vyberte program a přidejte se</h2>
        <p className="text-xl text-stone-700 mb-10">Nabízíme zkušební účast zdarma. Žádné závazky, stačí přijít a vyzkoušet.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">Přihlásit dítě</Link>
          <Link href="/kalendar" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />Kalendář akcí
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function ProgramyPage() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProgramsHero />
        <ProgramFilters
          selectedAge={selectedAge} selectedType={selectedType} selectedSeason={selectedSeason}
          onAgeChange={setSelectedAge} onTypeChange={setSelectedType} onSeasonChange={setSelectedSeason}
        />
        <ProgramCards selectedAge={selectedAge} selectedType={selectedType} selectedSeason={selectedSeason} />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <ProgramFAQ />
        <ProgramCTA />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
