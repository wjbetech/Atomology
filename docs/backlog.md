# Deferred Backlog

> Pre-Phase-1 idea pool, captured 2024–2025. Most items here are explicitly
> out of scope for the current roadmap ("advertise-ready shell", no infra
> scope creep — see `ROADMAP.md` non-goals). Kept as a parking lot so
> ideas aren't lost; not a near-term work queue.

## Status legend

- **[done]** — shipped.
- **[deferred-future-epic]** — out of scope for the current roadmap; revisit
  as its own epic.
- **[deferred-small]** — still small and high-value, but a separate work
  item (not part of the QA audit).

---

## Already in production (referenced for context)

- **#38, #40, #47, #42, #43, #44, #45, #46, #48, #49, #50, #51, #52** — the
  Spectral Dark design language, Home hero, Play route, Configure page,
  session-length win states, Results page, local personal bests,
  educational mode + element info, element video slot, Neon leaderboard
  API, leaderboard UI, arcade lives mode (fast-follow).
- **CI** — `.github/workflows/ci.yml` runs typecheck + lint + build + tests
  on every push and PR to `master`. [done]

## Deferred — future epic each

These are real ideas, but each is its own product, not a UI polish item:

- **Multiplayer & social features** — async/real-time multiplayer,
  friends leaderboards, social sharing. (Partially done via the global
  leaderboard #50/#51; remainder is a separate product line.)
- **Custom game modes** — timed mode, sudden death, customisable
  settings/hints. The current roadmap's non-goal is "no new game modes
  in this roadmap" — these are the candidates when that ban is lifted.
- **Daily/weekly challenges + streaks** — needs auth + server-side
  scheduling; not a UI feature.
- **User profiles & cloud sync** — Firebase/Auth0 or similar; same
  infra-first problem as error reporting
  (`.out-of-scope/error-reporting.md`).
- **Localization / i18n** — worth doing but not for the current launch.
- **Rich element data & encyclopedia** — a real product extension
  (clicking an element opens a deep page). Educational mode (#48) is
  the seed.
- **Partnerships & classroom leaderboards** — sales/distribution, not
  engineering.
- **In-game tutorials & onboarding** — UX, real work, but not on the
  advertise-ready-shell critical path.
- **Accessibility & device support** — partially done (Atkinson
  Hyperlegible, keyboard nav in modals, `prefers-reduced-motion`). A
  full WCAG audit is a separate engagement.

## Deferred — small but separate items

These four from the prior "small, high-value" list are still worth doing
when the QA audit ships; not in the current 23-ticket roadmap:

1. **E2E smoke test** (Playwright or Cypress) for Multiple Choice.
   *(medium priority)* One stable smoke test that exercises Start →
   Configure → answer → Score / Return / HUD update.
2. **Accessibility audit** with axe-core on the three game pages, fixing
   any high-severity findings. *(medium priority)*
3. **CI** — done. See `.github/workflows/ci.yml`. (Was item 3 on the
   original list; remove from future considerations.)
4. **Sitemap + robots.txt** in `public/`. *(low priority)*

## Responsiveness & layout (specific work item)

The "Responsiveness & Layout" section from the prior file is concrete
enough to be its own epic. High-level: audit 320/375/412/768/1024/1366/
1440/1920+, replace `100vh` with `100dvh`, add `overflow-x: hidden`,
ensure modals don't clip, verify touch targets ≥ 44px, add visual
regression screenshots in CI. Not on the current roadmap.

## Pre-roadmap housekeeping (stale)

The `CI_PIPELINE.md` file (npm-based, no typecheck, no test job) was
deleted 2026-08-26 — superseded by `.github/workflows/ci.yml` and the
README's Scripts table.
