"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { QuickContact } from "@/components/QuickContact";
import { Heart, Zap, Users, Target, Sparkles, Award, Shield, Phone, Camera, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useCtaText } from "@/hooks/useCtaText";

/* ── Hero ── */
function AboutHero() {
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
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">O nás</h1>
          <p className="text-xl text-stone-700 mb-10 leading-relaxed">
            Jsme dětský outdoor kmen v Cholticích a okolí. Učíme děti odvaze, spolupráci a lásce k přírodě
            skrze skutečné zážitky venku.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">{ctaText}</Link>
            <Link href="/kontakt" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Our Story ── */
function OurStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-8 text-center">Proč Trilobit vznikl</h2>
        <div className="prose prose-lg text-stone-700 max-w-none space-y-6">
          <p className="leading-relaxed">
            TRILOBIT vznikl z přesvědčení, že děti potřebují víc času venku, víc skutečných zážitků a víc
            příležitostí být součástí party, která drží pohromadě. V dnešní době obrazovek a přeplněných
            kroužků jsme chtěli vytvořit místo, kde se děti učí skrze přírodu, pohyb a spolupráci.
          </p>
          <p className="leading-relaxed">
            Náš kmen funguje jako komunita — děti se učí respektu, odvaze a zodpovědnosti tím, že je
            zažívají na vlastní kůži. Každý týden vyrážíme ven, ať prší nebo svítí slunce. Stavíme
            přístřešky, orientujeme se v terénu, sledujeme stopy zvířat a učíme se spolupracovat v týmu.
          </p>
          <p className="leading-relaxed">
            Naši vedoucí jsou zkušení outdooráci s láskou k dětem. Věříme, že nejcennější lekce se neučí
            v lavicích, ale v přírodě — tam, kde musíte překonat strach, pomoct kamarádovi a najít
            cestu domů.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const items = [
    "Malé skupiny (max. 10 dětí na vedoucího)",
    "Zkušení vedoucí s osvědčením a kurzem první pomoci",
    "Aktivity probíhají za každého počasí",
    "Outdoorové oblečení + svačina stačí",
    "Komunikace s rodiči přes WhatsApp skupinu",
    "Zkušební účast zdarma a bez závazků",
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Co můžete očekávat</h2>
          <p className="text-xl text-stone-600">Praktické info pro rodiče</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200 hover:border-blue-900 transition-colors flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
              <span className="text-stone-700">{item}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg inline-block">Zkusit první akci</Link>
        </div>
      </div>
    </section>
  );
}

