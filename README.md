# In Vino Veritas — Winery Landing Page

A cinematic winery landing page built with a **50s jazz noir** aesthetic. Rather than following the typical winery template of parchment textures and burgundy serif logos, this project reimagines wine culture through moody cinematic lighting, smoky gradients, and a sense of story.

## Concept

Most winery websites chase the same visual language: rustic heritage, clean luxury, traditional cues. This project takes a different angle — wine as a *mood*, a frame of mind, a narrative. The jazz noir aesthetic brings cinematic contrast and nostalgic atmosphere without resorting to predictable grape-and-barrel imagery.

## Features

- **Animated smoke hero** with interactive spotlight that follows the cursor (desktop)
- **Draggable wine card carousel** with flip animations revealing tasting notes
- **Cart system** with persistent state across the session
- **Scroll-aware navbar** that hides on scroll down and reappears on scroll up
- **Active section tracking** via intersection logic tied to scroll position
- **Responsive film-border layout** framing the entire page like a strip of 35mm film
- **Sections:** Hero → Wines → About → Visit Us → Contact → Footer

## Tech Stack

- React 19 + TypeScript
- Vite 7 with `vite-imagetools` for responsive image optimization (WebP srcsets)
- Tailwind CSS v4
- React Leaflet for the map in the Visit Us section

## Getting Started

```bash
cd vite-project
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
vite-project/src/
├── App.tsx               # Root layout, navbar, spotlight effect, scroll logic
├── WinesSection.tsx      # Draggable carousel with flip cards
├── WineCard.tsx          # Individual wine card with tasting notes
├── AboutSection.tsx      # Alternating image/text layout with scroll animations
├── VisitUsSection.tsx    # Map and visit info
├── ContactSection.tsx    # Contact form
├── CartContext.tsx       # Cart state via React context
├── CartModal.tsx         # Cart overlay
├── CartIcon.tsx          # Navbar cart icon with badge
├── SmokeBackground.tsx   # Animated smoke canvas effect
├── SVGComponent.tsx      # Hero wine glass SVG
├── CTAButton.tsx         # Reusable CTA button
├── App.css               # Global styles and film grain effect
├── effects.css           # Noir visual effects
└── index.css             # Base styles and font imports
```

## Author

Andriy Ponomarenko
