import { CheckCircle, Phone, Mail } from 'lucide-react';

export function SignUpSteps() {
  const steps = [
    {
      number: '1',
      title: 'Ozveme se a potvrdíme místo',
      description: 'Do 24 hodin vás kontaktujeme a domluvíme nejbližší vhodnou akci nebo program.',
    },
    {
      number: '2',
      title: 'Pošleme info',
      description: 'Před akcí dostanete všechny důležité informace: místo srazu, co s sebou, kontakt na vedoucího.',
    },
    {
      number: '3',
      title: 'Dítě jde na první akci',
      description: 'Vaše dítě se setká s kmenovým týmem a zažije své první dobrodružství v přírodě.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Co se stane dál?
          </h2>
          <p className="text-xl text-stone-600">
            Tři jednoduché kroky k prvnímu dobrodružství
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-amber-200" />
              )}
              
              <div className="relative bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-stone-900 mb-2">
              Potřebujete odpověď hned?
            </h3>
            <p className="text-stone-600">
              Neváhejte nás kontaktovat přímo
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+420602801010"
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">602 801 010</span>
            </a>
            <a 
              href="mailto:kmentrilobit@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">kmentrilobit@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
