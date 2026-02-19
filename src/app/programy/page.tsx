"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { QuickContact } from "@/components/QuickContact";
import { Calendar, X, ClipboardList, Send, CheckCircle2, ChevronDown, ChevronUp, Users, MapPin, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCtaText } from "@/hooks/useCtaText";
import { usePrograms } from "@/hooks/usePrograms";
import type { Program } from "@/types/data";

/* ── Hero ── */
function ProgramsHero() {
  const ctaText = useCtaText();
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
              {ctaText}
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

function ProgramCards({ programs, selectedAge, selectedType, selectedSeason, initialProgramId }: { programs: Program[]; selectedAge: string | null; selectedType: string | null; selectedSeason: string | null; initialProgramId?: string | null }) {
  const ctaText = useCtaText();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const hasAutoExpanded = useRef(false);

  // Deep-link: auto-expand a program by ID from URL query param
  const filtered = programs.filter((p) => {
    if (selectedAge && p.age !== selectedAge) return false;
    if (selectedType && p.type !== selectedType) return false;
    if (selectedSeason && !p.season.includes(selectedSeason)) return false;
    return true;
  });

  useEffect(() => {
    if (initialProgramId && !hasAutoExpanded.current && filtered.length > 0) {
      const idx = filtered.findIndex((p) => p.id === initialProgramId);
      if (idx !== -1) {
        setExpandedIndex(idx);
        hasAutoExpanded.current = true;
        requestAnimationFrame(() => {
          const card = cardRefs.current.get(idx);
          if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    }
  }, [initialProgramId, filtered]);

  const handleToggle = useCallback((index: number) => {
    if (expandedIndex === index) {
      // Closing: scroll to card top so the page doesn't jump
      const card = cardRefs.current.get(index);
      if (card) {
        const rect = card.getBoundingClientRect();
        if (rect.top < 0) {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      // After expanding, scroll the newly opened card into view
      requestAnimationFrame(() => {
        const card = cardRefs.current.get(index);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
  }, [expandedIndex]);

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">Žádné programy neodpovídají vybraným filtrům. Zkuste změnit filtry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((program, index) => {
              const isExpanded = expandedIndex === index;

              return (
              <div
                key={index}
                ref={(el) => { if (el) cardRefs.current.set(index, el); }}
                className={`bg-white rounded-2xl p-8 border transition-all ${isExpanded ? "lg:col-span-2 border-blue-900 shadow-lg" : "border-stone-200 hover:border-blue-900 hover:shadow-lg"}`}
              >
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
                  <div className="flex items-center gap-2 text-sm text-stone-600"><Users className="w-4 h-4 text-blue-900" /><span>Max. {program.detail.maxKids} dětí</span></div>
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

                {/* Expandable detail section */}
                {isExpanded && (
                  <div className="mb-6 space-y-5 border-t border-stone-200 pt-6">
                    {/* Schedule & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Kdy</p>
                        <p className="text-sm font-medium text-stone-900">{program.detail.schedule}</p>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Cena</p>
                        <p className="text-sm font-medium text-stone-900">{program.detail.price}</p>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Vedení</p>
                          <p className="text-sm text-stone-900">{program.detail.leader}</p>
                        </div>
                      </div>
                    </div>

                    {/* Typical day */}
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-2">Jak vypadá typický den:</h4>
                      <p className="text-sm text-stone-700 leading-relaxed p-4 bg-amber-50 rounded-xl border border-amber-200">{program.detail.typicalDay}</p>
                    </div>

                    {/* Goals */}
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-3">Cíle programu:</h4>
                      <ul className="space-y-2">
                        {program.detail.goals.map((goal, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" /><span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to bring */}
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-3">Co s sebou:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {program.detail.whatToBring.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-stone-700 p-2 bg-stone-50 rounded-lg border border-stone-100">
                            <span className="text-blue-900">•</span>{item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className={`flex flex-col sm:flex-row gap-3 ${isExpanded ? "max-w-md" : ""}`}>
                  <Link href="/prihlasit" className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors font-medium text-center">{ctaText}</Link>
                  <button
                    onClick={() => handleToggle(index)}
                    className={`flex-1 px-6 py-3 rounded-full border-2 transition-colors font-medium flex items-center justify-center gap-2 ${
                      isExpanded
                        ? "bg-blue-50 text-blue-900 border-blue-900"
                        : "bg-white text-stone-700 border-stone-300 hover:border-blue-900 hover:text-blue-900"
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    {isExpanded ? "Skrýt detail" : "Více info"}
                  </button>
                </div>
              </div>
              );
            })}
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
    <section id="faq" className="py-16 lg:py-24 bg-stone-50 scroll-mt-24">
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
  const ctaText = useCtaText();
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">Vyberte program a přidejte se</h2>
        <p className="text-xl text-stone-700 mb-10">Nabízíme zkušební účast zdarma. Žádné závazky, stačí přijít a vyzkoušet.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">{ctaText}</Link>
          <Link href="/kalendar" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />Kalendář akcí
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Inner page (uses useSearchParams which requires Suspense) ── */
function ProgramyPageInner() {
  const { programs, isLoaded } = usePrograms();
  const searchParams = useSearchParams();
  const initialProgramId = searchParams.get("program");
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center py-32">
          <div className="text-stone-400 text-lg">Načítání programů…</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProgramsHero />
        <ProgramFilters
          selectedAge={selectedAge} selectedType={selectedType} selectedSeason={selectedSeason}
          onAgeChange={setSelectedAge} onTypeChange={setSelectedType} onSeasonChange={setSelectedSeason}
        />
        <ProgramCards programs={programs} selectedAge={selectedAge} selectedType={selectedType} selectedSeason={selectedSeason} initialProgramId={initialProgramId} />
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

/* ── Page ── */
export default function ProgramyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center py-32">
          <div className="text-stone-400 text-lg">Načítání programů…</div>
        </main>
        <Footer />
      </div>
    }>
      <ProgramyPageInner />
    </Suspense>
  );
}
