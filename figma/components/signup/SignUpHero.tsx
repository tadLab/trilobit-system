import { MapPin, Users, TreePine } from 'lucide-react';

export function SignUpHero() {
  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-white py-16 lg:py-20">
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
            Přihlásit dítě
          </h1>
          
          <p className="text-xl text-stone-700 mb-8 leading-relaxed">
            Zanechte kontakt — ozveme se a domluvíme nejbližší vhodnou akci nebo program.
          </p>

          {/* Trust line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Choltice a okolí</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span>6–12 let</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 text-amber-600" />
              <span>Outdoor tribe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
