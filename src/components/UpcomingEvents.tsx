import {
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";

const events = [
  {
    date: "15. března 2026",
    name: "Jarní výprava do Poodří",
    description: "Celodenní výlet s poznáváním přírodních památek",
    duration: "Celý den",
    location: "Poodří",
    age: "Pro děti",
  },
  {
    date: "22. března 2026",
    name: "Stavba přístřešků",
    description: "Naučíme se stavět primitivní úkryty v lese",
    duration: "3 hodiny",
    location: "Choltice",
    age: "Pro děti",
  },
  {
    date: "29. března 2026",
    name: "Stopování a orientace",
    description: "Praktické dovednosti v terénu",
    duration: "4 hodiny",
    location: "Okolí Choltic",
    age: "Pro děti",
  },
];

export function UpcomingEvents() {
  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Nadcházející akce
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-200 hover:border-blue-900 transition-colors"
            >
              <div className="flex items-center gap-2 text-blue-900 mb-4">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{event.date}</span>
              </div>
              <h3 className="text-xl text-stone-900 mb-3">{event.name}</h3>
              <p className="text-stone-600 mb-4">{event.description}</p>

              <div className="flex flex-wrap gap-3 mb-6 text-sm text-stone-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{event.age}</span>
                </div>
              </div>

              <Link
                href="/prihlasit"
                className="text-blue-900 hover:text-blue-950 transition-colors flex items-center gap-2 font-medium"
              >
                Přihlásit se <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/kalendar"
            className="text-blue-900 hover:text-blue-950 transition-colors inline-flex items-center gap-2 border-2 border-blue-900 rounded-full px-8 py-3"
          >
            Zobrazit celý kalendář
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
