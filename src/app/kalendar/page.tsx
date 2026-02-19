"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, X, Users, ChevronDown, FileDown, BookOpen, ImageIcon, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/hooks/useEvents";
import type { CalEvent } from "@/types/data";

const monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
const dayNames = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

function getEventColor(type: string) {
  switch (type) {
    case "expedition": return "bg-blue-100 border-blue-500 text-blue-900";
    case "special": return "bg-amber-100 border-amber-500 text-amber-900";
    default: return "bg-emerald-100 border-emerald-500 text-emerald-900";
  }
}

/* ── Archive of past events ── */
function EventArchive({ events }: { events: CalEvent[] }) {
  const pastEvents = events
    .filter((e) => new Date(e.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (pastEvents.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="w-8 h-8 text-blue-900" />
            <h2 className="text-3xl lg:text-4xl text-stone-900">Archiv akcí</h2>
          </div>
          <p className="text-xl text-stone-600">Prohlédněte si proběhlé akce a fotky z nich</p>
        </div>

        <div className="space-y-4">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row">
                {/* Poster thumbnail or date */}
                {event.poster ? (
                  <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0 bg-stone-100 flex items-center justify-center">
                    <div className="text-center">
                      <CalendarIcon className="w-8 h-8 text-stone-400 mx-auto mb-1" />
                      <p className="text-sm text-stone-500">{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })}</p>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                          {event.type === "expedition" ? "Výprava" : event.type === "special" ? "Speciální akce" : "Setkání"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-stone-900">{event.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600 mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4 text-blue-900" />
                      {new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-900" />
                      {event.location}
                    </span>
                    {event.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-900" />
                        {event.attendees.length} účastníků
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-3">
                    {event.photoAlbumUrl ? (
                      <a
                        href={event.photoAlbumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-950 transition-colors text-sm font-medium"
                      >
                        <ImageIcon className="w-4 h-4" />Fotky z akce
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-stone-400">
                        <ImageIcon className="w-4 h-4" />Fotky zatím nenahrány
                      </span>
                    )}
                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex -space-x-1.5 ml-auto">
                        {event.attendees.slice(0, 5).map((a, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center" title={a.name}>
                            <span className="text-[10px] font-bold text-blue-900">{a.avatar}</span>
                          </div>
                        ))}
                        {event.attendees.length > 5 && (
                          <div className="w-7 h-7 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center">
                            <span className="text-[10px] font-medium text-stone-600">+{event.attendees.length - 5}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Výročka stats ── */
const totalPastEvents = 25;
const totalPastParticipants = 417;

function Vyrocka() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-900" />
          <h2 className="text-3xl lg:text-4xl text-stone-900">Výročka 2025</h2>
        </div>
        <p className="text-xl text-stone-600 mb-8">Přehled všech akcí a výprav uplynulého roku</p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-900">{totalPastEvents}</p>
            <p className="text-sm text-stone-600">akcí celkem</p>
          </div>
          <div className="w-px h-10 bg-stone-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-900">{totalPastParticipants}</p>
            <p className="text-sm text-stone-600">účastí dětí</p>
          </div>
          <div className="w-px h-10 bg-stone-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-900">12</p>
            <p className="text-sm text-stone-600">měsíců aktivit</p>
          </div>
        </div>

        {/* PDF download */}
        <a
          href="/vyrocka-trilobit-2025.pdf"
          download
          className="inline-flex items-center gap-3 bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg font-medium"
        >
          <FileDown className="w-5 h-5" />
          Stáhnout výročku (PDF)
        </a>
      </div>
    </section>
  );
}

export default function KalendarPage() {
  const { events, isLoaded } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [showAttendees, setShowAttendees] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

  const getEventsForDay = (day: number) =>
    events.filter((e) => { const d = new Date(e.date); return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year; });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center py-32">
          <div className="text-stone-400 text-lg">Načítání kalendáře…</div>
        </main>
        <Footer />
      </div>
    );
  }

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
                        {dayEvents.map((event) => {
                          const isPast = new Date(event.date) < new Date();
                          return (
                            <button key={event.id} onClick={() => { setSelectedEvent(event); setShowAttendees(false); }} className={`w-full text-left text-xs p-1.5 rounded border-l-2 hover:shadow-md transition-shadow ${getEventColor(event.type)} ${isPast ? "opacity-60" : ""}`}>
                              <div className="font-medium truncate">{event.time} {isPast && "✓"}</div>
                              <div className="truncate">{event.title}</div>
                            </button>
                          );
                        })}
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
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEventColor(selectedEvent.type)}`}>
                        {selectedEvent.type === "expedition" ? "Výprava" : selectedEvent.type === "special" ? "Speciální akce" : "Pravidelné setkání"}
                      </span>
                      {new Date(selectedEvent.date) < new Date() && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 border border-stone-300 text-stone-600">
                          <CheckCircle className="w-3 h-3 inline mr-1" />Proběhlo
                        </span>
                      )}
                    </div>
                    <button onClick={() => setSelectedEvent(null)} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">{selectedEvent.title}</h3>
                  {selectedEvent.poster && (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
                      <img src={selectedEvent.poster} alt={selectedEvent.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-stone-700">
                      <CalendarIcon className="w-5 h-5 text-blue-900 mt-0.5" />
                      <div>
                        <p className="font-medium">{new Date(selectedEvent.date).toLocaleDateString("cs-CZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
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
                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div className="mb-6 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                      <button onClick={() => setShowAttendees(!showAttendees)} className="w-full p-4 flex items-center justify-between hover:bg-stone-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-900" />
                            <span className="text-sm font-medium text-stone-900">Kdo jde ({selectedEvent.attendees.length})</span>
                          </div>
                          <div className="flex -space-x-2">
                            {selectedEvent.attendees.slice(0, 4).map((a, i) => (
                              <div key={i} className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                                <span className="text-[10px] font-bold text-blue-900">{a.avatar}</span>
                              </div>
                            ))}
                            {selectedEvent.attendees.length > 4 && (
                              <div className="w-7 h-7 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center">
                                <span className="text-[10px] font-medium text-stone-600">+{selectedEvent.attendees.length - 4}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${showAttendees ? "rotate-180" : ""}`} />
                      </button>
                      {showAttendees && (
                        <div className="px-4 pb-4 border-t border-stone-200">
                          <div className="grid grid-cols-2 gap-2 pt-3">
                            {selectedEvent.attendees.map((a, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-stone-100">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-blue-900">{a.avatar}</span>
                                </div>
                                <span className="text-sm text-stone-700 truncate">{a.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Photo album link for past events */}
                  {new Date(selectedEvent.date) < new Date() && selectedEvent.photoAlbumUrl && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-5 h-5 text-blue-900" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-stone-900">Fotky z akce</p>
                          <p className="text-xs text-stone-500">Prohlédněte si fotografie z této akce</p>
                        </div>
                        <a href={selectedEvent.photoAlbumUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-950 transition-colors text-sm font-medium">
                          <ExternalLink className="w-4 h-4" />Otevřít album
                        </a>
                      </div>
                    </div>
                  )}
                  {new Date(selectedEvent.date) < new Date() && !selectedEvent.photoAlbumUrl && (
                    <div className="mb-6 p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-stone-400" />
                        <p className="text-sm text-stone-500">Fotky z této akce zatím nebyly nahrány.</p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    {new Date(selectedEvent.date) >= new Date() ? (
                      <Link href="/prihlasit" className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors font-medium text-center">Přihlásit se</Link>
                    ) : selectedEvent.photoAlbumUrl ? (
                      <a href={selectedEvent.photoAlbumUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors font-medium text-center flex items-center justify-center gap-2">
                        <ImageIcon className="w-5 h-5" />Zobrazit fotky
                      </a>
                    ) : null}
                    <button onClick={() => setSelectedEvent(null)} className="px-6 py-3 rounded-full border-2 border-stone-300 text-stone-700 hover:border-stone-400 transition-colors font-medium">Zavřít</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <EventArchive events={events} />
        <Vyrocka />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