/* ── Values ── */
function TribeValues() {
  const values = [
    { icon: Heart, title: "Respekt", description: "K sobě, druhým a přírodě. Základ našeho kmene." },
    { icon: Zap, title: "Odvaha", description: "Zkoušet nové věci, i když jsou náročné. Učíme se z chyb." },
    { icon: Users, title: "Spolupráce", description: "Kmen = tým. Spolu dokážeme víc než sami." },
    { icon: Target, title: "Zodpovědnost", description: "Dohody platí. Každý má svou roli a my se na sebe můžeme spolehnout." },
    { icon: Sparkles, title: "Zážitky", description: "Učení skrze praxi. Skutečné zkušenosti jsou cenější než teorie." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Na čem si zakládáme</h2>
          <p className="text-xl text-stone-600">Hodnoty, které vedou náš kmen</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">{value.title}</h3>
              <p className="text-stone-700 leading-relaxed text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Team ── */
function TeamSection() {
  const team = [
    { name: "Jakub", role: "Hlavní vedoucí", description: "Zakladatel kmene s 8 lety zkušeností s dětskými tábory a outdoor aktivitami. Miluje přírodu a předává dětem lásku k dobrodružství.", badges: ["První pomoc", "8 let zkušeností", "Instruktor outdooru"] },
    { name: "Tereza", role: "Vedoucí Malého kmene", description: "Učitelka na základní škole, která věří v učení skrze zážitky. S menšími dětmi umí pracovat trpělivě a s láskou.", badges: ["První pomoc", "Učitelka", "5 let s dětmi"] },
    { name: "Martin", role: "Vedoucí Velkého kmene", description: "Outdoor nadšenec a horolezec. Děti učí zodpovědnosti, odvaze a respektu k přírodě vlastním příkladem.", badges: ["První pomoc", "Horolezecký instruktor", "6 let zkušeností"] },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Kdo děti vede</h2>
          <p className="text-xl text-stone-600">Zkušení vedoucí s láskou k přírodě a práci s dětmi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-blue-900 transition-all hover:shadow-lg">
              <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white font-bold">{member.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 text-center mb-1">{member.name}</h3>
              <p className="text-blue-900 text-center mb-4 font-medium">{member.role}</p>
              <p className="text-stone-700 leading-relaxed mb-6 text-center">{member.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.badges.map((badge, j) => (
                  <span key={j} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs font-medium">
                    <Award className="w-3 h-3" />{badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Safety ── */
function SafetySection() {
  const sections = [
    { icon: Shield, title: "Dohled a bezpečnost", text: "Všichni vedoucí mají platné osvědčení vedoucího dětského tábora a kurz první pomoci. Poměr vedoucích k dětem je maximálně 1:10. V terénu máme vždy kompletní lékárničku a komunikační prostředky." },
    { icon: Phone, title: "Nouzový kontakt", text: "V přihlášce uvádíte kontakt pro případ potřeby. Během akce jsme dostupní na telefonu. V případě jakéhokoliv problému vás okamžitě kontaktujeme. WhatsApp skupina slouží pro běžnou komunikaci." },
    { icon: Camera, title: "Fotky a soukromí (GDPR)", text: "Fotíme pro interní účely a posíláme rodičům. Pro zveřejnění fotek na webu nebo sociálních sítích vyžadujeme váš písemný souhlas. Fotografie nejsou nikdy zveřejňovány se jmény dětí." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Bezpečí a soukromí</h2>
          <p className="text-xl text-stone-600">Vaše dítě je v dobrých rukou</p>
        </div>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="bg-stone-50 rounded-xl p-6 border border-stone-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-blue-900" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">{s.title}</h3>
                  <p className="text-stone-700 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Photo Story ── */
function PhotoStory() {
  const photos = [
    { url: "https://images.unsplash.com/photo-1624485276207-2ce1d4f04cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Výprava do lesa" },
    { url: "https://images.unsplash.com/photo-1576252951301-3b7b1e4278d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Orientace v terénu" },
    { url: "https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Táborový oheň" },
    { url: "https://images.unsplash.com/photo-1767713885467-a927f4b55e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Cesta přírodou" },
    { url: "https://images.unsplash.com/photo-1769526518601-1c6b3e4335c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Příroda kolem nás" },
    { url: "https://images.unsplash.com/photo-1635278531368-a5865aa4675b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Společné chvíle" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Jak to vypadá na našich akcích</h2>
          <p className="text-xl text-stone-600">Skutečné momenty z našich výprav</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {photos.map((photo, i) => (
            <div key={i} className="relative aspect-[4/3] bg-stone-200 rounded-xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-medium text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About CTA ── */
function AboutCTA() {
  const ctaText = useCtaText();
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">Přidejte se k našemu kmenu</h2>
        <p className="text-xl text-stone-700 mb-10">
          Vaše dítě si najde kamarády, získá sebedůvěru a prožije nezapomenutelná dobrodružství v přírodě.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link href="/prihlasit" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">{ctaText}</Link>
          <Link href="/kontakt" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />Kontakt
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-stone-700 pt-6 border-t border-stone-200">
          <a href="tel:+420602801010" className="flex items-center gap-2 hover:text-blue-900 transition-colors">
            <Phone className="w-5 h-5 text-blue-900" /><span className="font-medium">602 801 010</span>
          </a>
          <a href="mailto:kmentrilobit@gmail.com" className="flex items-center gap-2 hover:text-blue-900 transition-colors">
            <Mail className="w-5 h-5 text-blue-900" /><span className="font-medium">kmentrilobit@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function ONasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <TribeValues />
        <SectionDivider />
        <TeamSection />
        <SectionDivider />
        <SafetySection />
        <SectionDivider />
        <PhotoStory />
        <AboutCTA />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
