"use client";

import { useState, useEffect, useCallback } from "react";
import type { Child } from "@/types/data";

const STORAGE_PREFIX = "trilobit_children_";

/**
 * Per-user children CRUD hook.
 * Data is stored per parent email: trilobit_children_rodic@trilobit.cz
 * Demo parent seeds two children on first load.
 */
export function useChildren(userEmail: string) {
  const storageKey = STORAGE_PREFIX + userEmail;
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setChildren(JSON.parse(stored));
      } catch {
        const seed = getSeedData(userEmail);
        localStorage.setItem(storageKey, JSON.stringify(seed));
        setChildren(seed);
      }
    } else {
      const seed = getSeedData(userEmail);
      localStorage.setItem(storageKey, JSON.stringify(seed));
      setChildren(seed);
    }
    setIsLoaded(true);
  }, [storageKey, userEmail]);

  const persist = useCallback(
    (updated: Child[]) => {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setChildren(updated);
    },
    [storageKey],
  );

  const addChild = useCallback(
    (child: Omit<Child, "id">) => {
      const newChild: Child = { ...child, id: crypto.randomUUID() };
      const updated = [...children, newChild];
      persist(updated);
      return newChild;
    },
    [children, persist],
  );

  const updateChild = useCallback(
    (id: string, updates: Partial<Child>) => {
      persist(children.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    },
    [children, persist],
  );

  const deleteChild = useCallback(
    (id: string) => {
      persist(children.filter((c) => c.id !== id));
    },
    [children, persist],
  );

  return { children, isLoaded, addChild, updateChild, deleteChild };
}

/** Seed data for the demo parent account */
function getSeedData(email: string): Child[] {
  if (email === "rodic@trilobit.cz") {
    return [
      {
        id: "child-1",
        name: "Tomáš Novák",
        age: 8,
        programId: "prog-1",
        programName: "Malý kmen",
        since: "Září 2025",
        avatar: "T",
        note: "Alergický na ořechy. Rád staví přístřešky a leze po skalách.",
      },
      {
        id: "child-2",
        name: "Eliška Nováková",
        age: 11,
        programId: "prog-2",
        programName: "Velký kmen",
        since: "Leden 2026",
        avatar: "E",
        note: "Zkušená tábornice. Pomáhá mladším dětem.",
      },
    ];
  }
  return [];
}
