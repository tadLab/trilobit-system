import { Phone, Mail } from 'lucide-react';

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tribal motif */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17L11 22" strokeLinecap="round"/>
            </svg>
            <span className="text-amber-600 text-sm tracking-wider uppercase">Kmen Trilobit</span>
          </div>

          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">
            Kontakt
          </h1>
          
          <p className="text-xl text-stone-700 mb-10 leading-relaxed">
            Napište nám — ozveme se co nejdřív a poradíme s výběrem akce nebo programu.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+420602801010"
              className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-colors text-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Zavolat
            </a>
            <a 
              href="mailto:kmentrilobit@gmail.com"
              className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-amber-600 hover:text-amber-700 transition-colors text-lg flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Napsat email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
