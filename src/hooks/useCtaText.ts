"use client";

import { useState, useEffect } from "react";

/**
 * Returns the appropriate CTA button text based on the logged-in user's role.
 *
 * - Not logged in / Parent → "Přihlásit dítě" (parents signing up their child)
 * - Teen / Admin → "Přihlásit se" (signing up themselves)
 *
 * Uses useEffect to read localStorage (avoids SSR hydration mismatch).
 */
export function useCtaText() {
  const [ctaText, setCtaText] = useState("Přihlásit dítě");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trilobit_user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user.role === "teen" || user.role === "admin") {
          setCtaText("Přihlásit se");
        }
      }
    } catch {
      // Invalid JSON or no localStorage — keep default
    }
  }, []);

  return ctaText;
}

/**
 * Same logic but for the longer CTA variant used in FinalCTA.
 * - Parent/default → "Přihlásit dítě na první akci"
 * - Teen/Admin → "Přihlásit se na první akci"
 */
export function useCtaTextLong() {
  const [ctaText, setCtaText] = useState("Přihlásit dítě na první akci");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trilobit_user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user.role === "teen" || user.role === "admin") {
          setCtaText("Přihlásit se na první akci");
        }
      }
    } catch {
      // keep default
    }
  }, []);

  return ctaText;
}
