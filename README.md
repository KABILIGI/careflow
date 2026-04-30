




# CareGuide — Living Patient Appointment Experience

> A mobile-first healthcare web application that guides patients through every step of their care journey — from recognizing symptoms to post-visit recovery — with a calm, accessible, and resilient interface.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Application Screens](#application-screens)
- [Design Principles](#design-principles)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Accessibility & Constraints](#accessibility--constraints)
- [Offline Capabilities](#offline-capabilities)
- [Screens Reference](#screens-reference)
- [Color System](#color-system)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CareGuide is a single-file, mobile-first healthcare product prototype that accompanies patients across their entire care journey. It is designed to feel like a **living system** — one that responds to actions, provides contextual guidance at every step, and reduces confusion for users who may be sick, stressed, or unfamiliar with digital tools.

The application is delivered as a single `index.html` file requiring no build process, no server, and no installation. It runs in any modern browser and degrades gracefully under low connectivity.

---

## Key Features

- **End-to-end care journey** covering all four phases: Symptoms → Booking → Navigation → Follow-Up
- **Symptom checker** with severity and duration assessment, producing a triage recommendation
- **Guided appointment booking** in four simple steps with doctor profiles and time slot selection
- **Step-by-step hospital navigation** with progress tracking and an offline-friendly map placeholder
- **Interactive follow-up checklist** with animated recovery progress ring and daily mood tracking
- **Emergency escalation** prominently accessible from the home screen at all times
- **Offline-ready design** — core flows work without a live connection; offline status is communicated clearly
- **Calming visual system** using a sage-and-teal palette with gentle breathing animations
- **Zero external dependencies at runtime** — fonts and React loaded via CDN, fully self-contained

---

## Application Screens

| # | Screen | Purpose |
|---|--------|---------|
| 1 | **Home** | Mood check-in, care journey overview, emergency shortcut |
| 2 | **Symptom Checker** | Guided symptom selection, severity rating, AI-style triage result |
| 3 | **Book Appointment** | Department → Doctor → Date/Time → Confirmation (4-step flow) |
| 4 | **Navigate Hospital** | Step-by-step arrival guide with offline map, progress trail |
| 5 | **Follow-Up Care** | Recovery checklist, medication reminders, progress tracking, mood log |

---

## Design Principles

### 1. Low Cognitive Load
Every screen presents one decision at a time. Users are never asked to process more than one task per view. Large tap targets, emoji cues, and short sentence labels reduce reading burden.

### 2. Calming Visual Language
The palette draws from natural greens and teals — colours associated with calm and trust in clinical environments. Animations breathe (not flash). Transitions are smooth and purposeful.

### 3. Progressive Disclosure
Information is revealed step by step. The symptom checker, booking flow, and navigation guide all use clearly numbered steps with visible progress indicators, so users always know where they are.

### 4. Resilience First
The interface is designed to work under stress — both the user's stress and network stress. Fallback states are graceful; offline functionality is signalled clearly rather than silently failing.

### 5. First-Time User Friendly
No jargon. No assumed familiarity with smartphone UIs. Visual affordances (chips, cards, step trails) mirror familiar physical interactions. The emergency call is always one tap away.

---

## Technical Stack

| Component | Technology |
|-----------|-----------|
| UI Framework | React 18 (via CDN, no build step) |
| Styling | Tailwind CSS (via CDN) + custom CSS variables |
| Transpilation | Babel Standalone (in-browser JSX) |
| Fonts | Google Fonts — Fraunces (display), DM Sans (body) |
| Icons | Inline SVG (no icon library dependency) |
| State Management | React `useState` / `useRef` (local component state) |
| Persistence | Session-scoped in-memory state |
| Deployment | Static file — no server required |

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No Node.js, npm, or build tools required

### Running the App

1. Download `index.html`
2. Open it directly in a browser:

```bash
# Option A — double-click the file in your file manager

# Option B — serve locally with Python
python3 -m http.server 8080
# then open http://localhost:8080/index.html

# Option C — serve locally with Node.js
npx serve .
# then open the URL shown in your terminal
```

That's it. The application is fully functional from a single file.

---

## Project Structure

```
index.html                  ← Complete application (single file)
README.md                   ← This document
```

### Internal code organisation (inside `index.html`)

```
index.html
├── <head>
│   ├── React + ReactDOM (CDN)
│   ├── Babel Standalone (CDN)
│   ├── Tailwind CSS (CDN)
│   ├── Google Fonts
│   └── <style> — CSS variables, animations, layout utilities
└── <body>
    └── <script type="text/babel">
        ├── Icon            — SVG icon renderer (24 icons)
        ├── StatusBar       — Mobile status bar component
        ├── BottomNav       — 5-tab navigation bar
        ├── ProgressBar     — Step progress indicator
        ├── HomeScreen      — Screen 1: Landing & mood check
        ├── SymptomsScreen  — Screen 2: Symptom checker & triage
        ├── BookScreen      — Screen 3: Appointment booking flow
        ├── NavigateScreen  — Screen 4: Hospital navigation guide
        ├── FollowUpScreen  — Screen 5: Recovery checklist
        └── App             — Root component, screen router
```

---

## Accessibility & Constraints

The application is designed with four non-negotiable constraints:

### Low Internet Connectivity
- No large assets (no images, no video, no external API calls)
- All icons are inline SVG — zero network requests after initial load
- CDN resources (~150 KB total) are the only external load
- Offline map placeholder with "Offline map saved" indicator
- Checklist state persists without any server sync

### First-Time Smartphone Users
- Every interactive element is a minimum of 44×44px (Apple HIG / WCAG 2.5.5)
- Emoji used alongside text labels to reduce language dependency
- Flow never branches unexpectedly — always forward or back
- No gestures required beyond tapping and vertical scrolling

### Users in Discomfort or Stress
- Maximum two choices visible at any time in critical flows
- Calming colour palette; no red except for emergency states
- Breathing animations (not spinning loaders) for wait states
- Symptom checker auto-suggests "General Practice" to reduce decision fatigue
- Confirmation screens recap all choices so users can verify without re-tracing

### Offline Functionality
- Symptom checker: fully offline (no external AI calls)
- Appointment booking: UI works offline; confirmation shown locally
- Navigation: step-by-step guide works offline; map shown as saved
- Follow-up checklist: fully offline-capable

---

## Offline Capabilities

| Feature | Online | Offline |
|---------|--------|---------|
| Symptom checker | ✅ Full | ✅ Full |
| Booking UI flow | ✅ Full | ✅ Full (no server sync) |
| Doctor availability | ✅ Full | ⚠️ Cached data shown |
| Hospital map | ✅ Live map | ✅ Saved map placeholder |
| Navigation steps | ✅ Full | ✅ Full |
| Follow-up checklist | ✅ Full | ✅ Full |
| Emergency call | ✅ Full | ✅ Full (device dialler) |

---

## Screens Reference

### Screen 1 — Home

The landing screen presents a personalised greeting based on the time of day, a mood selector (Well / Okay / Unwell / Sick) that routes directly to the symptom checker when a negative state is selected, the four-step care journey as tappable cards, an offline connectivity banner, and a persistent emergency call panel.

### Screen 2 — Symptom Checker

A three-phase guided flow. Phase 1: select from 10 common symptoms displayed as two-column chip cards with emoji. Phase 2: rate severity (Mild / Moderate / Severe). Phase 3: select symptom duration (Today / 2–3 days / 1 week / 2+ weeks). On completion, a triage result is displayed — Mild (monitor and rest), Moderate (see a doctor), or Urgent (seek care promptly, highlighted in red). The result screen includes a recap of selected symptoms and a direct CTA to book an appointment.

### Screen 3 — Book Appointment

A four-step booking wizard. Step 1: choose department from a 6-card grid, with a recommended department surfaced at the top based on symptom context. Step 2: choose a doctor from a list showing name, specialisation, rating, and next availability. Step 3: choose a date from a horizontal scroll and a time from a 3-column grid. Step 4: review and confirm — a summary card followed by a confirmation screen with booking details and a navigation CTA.

### Screen 4 — Navigate Hospital

A vertical step trail showing five navigation steps from hospital entrance to waiting area. Each step shows an icon, label, and expanded detail text when it is the current step. Steps are marked complete by tapping, turning green with a check mark. A map panel at the top shows the hospital location with distance and an offline-saved indicator.

### Screen 5 — Follow-Up Care

An animated SVG progress ring tracks completion percentage across all tasks. A daily mood selector (Poor / Okay / Good / Great) sits below the ring. Four checklist sections follow — Medication Reminders, Rest & Recovery, Monitor Symptoms, and Follow-Up Appointment — each with tappable items that animate to a checked state. A return-to-hospital warning panel at the bottom lists emergency symptoms.

---

## Color System

The palette uses CSS custom properties for consistent theming across all components.

| Variable | Hex | Usage |
|----------|-----|-------|
| `--sage` | `#5C8C6E` | Primary brand, active states, CTAs |
| `--sage-light` | `#A8C5B5` | Borders, secondary highlights |
| `--sage-pale` | `#EBF4EF` | Backgrounds, selected chip fills |
| `--teal` | `#3A7D8C` | Secondary accent (Cardiology, navigation) |
| `--teal-light` | `#B2D8DF` | Teal backgrounds |
| `--warm` | `#F5EFE6` | Warm neutral background |
| `--clay` | `#C97B5A` | Tertiary accent (Moderate triage, Orthopedics) |
| `--clay-light` | `#F2D5C4` | Clay backgrounds |
| `--charcoal` | `#2C3E35` | Primary text |
| `--mist` | `#F0F5F2` | Screen backgrounds |
| `--white` | `#FDFEFE` | Cards, surfaces |

Emergency / urgent states use Tailwind's `red-500` (#EF4444) and `red-100` (#FEE2E2), reserved exclusively for critical alerts.

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / headings | Fraunces | 600–700 | 22–26px |
| Body / UI labels | DM Sans | 400–700 | 11–15px |
| Status / meta | DM Sans | 400 | 10–12px |

---

## Animation Reference

| Name | Effect | Used for |
|------|--------|---------|
| `fadeUp` | Translate Y + opacity | Screen entry, card stagger |
| `fadeIn` | Opacity only | Step transitions |
| `pulse-ring` | Scale + box-shadow ring | Primary CTAs, booking confirm |
| `breathe` | Gentle scale | Result icons, map pin |
| `checkPop` | Spring scale | Checklist item completion |
| `dotBlink` | Opacity stagger | Loading states |
| `shimmer` | Background sweep | Skeleton loaders |

---

## Contributing

This is a prototype. To extend it:

1. **Adding a screen** — create a new `const XScreen = ({ onNav }) => { ... }` component, add it to the `screens` object in `App`, and add a tab to `BottomNav`.
2. **Connecting a real backend** — replace the mock doctor/slot data in `BookScreen` with `fetch()` calls; wrap in try/catch with offline fallback.
3. **Adding offline persistence** — replace `useState` in `FollowUpScreen` with `localStorage` reads/writes for checklist state to survive page refreshes.
4. **Localisation** — all visible strings are in JSX; extract to a `const strings = {}` object and swap based on locale.
5. **Converting to a PWA** — add a `manifest.json` and a service worker script to enable install-to-homescreen and full offline caching.

---

## License

This project is released for educational and prototyping purposes.  
© 2026 CareGuide Project. All rights reserved.

---

*Built with care for patients who need it most.*
