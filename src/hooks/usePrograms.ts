"use client";

import { useState, useEffect, useCallback } from "react";
import type { Program } from "@/types/data";

const STORAGE_KEY = "trilobit_programs";

/* Seed data — migrated from programy/page.tsx (added id field) */
const defaultPrograms: Program[] = [
  {
    id: "prog-1",
    name: "Malý kmen", age: "6–8 let", type: "Pravidelné", season: "Celý rok",
    description: "Vaše dítě získá první zkušenosti v přírodě, kamarády a radost z pohybu venku.",
    location: "Choltice", frequency: "Každý týden", duration: "2 hodiny",
    whatKidsDo: ["Hry a aktivity v přírodě", "Základní outdoorové dovednosti", "Týmová spolupráce a kamarádství"],
    forParents: ["Sraz vždy v centru Choltic", "Dítě potřebuje outdoorové oblečení + láhev na pití"],
    detail: {
      schedule: "Každou středu 15:00–17:00",
      leader: "Vedoucí: Marek Procházka, Jan Novotný",
      maxKids: 15,
      price: "300 Kč / měsíc (členství bez závazků)",
      whatToBring: ["Outdoorové oblečení dle počasí", "Nepromokavá bunda a pevná obuv", "Láhev s pitím a malá svačina", "Batůžek na osobní věci"],
      typicalDay: "Sraz v centru Choltic → společná hra na zahřátí → hlavní aktivita (hledání stop, stavění, pozorování přírody) → reflexe a rozloučení.",
      goals: ["Rozvoj pohybových dovedností a koordinace", "Učení se spolupracovat v týmu", "Poznávání přírody hravou formou", "Budování sebedůvěry a samostatnosti"],
    },
  },
  {
    id: "prog-2",
    name: "Velký kmen", age: "9–12 let", type: "Pravidelné", season: "Celý rok",
    description: "Pokročilejší aktivity, samostatnost a výzvy. Dítě posílí sebedůvěru a získá praktické dovednosti.",
    location: "Choltice a okolí", frequency: "Každý týden", duration: "3 hodiny",
    whatKidsDo: ["Orientace v terénu a stopování", "Stavba přístřešků a táborová řemesla", "Náročnější výpravy a expedice"],
    forParents: ["Děti jsou pod dohledem zkušených vedoucích", "Fotky z akcí posíláme rodičům"],
    detail: {
      schedule: "Každý pátek 15:00–18:00",
      leader: "Vedoucí: Marek Procházka, Tereza Králová",
      maxKids: 20,
      price: "400 Kč / měsíc (členství bez závazků)",
      whatToBring: ["Pevná outdoorová obuv (kotníková doporučena)", "Oblečení do přírody dle počasí", "Láhev s pitím a svačina", "Nůž s pojistkou (od 10 let, se souhlasem rodičů)"],
      typicalDay: "Sraz v Cholticích → přesun do terénu → hlavní program (navigace, řemesla, expedice) → společné hodnocení dne a plánování.",
      goals: ["Praktické outdoorové dovednosti (oheň, úkryt, navigace)", "Rozvoj samostatnosti a zodpovědnosti", "Kritické myšlení a rozhodování", "Fyzická zdatnost a odolnost"],
    },
  },
  {
    id: "prog-3",
    name: "Víkendové výpravy", age: "6–12 let", type: "Výpravy", season: "Jaro/Léto/Podzim",
    description: "Celodenní dobrodružství v přírodě. Dítě pozná nová místa a zažije skutečnou expedici.",
    location: "Region Pardubicka", frequency: "1× měsíčně", duration: "Celý den",
    whatKidsDo: ["Túry do zajímavých přírodních lokalit", "Poznávání přírody a historie", "Táborové ohně a společné aktivity"],
    forParents: ["Svačina a oběd zajištěn", "Doprava zajištěna z Choltic"],
    detail: {
      schedule: "1× měsíčně, sobota 8:00–18:00 (dle akce)",
      leader: "Vedoucí: celý tým Trilobit (3–4 vedoucí na akci)",
      maxKids: 25,
      price: "250–500 Kč / výprava (dle lokality a dopravy)",
      whatToBring: ["Batoh s pláštěnkou a náhradním oblečením", "Pevná obuv na túru", "Láhev s pitím (min. 0,75 l)", "Kapesné není potřeba"],
      typicalDay: "Odjezd z Choltic → příjezd na lokalitu → dopolední program a poznávání → oběd v přírodě → odpolední aktivity → návrat do Choltic.",
      goals: ["Poznání zajímavých míst v regionu", "Vytrvalost a fyzická zdatnost", "Propojení starších a mladších dětí", "Zážitky mimo běžnou komfortní zónu"],
    },
  },
  {
    id: "prog-4",
    name: "Letní tábor", age: "6–12 let", type: "Speciální akce", season: "Léto",
    description: "Týdenní pobyt v přírodě plný her, výzev a nezapomenutelných zážitků.",
    location: "Tábořiště v okolí Choltic", frequency: "Červenec/Srpen", duration: "5–7 dní",
    whatKidsDo: ["Stanování a táborový život", "Velké hry a dobrodružné úkoly", "Nové kamarádství a týmový duch"],
    forParents: ["Kapacita omezena na 30 dětí", "Registrace od března"],
    detail: {
      schedule: "Červenec / Srpen, 5–7 dní (přesné termíny upřesníme)",
      leader: "Vedoucí: celý tým Trilobit + externí instruktoři",
      maxKids: 30,
      price: "3 500 Kč / pobyt (strava a program v ceně)",
      whatToBring: ["Spacák a karimatka", "Oblečení na celý týden (+ náhradní)", "Osobní hygiena a léky (pokud užívá)", "Stan zajišťuje Trilobit"],
      typicalDay: "Budíček → ranní rozcvička → snídaně → dopolední etapová hra → oběd → odpočinek → odpolední řemesla / výprava → večeře → táborový oheň / noční hra.",
      goals: ["Zažít skutečný táborový život bez technologií", "Posílit samostatnost (starat se o sebe i ostatní)", "Vytvořit silné kamarádství a vzpomínky", "Zvládnout výzvy a překonat sám sebe"],
    },
  },
];

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPrograms(JSON.parse(stored));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrograms));
        setPrograms(defaultPrograms);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrograms));
      setPrograms(defaultPrograms);
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((updated: Program[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPrograms(updated);
  }, []);

  const addProgram = useCallback((program: Omit<Program, "id">) => {
    const newProgram: Program = { ...program, id: crypto.randomUUID() };
    const updated = [...programs, newProgram];
    persist(updated);
    return newProgram;
  }, [programs, persist]);

  const updateProgram = useCallback((id: string, updates: Partial<Program>) => {
    persist(programs.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, [programs, persist]);

  const deleteProgram = useCallback((id: string) => {
    persist(programs.filter((p) => p.id !== id));
  }, [programs, persist]);

  return { programs, isLoaded, addProgram, updateProgram, deleteProgram };
}
