import { Mail, Phone, MessageCircle } from 'lucide-react';

export function QuickContact() {
  return (
    <section className="py-12 bg-blue-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl text-stone-900 mb-2">Rychlý kontakt</h3>
          <p className="text-stone-600">Neváhejte se na nás obrátit s jakýmkoliv dotazem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href="tel:+420602801010"
            className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-950" />
            </div>
            <div className="text-center">
              <p className="text-sm text-stone-600 mb-1">Telefon</p>
              <p className="text-stone-900 font-medium">602 801 010</p>
            </div>
          </a>

          <a
            href="mailto:kmentrilobit@gmail.com"
            className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-950" />
            </div>
            <div className="text-center">
              <p className="text-sm text-stone-600 mb-1">Email</p>
              <p className="text-stone-900 font-medium">kmentrilobit@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/420602801010"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-950" />
            </div>
            <div className="text-center">
              <p className="text-sm text-stone-600 mb-1">WhatsApp</p>
              <p className="text-stone-900 font-medium">Napište nám</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}