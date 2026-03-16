# React Aviation Compass (Heading Indicator) 🧭

A high-precision, aviation-grade Heading Indicator (Compass) component built with **React**, **TypeScript**, and **SVG**. Designed for full-screen dashboards, HUDs, or telemetry interfaces.

## ✨ Features

* **Aviation-Grade UI:** Authentic design featuring a static dial, inward-pointing precision ticks (1°, 5°, 10°), a black central core, and a thin, dynamic red indicator needle.
* **Pixel-Perfect SVG:** Built entirely with scalable vector graphics to ensure absolute sharpness on any display or resolution.
* **Fully Responsive:** Utilizes CSS `vmin` and `aspect-ratio: 1/1` to perfectly adapt to wide, tall, or square screens without distortion.
* **Clean Architecture:** Strictly typed (TypeScript), componentized structure, with all magic numbers extracted to a dedicated `constants.ts` file.
* **Data-Ready Hook:** Decoupled data layer (`useCompassData`) with a built-in Mock mode for UI development, ready to be swapped with a real WebSocket or REST API integration.

## 🛠️ Tech Stack

* **React** (Functional Components, Hooks)
* **TypeScript** (Strict typing, Interfaces)
* **CSS3** (Flexbox, Responsive units, CSS Transforms)
* **SVG** (Mathematical rendering of dial and ticks)

## 📁 Project Structure

The component is broken down following Clean Code principles:

```text
src/
├── components/
│   ├── Compass/
│   │   ├── Compass.tsx          # Main container wrapping the UI and Hook
│   │   ├── components/          # Isolated functional components
│   │   │   ├── DialBackground.tsx
│   │   │   ├── TicksAndNumbers.tsx
│   │   │   ├── Needle.tsx
│   │   │   └── ReadoutBox.tsx
│   │   ├── hooks/               # Decoupled logic data feed
│   │   │   └── useCompassData.ts
│   │   ├── styles/              # Global CSS variables and structural rules
│   │   │   └── Compass.css
│   │   └── utils/               # Shared logic, math, and configuration
│   │       ├── constants.ts
│   │       ├── mathUtils.ts
│   │       └── types.ts