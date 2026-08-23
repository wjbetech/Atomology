# Atomology

A periodic-table learning game. Learn all 118 elements through three game modes:

- **Multiple Choice** — pick the element matching the symbol shown, with four options
- **Open Answer** — type the element name yourself
- **Hangman** — guess element names letter by letter at three difficulty levels

Correct answers never repeat until every element has been shown (rounds draw from a
shuffled queue), progress is tracked on a periodic-table HUD, and your session resumes
where you left off after a refresh.

## Tech stack

- React 18 + Vite 5 + TypeScript (strict)
- Zustand for state management
- Tailwind CSS + daisyUI (light/dark themes)
- Framer Motion for animations
- Jest + React Testing Library

## Getting started

This repo uses **pnpm** as its package manager.

```bash
pnpm install
pnpm run dev      # start the dev server
```

## Scripts

| Script                    | What it does                                  |
| ------------------------- | --------------------------------------------- |
| `pnpm run dev`            | Vite dev server                               |
| `pnpm run build`          | Production build (content-hashed assets)      |
| `pnpm run preview`        | Preview the production build locally          |
| `pnpm run lint`           | ESLint across JS/JSX/TS/TSX                   |
| `pnpm run typecheck`      | `tsc --noEmit` strict type check              |
| `pnpm test`               | Jest test suite                               |
| `pnpm run generate-favicons` | Regenerate PNG favicons from the SVGs in `public/` |

## Testing

Tests live next to the code in `src/__tests__/` and cover game logic (round
generation, session persistence, answer normalisation) as well as key components.
Run them with `npm test`.

## Leaderboard setup (optional)

The global leaderboard is a Vercel Serverless Function backed by a free
Neon Postgres database. The game works fully without it — the Results page
simply shows local personal bests.

1. In the Vercel dashboard: **Project → Storage → Marketplace → Neon →
   provision the free tier**.
2. Copy the connection string (`DATABASE_URL`) from the Neon integration.
3. Set it as an environment variable `DATABASE_URL` (Production +
   Preview) and redeploy.
4. Create the table once — paste `api/schema.sql` into the Neon SQL editor.

Endpoints: `POST /api/scores` submits a run; `GET /api/scores/top?mode=&length=`
returns the top 10. Submissions are sanity-checked server-side (nickname
rules, score ceilings per session length); Endless runs are unranked by design.

## CI

Every push and PR runs: **typecheck → lint → build → tests**
(`.github/workflows/ci.yml`).

## Project layout

```
src/
├── components/        # UI, grouped by feature (pages/, hangman/, layout/, sub-components/)
├── data/              # elements.json dataset + typed accessors
├── hooks/             # shared React hooks
├── store/             # Zustand stores (game state, UI state)
├── utils/             # pure helpers (audio, shuffle, difficulty pools, …)
└── __tests__/         # Jest suites
```

## Gameplay internals worth knowing

- Round generation lives in the game store (`generateNextRound`): each cycle shuffles
  all 118 element names, pops one per round as the correct answer, and reshuffles when
  exhausted — so you see every element before any repeats.
- Session state (score, current round, HUD progress, round queue) persists to
  `localStorage` under `atomology.session`; theme/sound/HUD preferences use separate keys.
