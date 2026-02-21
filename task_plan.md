# Task Plan: Daily AI News Aggregator

Building a premium, high-performance Daily AI News aggregator with Next.js 16 and Tailwind CSS v4.

## Phase 1: Initialization & Environment Setup

- [x] Initialize Next.js 16 project using `pnpm create next-app@latest`.
- [x] Configure Tailwind CSS v4.2+ with the new `@import "tailwindcss";` syntax.
- [x] Set up directory structure with `src/` directory and modular component separation.
- [x] Install dependencies: `lucide-react`, `framer-motion`, `vaul`, `clsx`, `tailwind-merge`.
- [ ] Initialize Shadcn/UI primitives.

## Phase 2: Data Acquisition

- [x] Use Browser Agent to scrape/fetch real-time AI news from:
  - OpenAI Blog (Attempted, failed due to connection reset, used other sources)
  - TechCrunch AI
  - The Verge AI
- [x] Generate a `news.json` mock database with real titles, summaries, dates, and categories.

## Phase 3: Design System & Core UI

- [x] Define the "Midnight & Slate" color palette and typography (Inter/Outfit) in CSS.
- [x] Implement Glassmorphism utility classes.
- [x] Create core layout components (Navbar, Footer with Newsletter Opt-in).
- [x] Build the "Bento Grid" component with Framer Motion hover effects.

## Phase 4: Features Implementation

- [x] **News List**: Render news cards from `news.json` in the Bento Grid.
- [x] **Search & Filter**: Real-time filtering logic for keywords and categories (LLM, Robotics, etc.).
- [x] **Detail View**: Implement a slide-over Drawer using `Vaul` for reading full news snippets.
- [x] **Newsletter**: Glassmorphic signup form with micro-interactions.

## Phase 5: Verification & Polish

- [x] Use Browser Agent to verify UI rendering and responsiveness.
- [x] Capture screenshots of the final layout.
- [x] Final code audit for type safety and modularity.

## Constraints & Rules

- **No Placeholders**: All content must be real or realistic AI news.
- **Tailwind v4**: Must use the latest logical properties and syntax.
- **Terminal Optimization**: Keep `src/` clean for Neovim/Telescope.
