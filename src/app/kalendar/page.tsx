"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, X } from "lucide-react";
import Link from "next/link";

interface CalEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  description: string;
  type: "regular" | "expedition" | "special";
  spotsLeft?: number;
}

const events: CalEvent[] = [
  { id: "1", title: "Jarní výprava do Poodří", date: new Date(2026, 2, 15), time: "9:00", duration: "Celý den", location: "Poodří", description: "Celodenní výlet s poznáváním přírodních památek. Sraz v centru Choltic v 9:00.", type: "expedition", spotsLeft: 5 },
  { id: "2", title: "Malý kmen - týdenní setkání", date: new Date(2026, 2, 18), time: "15:00", duration: "2 hodiny", location: "Choltice", description: "Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.", type: "regular" },
  { id: "3", title: "Velký kmen - týdenní setkání", date: new Date(2026, 2, 20), time: "15:00", duration: "3 hodiny", location: "Choltice a okolí", description: "Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.", type: "regular" },
  { id: "4", title: "Stavba přístřešků", date: new Date(2026, 2, 22), time: "14:00", duration: "3 hodiny", location: "Les u Choltic", description: "Naučíme se stavět primitivní úkryty v lese. Praktická lekce přežití.", type: "special", spotsLeft: 8 },
  { id: "5", title: "Malý kmen - týdenní setkání", date: new Date(2026, 2, 25), time: "15:00", duration: "2 hodiny", location: "Choltice", description: "Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.", type: "regular" },
  { id: "6", title: "Velký kmen - týdenní setkání", date: new Date(2026, 2, 27), time: "15:00", duration: "3 hodiny", location: "Choltice a okolí", description: "Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.", type: "regular" },
  { id: "7", title: "Stopování a orientace", date: new Date(2026, 2, 29), time: "10:00", duration: "4 hodiny", location: "Okolí Choltic", description: "Praktické dovednosti v terénu - učíme se číst stopy a orientovat se v přírodě.", type: "special", spotsLeft: 3 },
];

const monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
const dayNames = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

function getEventColor(type: string) {
  switch (type) {
    case "expedition": return "bg-blue-100 border-blue-500 text-blue-900";
    case "special": return "bg-amber-100 border-amber-500 text-amber-900";
    default: return "bg-emerald-100 border-emerald-500 text-emerald-900";
  }
}

export default function KalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

  const getEventsForDay = (day: number) =>
    events.filter((e) => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-8 lg:py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CalendarIcon className="w-8 h-8 text-blue-900" />
                <h1 className="text-3xl lg:text-4xl text-stone-900">Kalendář akcí</h1>
              </div>
              <p className="text-lg text-stone-600">Všechny nadcházející akce a pravidelná setkání kmene Trilobit</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
                <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 hover:bg-blue-950 rounded-lg transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold">{monthNames[month]} {year}</h2>
                <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 hover:bg-blue-950 rounded-lg transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50">
                {dayNames.map((d) => (
                  <div key={d} className="p-3 text-center text-sm font-semibold text-stone-600">{d}</div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 auto-rows-fr min-h-[600px]">
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`e-${i}`} className="border border-stone-200 bg-stone-50/50 p-2" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                  return (
                    <div key={day} className="border border-stone-200 p-2 min-h-[100px] hover:bg-stone-50 transition-colors">
                      <div className={`text-sm font-semibold mb-2 ${isToday ? "bg-blue-900 text-white rounded-full w-7 h-7 flex items-center justify-center" : "text-stone-900"}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <button key={event.id} onClick={() => setSelectedEvent(event)} className={`w-full text-left text-xs p-1.5 rounded border-l-2 hover:shadow-md transition-shadow ${getEventColor(event.type)}`}>
                            <div className="font-medium truncate">{event.time}</div>
                            <div className="truncate">{event.title}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-100 border-l-2 border-emerald-500 rounded" /><span className="text-stone-600">Pravidelné setkání</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-100 border-l-2 border-blue-500 rounded" /><span className="text-stone-600">Výprava</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-100 border-l-2 border-amber-500 rounded" /><span className="text-stone-600">Speciální akce</span></div>
            </div>

            {/* Modal */}
            {selectedEvent && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEventColor(selectedEvent.type)}`}>
                      {selectedEvent.type === "expedition" ? "Výprava" : selectedEvent.type === "special" ? "Speciální akce" : "Pravidelné setkání"}
                    </span>
                    <button onClick={() => setSelectedEvent(null)} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">{selectedEvent.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-stone-700">
                      <CalendarIcon className="w-5 h-5 text-blue-900 mt-0.5" />
                      <div>
                        <p className="font-medium">{selectedEvent.date.toLocaleDateString("cs-CZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                        <p className="text-sm">{selectedEvent.time} &bull; {selectedEvent.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-stone-700">
                      <MapPin className="w-5 h-5 text-blue-900 mt-0.5" />
                      <p>{selectedEvent.location}</p>
                    </div>
                    <p className="text-stone-700 leading-relaxed pl-8">{selectedEvent.description}</p>
                    {selectedEvent.spotsLeft && (
                      <div className="pl-8 text-sm text-blue-900 font-medium">
                        Zbývá {selectedEvent.spotsLeft} {selectedEvent.spotsLeft === 1 ? "místo" : selectedEvent.spotsLeft < 5 ? "místa" : "míst"}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Link href="/prihlasit" className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors font-medium text-center">Přihlásit se</Link>
                    <button onClick={() => setSelectedEvent(null)} className="px-6 py-3 rounded-full border-2 border-stone-300 text-stone-700 hover:border-stone-400 transition-colors font-medium">Zavřít</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
