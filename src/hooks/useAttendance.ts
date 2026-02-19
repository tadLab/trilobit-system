"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_PREFIX = "trilobit_attendance_";

/**
 * Per-user event attendance tracker.
 * Stores a Set of event IDs the user is attending.
 * Stored per user email: trilobit_attendance_dite@trilobit.cz
 */
export function useAttendance(userEmail: string) {
  const storageKey = STORAGE_PREFIX + userEmail;
  const [attending, setAttending] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const arr: string[] = JSON.parse(stored);
        setAttending(new Set(arr));
      } catch {
        setAttending(new Set());
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  const persist = useCallback(
    (updated: Set<string>) => {
      localStorage.setItem(storageKey, JSON.stringify([...updated]));
      setAttending(new Set(updated));
    },
    [storageKey],
  );

  const toggleAttendance = useCallback(
    (eventId: string) => {
      const next = new Set(attending);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      persist(next);
      return next.has(eventId);
    },
    [attending, persist],
  );

  const isAttending = useCallback(
    (eventId: string) => attending.has(eventId),
    [attending],
  );

  return { attending, isLoaded, toggleAttendance, isAttending };
}
