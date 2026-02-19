"use client";

import { useState, useEffect, useCallback } from "react";
import type { CalEvent } from "@/types/data";

const STORAGE_KEY = "trilobit_events";

/* Seed data — migrated from kalendar/page.tsx (Date objects → "YYYY-MM-DD" strings) */
const defaultEvents: CalEvent[] = [
  // ── Past events (Jan–Feb 2026) with photo albums ──
  { id: "p1", title: "Novoroční výšlap na Kunětickou horu", date: "2026-01-04", time: "10:00", duration: "4 hodiny", location: "Kunětická hora", description: "Novoroční tradice — výstup na Kunětickou horu s horkou čokoládou na vrcholu.", type: "expedition", poster: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&h=675&fit=crop", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Eliška N.", avatar: "E" }, { name: "Jakub K.", avatar: "J" }, { name: "Marek P.", avatar: "M" }, { name: "Sofie H.", avatar: "S" }], photoAlbumUrl: "https://drive.google.com/drive/folders/example-novorocni-vyslap" },
  { id: "p2", title: "Zimní přežití — stavba iglú", date: "2026-01-17", time: "13:00", duration: "3 hodiny", location: "Les u Choltic", description: "Stavba sněhových úkrytů a základy zimního přežití v přírodě.", type: "special", poster: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&h=675&fit=crop", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Jakub K.", avatar: "J" }, { name: "Aneta V.", avatar: "A" }, { name: "Lucie D.", avatar: "L" }], photoAlbumUrl: "https://drive.google.com/drive/folders/example-zimni-preziti" },
  { id: "p3", title: "Malý kmen — masopustní setkání", date: "2026-02-04", time: "15:00", duration: "2 hodiny", location: "Choltice", description: "Speciální masopustní program s maskami a tradičními hrami.", type: "regular", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Jakub K.", avatar: "J" }, { name: "Sofie H.", avatar: "S" }, { name: "Aneta V.", avatar: "A" }], photoAlbumUrl: "https://drive.google.com/drive/folders/example-masopust" },
  { id: "p4", title: "Výprava do Železných hor", date: "2026-02-14", time: "8:00", duration: "Celý den", location: "Železné hory", description: "Celodenní expedice do srdce Železných hor — skalní útvary, jeskyně a zimní příroda.", type: "expedition", poster: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=675&fit=crop", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Eliška N.", avatar: "E" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Jakub K.", avatar: "J" }, { name: "Lucie D.", avatar: "L" }, { name: "Petr S.", avatar: "P" }, { name: "Sofie H.", avatar: "S" }], photoAlbumUrl: "https://drive.google.com/drive/folders/example-zelezne-hory" },
  { id: "p5", title: "Noční orientační hra", date: "2026-02-28", time: "17:00", duration: "3 hodiny", location: "Okolí Choltic", description: "Navigace v nočním terénu s baterkami a buzolou. Týmová hra pro odvážné.", type: "special", poster: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200&h=675&fit=crop", attendees: [{ name: "Eliška N.", avatar: "E" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Jakub K.", avatar: "J" }, { name: "Petr S.", avatar: "P" }], photoAlbumUrl: "https://drive.google.com/drive/folders/example-nocni-hra" },
  // ── Future events (March 2026) ──
  { id: "1", title: "Jarní výprava do Poodří", date: "2026-03-15", time: "9:00", duration: "Celý den", location: "Poodří", description: "Celodenní výlet s poznáváním přírodních památek. Sraz v centru Choltic v 9:00.", type: "expedition", spotsLeft: 5, poster: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=1200&h=675&fit=crop", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Eliška N.", avatar: "E" }, { name: "Jakub K.", avatar: "J" }, { name: "Aneta V.", avatar: "A" }, { name: "Marek P.", avatar: "M" }, { name: "Sofie H.", avatar: "S" }, { name: "Adam R.", avatar: "A" }] },
  { id: "2", title: "Malý kmen - týdenní setkání", date: "2026-03-18", time: "15:00", duration: "2 hodiny", location: "Choltice", description: "Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.", type: "regular", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Jakub K.", avatar: "J" }, { name: "Aneta V.", avatar: "A" }, { name: "Sofie H.", avatar: "S" }] },
  { id: "3", title: "Velký kmen - týdenní setkání", date: "2026-03-20", time: "15:00", duration: "3 hodiny", location: "Choltice a okolí", description: "Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.", type: "regular", attendees: [{ name: "Eliška N.", avatar: "E" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Lucie D.", avatar: "L" }, { name: "Petr S.", avatar: "P" }] },
  { id: "4", title: "Stavba přístřešků", date: "2026-03-22", time: "14:00", duration: "3 hodiny", location: "Les u Choltic", description: "Naučíme se stavět primitivní úkryty v lese. Praktická lekce přežití.", type: "special", spotsLeft: 8, poster: "https://images.unsplash.com/photo-1445343512385-611c697e68dc?w=1200&h=675&fit=crop", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Jakub K.", avatar: "J" }] },
  { id: "5", title: "Malý kmen - týdenní setkání", date: "2026-03-25", time: "15:00", duration: "2 hodiny", location: "Choltice", description: "Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.", type: "regular", attendees: [{ name: "Tomáš N.", avatar: "T" }, { name: "Jakub K.", avatar: "J" }, { name: "Sofie H.", avatar: "S" }] },
  { id: "6", title: "Velký kmen - týdenní setkání", date: "2026-03-27", time: "15:00", duration: "3 hodiny", location: "Choltice a okolí", description: "Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.", type: "regular", attendees: [{ name: "Eliška N.", avatar: "E" }, { name: "Marek P.", avatar: "M" }, { name: "Lucie D.", avatar: "L" }] },
  { id: "7", title: "Stopování a orientace", date: "2026-03-29", time: "10:00", duration: "4 hodiny", location: "Okolí Choltic", description: "Praktické dovednosti v terénu - učíme se číst stopy a orientovat se v přírodě.", type: "special", spotsLeft: 3, poster: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=675&fit=crop", attendees: [{ name: "Eliška N.", avatar: "E" }, { name: "Tomáš N.", avatar: "T" }, { name: "Marek P.", avatar: "M" }, { name: "Adam R.", avatar: "A" }, { name: "Aneta V.", avatar: "A" }, { name: "Petr S.", avatar: "P" }, { name: "Lucie D.", avatar: "L" }, { name: "Jakub K.", avatar: "J" }, { name: "Sofie H.", avatar: "S" }] },
];

export function useEvents() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
        setEvents(defaultEvents);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((updated: CalEvent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEvents(updated);
  }, []);

  const addEvent = useCallback((event: Omit<CalEvent, "id">) => {
    const newEvent: CalEvent = { ...event, id: crypto.randomUUID() };
    const updated = [...events, newEvent];
    persist(updated);
    return newEvent;
  }, [events, persist]);

  const updateEvent = useCallback((id: string, updates: Partial<CalEvent>) => {
    persist(events.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, [events, persist]);

  const deleteEvent = useCallback((id: string) => {
    persist(events.filter((e) => e.id !== id));
  }, [events, persist]);

  return { events, isLoaded, addEvent, updateEvent, deleteEvent };
}
