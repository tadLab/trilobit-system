"use client";

import { useState, useEffect, useCallback } from "react";
import type { Achievement } from "@/types/data";

const STORAGE_KEY = "trilobit_achievements";

/**
 * Global achievements CRUD hook.
 * Leaders award achievements to children; children/parents can view them.
 */
export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAchievements(JSON.parse(stored));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        setAchievements([]);
      }
    } else {
      // Seed with some demo achievements
      const seed = getDefaultAchievements();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      setAchievements(seed);
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((updated: Achievement[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setAchievements(updated);
  }, []);

  const addAchievement = useCallback(
    (achievement: Omit<Achievement, "id">) => {
      const newAch: Achievement = { ...achievement, id: crypto.randomUUID() };
      persist([...achievements, newAch]);
      return newAch;
    },
    [achievements, persist],
  );

  const removeAchievement = useCallback(
    (id: string) => {
      persist(achievements.filter((a) => a.id !== id));
    },
    [achievements, persist],
  );

  const getForChild = useCallback(
    (childId: string) => achievements.filter((a) => a.childId === childId),
    [achievements],
  );

  return { achievements, isLoaded, addAchievement, removeAchievement, getForChild };
}

function getDefaultAchievements(): Achievement[] {
  return [
    { id: "ach-1", childId: "child-1", childName: "Tomáš Novák", name: "Ohňař", icon: "🔥", description: "Rozdělal oheň bez zápalek", awardedBy: "Marek Procházka", awardedAt: "2025-11-15" },
    { id: "ach-2", childId: "child-1", childName: "Tomáš Novák", name: "Navigátor", icon: "🧭", description: "Vedl skupinu podle mapy", awardedBy: "Jan Novotný", awardedAt: "2025-12-03" },
    { id: "ach-3", childId: "child-2", childName: "Eliška Nováková", name: "Zálesák", icon: "🌲", description: "Přenocovala 5× v přírodě", awardedBy: "Marek Procházka", awardedAt: "2026-01-20" },
    { id: "ach-4", childId: "child-2", childName: "Eliška Nováková", name: "Kuchař", icon: "🍳", description: "Uvařila jídlo pro celý kmen", awardedBy: "Tereza Králová", awardedAt: "2026-02-05" },
  ];
}
