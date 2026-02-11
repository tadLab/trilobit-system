# Project: TRILOBIT Website

## Overview

This is a modern website for TRILOBIT, a tribe-inspired outdoor children's club located in Choltice and surrounding areas.

Target audience: Parents of children aged 6–12.

Primary goal:
Encourage parents to sign up their child for events or programs.

Secondary goal:
Allow club admins to manage events and content.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Mobile-first responsive design
- Clean, semantic HTML
- Accessible components (ARIA where needed)

---

## Design Principles

- Warm, modern, earthy aesthetic
- Rounded corners
- Large whitespace
- Subtle tribe-inspired motifs (minimal, not cliché)
- No cartoonish or western-style fonts
- Professional but friendly tone

---

## Brand Context

Location: Choltice and surrounding area  
Phone: 602 801 010  
Email: kmentrilobit@gmail.com  

Age range: 6–12 years

Core values:
- Respect
- Courage
- Teamwork
- Nature
- Real experiences

---

## Pages

### Public Pages
- Homepage
- Programy / Aktivity
- Kalendář akcí
- O nás
- Kontakt
- Přihlásit dítě

### Admin
- Login page
- Dashboard
- Add/Edit events
- Add/Edit programs

---

## Functional Requirements

### Sign-up Flow
- Parents submit a request form.
- No automatic payment.
- After submission, show confirmation message.
- Store form data for admin review.

### Calendar
- Full month view.
- Events clickable.
- Each event has:
  - title
  - date
  - location
  - age range
  - signup link

### Admin Area
- Protected route
- Login required
- Simple CRUD for events and programs

---

## Coding Standards

- Use reusable components.
- Keep components small and composable.
- Avoid inline styles.
- Use Tailwind utility classes.
- Maintain consistent spacing scale.
- Use proper semantic HTML (section, nav, main, footer).
- Optimize for performance and accessibility.

---

## UX Rules

- Always include primary CTA: "Přihlásit dítě"
- Reduce friction in forms.
- Keep content concise.
- Avoid long paragraphs.
- Use clear parent-friendly language.

---

## Do NOT

- Do not use overly decorative tribal fonts.
- Do not overcomplicate UI.
- Do not require parent accounts.
- Do not implement unnecessary animations.
