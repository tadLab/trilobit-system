"use client";

import { useState, useEffect, useCallback } from "react";

export interface Friend {
  id: string;
  name: string;
  avatar: string; // single letter
  tribe: string;
}

const STORAGE_PREFIX = "trilobit_friends_";

/**
 * Per-user friends CRUD hook.
 * Stored per user email: trilobit_friends_dite@trilobit.cz
 */
export function useFriends(userEmail: string) {
  const storageKey = STORAGE_PREFIX + userEmail;
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setFriends(JSON.parse(stored));
      } catch {
        const seed = getSeedData(userEmail);
        localStorage.setItem(storageKey, JSON.stringify(seed));
        setFriends(seed);
      }
    } else {
      const seed = getSeedData(userEmail);
      localStorage.setItem(storageKey, JSON.stringify(seed));
      setFriends(seed);
    }
    setIsLoaded(true);
  }, [storageKey, userEmail]);

  const persist = useCallback(
    (updated: Friend[]) => {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setFriends(updated);
    },
    [storageKey],
  );

  const addFriend = useCallback(
    (friend: Omit<Friend, "id">) => {
      const newFriend: Friend = { ...friend, id: crypto.randomUUID() };
      persist([...friends, newFriend]);
      return newFriend;
    },
    [friends, persist],
  );

  const removeFriend = useCallback(
    (id: string) => {
      persist(friends.filter((f) => f.id !== id));
    },
    [friends, persist],
  );

  return { friends, isLoaded, addFriend, removeFriend };
}

/** Seed data for the demo teen account */
function getSeedData(email: string): Friend[] {
  if (email === "dite@trilobit.cz") {
    return [
      { id: "f-1", name: "Jakub K.", avatar: "J", tribe: "Velký kmen" },
      { id: "f-2", name: "Aneta V.", avatar: "A", tribe: "Velký kmen" },
      { id: "f-3", name: "Marek P.", avatar: "M", tribe: "Velký kmen" },
      { id: "f-4", name: "Sofie H.", avatar: "S", tribe: "Malý kmen" },
      { id: "f-5", name: "Adam R.", avatar: "A", tribe: "Velký kmen" },
      { id: "f-6", name: "Lucie D.", avatar: "L", tribe: "Malý kmen" },
    ];
  }
  return [];
}
