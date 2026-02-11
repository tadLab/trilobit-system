import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactCards() {
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Phone Card */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-amber-600 transition-colors">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">
              Telefon
            </h3>
            <p className="text-2xl font-bold text-amber-700 text-center mb-2">
              602 801 010
            </p>
            <p className="text-sm text-stone-600 text-center mb-6">
              Po–Pá 9:00–17:00
            </p>
            <a 
              href="tel:+420602801010"
              className="block w-full bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors text-center font-medium"
            >
              Zavolat
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-amber-600 transition-colors">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">
              Email
            </h3>
            <p className="text-lg font-bold text-amber-700 text-center mb-2 break-all">
              kmentrilobit@gmail.com
            </p>
            <p className="text-sm text-stone-600 text-center mb-6">
              Odpovídáme do 24 hodin
            </p>
            <a 
              href="mailto:kmentrilobit@gmail.com"
              className="block w-full bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors text-center font-medium"
            >
              Napsat email
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-amber-600 transition-colors">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 text-center mb-4">
              Místo setkání
            </h3>
            <p className="text-2xl font-bold text-amber-700 text-center mb-2">
              Choltice a okolí
            </p>
            <p className="text-sm text-stone-600 text-center mb-6">
              Místo srazu posíláme po přihlášení
            </p>
            <div className="h-[44px]"></div> {/* Spacer to match button height */}
          </div>
        </div>
      </div>
    </section>
  );
}
