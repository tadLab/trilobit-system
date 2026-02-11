import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <span className="text-2xl font-bold">TRILOBIT</span>
            </Link>
            <p className="text-stone-400 leading-relaxed">
              Dobrodružný kmen pro děti v Cholticích. Pravidelné výpravy a
              zážitky v přírodě.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:kmentrilobit@gmail.com"
                  className="text-stone-400 hover:text-blue-700 transition-colors"
                >
                  kmentrilobit@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+420602801010"
                  className="text-stone-400 hover:text-blue-700 transition-colors"
                >
                  602 801 010
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">Choltice a okolí</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-lg mb-4">Sledujte nás</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-stone-400 hover:text-blue-700 transition-colors text-sm"
              >
                Ochrana osobních údajů (GDPR)
              </a>
              <a
                href="#"
                className="block text-stone-400 hover:text-blue-700 transition-colors text-sm"
              >
                Podmínky použití
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 text-center">
          <p className="text-stone-500 text-sm">
            &copy; 2026 TRILOBIT. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
