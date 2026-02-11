"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { Phone, Mail, MapPin, Send, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

function ContactHero() {
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
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Kontakt</h1>
          <p className="text-xl text-stone-700 mb-10 leading-relaxed">
            Napište nám — ozveme se co nejdřív a poradíme s výběrem akce nebo programu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+420602801010" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />Zavolat
            </a>
            <a href="mailto:kmentrilobit@gmail.com" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />Napsat email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCards() {
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-blue-900 transition-colors">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6"><Phone className="w-8 h-8 text-white" /></div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">Telefon</h3>
            <p className="text-2xl font-bold text-blue-900 text-center mb-2">602 801 010</p>
            <p className="text-sm text-stone-600 text-center mb-6">Po–Pá 9:00–17:00</p>
            <a href="tel:+420602801010" className="block w-full bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors text-center font-medium">Zavolat</a>
          </div>
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-blue-900 transition-colors">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6"><Mail className="w-8 h-8 text-white" /></div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">Email</h3>
            <p className="text-lg font-bold text-blue-900 text-center mb-2 break-all">kmentrilobit@gmail.com</p>
            <p className="text-sm text-stone-600 text-center mb-6">Odpovídáme do 24 hodin</p>
            <a href="mailto:kmentrilobit@gmail.com" className="block w-full bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors text-center font-medium">Napsat email</a>
          </div>
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-blue-900 transition-colors">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6"><MapPin className="w-8 h-8 text-white" /></div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">Místo setkání</h3>
            <p className="text-2xl font-bold text-blue-900 text-center mb-2">Choltice a okolí</p>
            <p className="text-sm text-stone-600 text-center mb-6">Místo srazu posíláme po přihlášení</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", contact: "", childAge: "", message: "", gdprConsent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  if (submitted) {
    return (
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-green-50 rounded-2xl p-8 lg:p-12 border border-green-200">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl text-stone-900 mb-4">Děkujeme za zprávu!</h2>
            <p className="text-xl text-stone-700">Ozveme se do 24 hodin.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Napište nám</h2>
          <p className="text-xl text-stone-600">Vyplňte formulář a my se vám ozveme</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl p-8 lg:p-10 border border-stone-200 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">Jméno rodiče *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="Vaše jméno" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-stone-900 mb-2">Email nebo telefon *</label>
              <input type="text" id="contact" name="contact" required value={formData.contact} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="email@example.com nebo 123 456 789" />
            </div>
            <div>
              <label htmlFor="childAge" className="block text-sm font-medium text-stone-900 mb-2">Věk dítěte (nepovinné)</label>
              <input type="text" id="childAge" name="childAge" value={formData.childAge} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="např. 8 let" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-900 mb-2">Zpráva *</label>
              <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors resize-none" placeholder="Napište nám, co byste chtěli vědět..." />
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" id="gdprConsent" name="gdprConsent" required checked={formData.gdprConsent} onChange={handleChange} className="mt-1 w-4 h-4 rounded border-stone-300 text-blue-900 focus:ring-blue-900" />
              <label htmlFor="gdprConsent" className="text-sm text-stone-700">Souhlasím se zpracováním osobních údajů pro účely kontaktování ohledně činnosti kmene Trilobit. *</label>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg font-medium flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />Odeslat zprávu
              </button>
              <p className="text-sm text-stone-600 text-center mt-3">Ozveme se do 24 hodin.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactFAQ() {
  const faqs = [
    { question: "Jak se přihlásit?", answer: "Vyplňte formulář výše, napište email nebo zavolejte. Domluvíme si detaily a pošleme přihlášku." },
    { question: "Co když prší?", answer: "Akce probíhají i za deště. Jen si vezměte vhodné oblečení. V případě bouřky vás informujeme předem." },
    { question: "Pro jaký věk je Trilobit?", answer: "Pro děti 6–12 let. Máme dva programy: Malý kmen (6–8) a Velký kmen (9–12)." },
    { question: "Kde se scházíme?", answer: "Většinou v centru Choltic nebo v blízkém okolí. Přesné místo srazu posíláme vždy před akcí." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12"><h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Časté otázky</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-stone-50 rounded-xl p-6 border border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{faq.question}</h3>
              <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/programy" className="text-blue-900 hover:text-blue-950 transition-colors inline-flex items-center gap-2 font-medium">
            Zobrazit všechny FAQ<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">Přidejte se k našemu kmenu</h2>
        <p className="text-xl text-stone-700 mb-10">Začněte dobrodružství vašeho dítěte v přírodě</p>
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

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <ContactCards />
        <SectionDivider />
        <ContactForm />
        <SectionDivider />
        <ContactFAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
