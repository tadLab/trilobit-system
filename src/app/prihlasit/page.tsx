"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { QuickContact } from "@/components/QuickContact";
import { MapPin, Users, TreePine, Send, Phone, Mail } from "lucide-react";

function SignUpHero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17L11 22" strokeLinecap="round" />
            </svg>
            <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
          </div>
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Přihlásit dítě</h1>
          <p className="text-xl text-stone-700 mb-8 leading-relaxed">
            Zanechte kontakt — ozveme se a domluvíme nejbližší vhodnou akci nebo program.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-900" /><span>Choltice a okolí</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-900" /><span>6–12 let</span></div>
            <div className="flex items-center gap-2"><TreePine className="w-4 h-4 text-blue-900" /><span>Outdoor tribe</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignUpForm() {
  const [formData, setFormData] = useState({
    parentName: "", contact: "", childAge: "", interest: "event", preferredDate: "", notes: "", gdprConsent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 rounded-2xl p-8 lg:p-12 border border-green-200">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl text-stone-900 mb-4">Děkujeme za přihlášku!</h2>
            <p className="text-xl text-stone-700 mb-6">Ozveme se do 24 hodin a domluvíme detaily.</p>
            <p className="text-stone-600">Pokud si chcete promluvit hned, zavolejte nám na <strong>602 801 010</strong></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="bg-stone-50 rounded-2xl p-8 lg:p-10 border border-stone-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-stone-900 mb-2">Jméno rodiče *</label>
              <input type="text" id="parentName" name="parentName" required value={formData.parentName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="Vaše jméno" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-stone-900 mb-2">Email nebo telefon *</label>
              <input type="text" id="contact" name="contact" required value={formData.contact} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="email@example.com nebo 123 456 789" />
            </div>
            <div>
              <label htmlFor="childAge" className="block text-sm font-medium text-stone-900 mb-2">Věk dítěte *</label>
              <input type="text" id="childAge" name="childAge" required value={formData.childAge} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="např. 8 let" />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-stone-900 mb-2">Co hledáte? *</label>
              <select id="interest" name="interest" required value={formData.interest} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors">
                <option value="event">Zkusit nejbližší akci</option>
                <option value="program">Pravidelný program</option>
                <option value="question">Jen se zeptat</option>
              </select>
            </div>
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-stone-900 mb-2">Preferovaný termín (nepovinné)</label>
              <input type="text" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="např. víkendy, odpoledne..." />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-stone-900 mb-2">Poznámka (alergie, zkušenost, dotaz)</label>
              <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors resize-none" placeholder="Zde napište, pokud má dítě nějaké alergie, předchozí zkušenosti, nebo máte dotaz..." />
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" id="gdprConsent" name="gdprConsent" required checked={formData.gdprConsent} onChange={handleChange} className="mt-1 w-4 h-4 rounded border-stone-300 text-blue-900 focus:ring-blue-900" />
              <label htmlFor="gdprConsent" className="text-sm text-stone-700">
                Souhlasím se zpracováním osobních údajů pro účely kontaktování ohledně činnosti kmene Trilobit. *
              </label>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg font-medium flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />Odeslat přihlášku
              </button>
              <p className="text-sm text-stone-600 text-center mt-3">Ozveme se do 24 hodin.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function SignUpSteps() {
  const steps = [
    { number: "1", title: "Ozveme se a potvrdíme místo", description: "Do 24 hodin vás kontaktujeme a domluvíme nejbližší vhodnou akci nebo program." },
    { number: "2", title: "Pošleme info", description: "Před akcí dostanete všechny důležité informace: místo srazu, co s sebou, kontakt na vedoucího." },
    { number: "3", title: "Dítě jde na první akci", description: "Vaše dítě se setká s kmenovým týmem a zažije své první dobrodružství v přírodě." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Co se stane dál?</h2>
          <p className="text-xl text-stone-600">Tři jednoduché kroky k prvnímu dobrodružství</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-blue-200" />}
              <div className="relative bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">{step.number}</div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-700 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-8 border border-stone-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Potřebujete odpověď hned?</h3>
            <p className="text-stone-600">Neváhejte nás kontaktovat přímo</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+420602801010" className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-950 transition-colors">
              <Phone className="w-5 h-5" /><span className="font-medium">602 801 010</span>
            </a>
            <a href="mailto:kmentrilobit@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-800 rounded-full hover:bg-stone-200 transition-colors">
              <Mail className="w-5 h-5" /><span className="font-medium">kmentrilobit@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrihlasitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SignUpHero />
        <SignUpForm />
        <SectionDivider />
        <SignUpSteps />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
