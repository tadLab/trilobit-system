"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/hooks/useEvents";

export function UpcomingEvents() {
  const { events: allEvents, isLoaded } = useEvents();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return allEvents
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [allEvents]);

  if (!isLoaded) return null;
  if (upcomingEvents.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Nadcházející akce</h2>
          <p className="text-stone-600 text-lg mb-8">Momentálně nejsou naplánovány žádné akce. Sledujte nás!</p>
          <Link href="/kalendar" className="text-blue-900 hover:text-blue-950 transition-colors inline-flex items-center gap-2 border-2 border-blue-900 rounded-full px-8 py-3">
            Zobrazit kalendář <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Nadcházející akce
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-blue-900 transition-colors overflow-hidden"
            >
              {event.poster ? (
                <div className="aspect-[16/9] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-blue-900/30" />
                </div>
              )}
              <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 text-blue-900 mb-4">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <h3 className="text-xl text-stone-900 mb-3">{event.title}</h3>
              <p className="text-stone-600 mb-4">{event.description}</p>

              <div className="flex flex-wrap gap-3 mb-4 text-sm text-stone-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.attendees && event.attendees.length > 0 && (
                <div className="mb-6 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full p-3 flex items-center justify-between hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-900" />
                        <span className="text-xs font-medium text-stone-900">Kdo jde ({event.attendees.length})</span>
                      </div>
                      <div className="flex -space-x-1.5">
                        {event.attendees.slice(0, 4).map((a, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                            <span className="text-[10px] font-bold text-blue-900">{a.avatar}</span>
                          </div>
                        ))}
                        {event.attendees.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center">
                            <span className="text-[10px] font-medium text-stone-600">+{event.attendees.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
                  </button>
                  {expandedIndex === index && (
                    <div className="px-3 pb-3 border-t border-stone-200">
                      <div className="grid grid-cols-2 gap-1.5 pt-2">
                        {event.attendees.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-stone-100">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-blue-900">{a.avatar}</span>
                            </div>
                            <span className="text-xs text-stone-700 truncate">{a.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Link
                href="/prihlasit"
                className="text-blue-900 hover:text-blue-950 transition-colors flex items-center gap-2 font-medium"
              >
                Přihlásit se <ArrowRight className="w-4 h-4" />
              </Link>
              </div>
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
