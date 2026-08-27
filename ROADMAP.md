# Atomology Roadmap — QA Audit → Shippable (25/08/2026)

> Source: `.scratch/inbox.md` (25/08/2026 QA audit, 21 findings + 1 split = 23 tickets).  
> Each ticket = its own branch + PR (`feat/*` or `fix/*` → `dev` → `master` is production).  
> Thoroughness principle (your words): *“Very thorough, not get everything done as fast as possible. Shippable, usable app I can advertise.”*  
> Every UI ticket must derive from `DESIGN.md` and may not introduce colours/type outside it without amending it first.

**Grill decisions locked:**
- Q1 A: Keep both themes, full WCAG AA contrast pass
- Q2 A: Restore **exact** old spinning atom `src/assets/atoms.svg` (spin 18s linear, `prefers-reduced-motion` still)
- Q3: Single-gate Configure — `mode + length` directly `createRun() → /play`, delete the post-configure interstitial
- Q4: Persist **all** session config (`mode + length + lives + educationalMode`) for **~1hr TTL** in `localStorage` (`atomology:lastConfig` + timestamp, expiry check on mount)
- Q5 A: Hangman no-load is P0 bug
- Q6 B: 3 thorough phases, each deployable
- Q7 B: White theme becomes **warm-paper** (`cream/beige + brass`) — overrides the current `DESIGN.md` ban; `DESIGN.md` Daylight Lab tokens must be redefined first
- Q8 A: Remove SPECTRUM blobs/barcode at Home top, replace with spinning atom
- Q9–Q12: Follow recommendations (slim borders, remove symbols, enlarge numbers, etc., counters fun + gamey)
- Q13: 3 phases, each task own branch/PR
- Q14 B: White theme split — **tokens first**, then QA passes

---

## Phase 1 — Foundations (P0/P1, deployable baseline)

*Goal: No broken flows. Every game can be started and finished. Light theme not blocked, just not yet QA’d beyond tokens.*

| # | Title | Source inbox | Type | Branch | Depends |
|---|-------|--------------|------|--------|---------|
| **P1-01** | Fix: Hangman element does not load | Hangman: “Currently the element does not load” | bug | `fix/hangman-element-load` | — |
| **P1-02** | Education page: add Back + Exit buttons | Multiple Choice: “no Back or Exit on education page” | enhancement | `feat/education-back-exit` | — |
| **P1-03** | DESIGN.md: define warm-paper Daylight Lab tokens | General: white theme garish (Q7 B, Q14 B-1) | enhancement | `feat/design-warm-paper-tokens` | — |
| **P1-04** | Home: restore spinning atom, remove blobs/SPECTRUM | Home: “replace colored blobs with old spinning atom” + Q8 A | enhancement | `feat/home-atom-hero` | — |
| **P1-05** | Configure → Play single-gate, remove extra page | Configure: “Session Length buttons not wired, remove page” (Q3) | enhancement | `feat/configure-single-gate` | — |
| **P1-06** | Persist last session config for ~1hr | Configure: “remember last game mode” + Q4 (all, 1hr) | enhancement | `feat/persist-last-config` | P1-05 |
| **P1-07** | Hangman: conditional difficulty row on Configure, delete difficulty select | Hangman: “Drop select difficulty page” + Q11 | enhancement | `feat/hangman-difficulty-on-configure` | P1-05 |

**Phase 1 exit criteria:**
- [ ] Hangman loads an element on Start and can be played to completion
- [ ] Education interstitial shows Back (continue) + Exit (to `/configure` with confirm) and does not trap the user
- [ ] `DESIGN.md` Daylight Lab section redefined to warm-paper (tokens named, hex, roles, contrast notes)
- [ ] Home shows spinning `atoms.svg` (centered, 18s spin, respects `prefers-reduced-motion`), no SPECTRUM blobs
- [ ] Configure Start goes straight to `/play` (no interstitial), Session Length `q10/q25/cycle/endless` wired to `atomologyStore.sessionLength` and consumed by win states
- [ ] Reloading `/configure` within 1hr restores last `mode+length+lives+educationalMode`; after 1hr it resets to defaults
- [ ] No `HangmanDifficultySelect` route/file remains; Hangman difficulty (Easy/Med/Hard → pools 1–38/1–82/1–118) appears only when Hangman is selected, defaults Medium

---

## Phase 2 — Configure & Home Polish (P1, deployable, advertise-ready shell)

*Goal: Home and Configure feel intentional, not janky. The shell you’d screenshot for social.*

| # | Title | Source inbox | Type | Branch | Depends |
|---|-------|--------------|------|--------|---------|
| **P2-01** | Home: remove text directly above Atomology title | Home: “Get rid of text above Atomology title” | enhancement | `feat/home-remove-eyebrow` | P1-04 |
| **P2-02** | Home: slim “Every element has its own light” | Home: “too bold, slim it down” | enhancement | `feat/home-slim-tagline` | P1-04 |
| **P2-03** | Home: fix Play! / Instructions button text alignment | Home: “texts don’t feel aligned” | enhancement | `feat/home-button-alignment` | — |
| **P2-04** | Home: Play! button light/dark contrast QA, remove shadow | Home: “Play! needs thorough QA, remove shadow” | enhancement | `feat/home-play-button-contrast` | P1-03 |
| **P2-05** | Home: remove floating element names background | Home: “Remove background image with element names” | enhancement | `feat/home-remove-floating-tiles` | P1-04 |
| **P2-06** | Configure: increase navbar/content margins (top+bottom) | Configure: “more margin/padding between navbar and content” | enhancement | `fix/configure-margins` | — |
| **P2-07** | Configure: slim simple borders for mode cards (remove janky glow) | Configure: “border effects janky, slim simple” | enhancement | `fix/configure-card-borders` | — |
| **P2-08** | Configure: remove element names (Ar/Au/He) from mode cards | Configure: “element names confusing, remove” | enhancement | `fix/configure-remove-symbols` | — |

**Phase 2 exit criteria:**
- [ ] Home eyebrow (`Element 001–118 · Learn by play`) removed
- [ ] Tagline `Every element has its own light` is `font-light`/`font-normal`, `text-specimen/80`, `tracking-wide`, not `font-bold`
- [ ] Play!/Instructions buttons have `min-h-12`, `items-center`, `leading-none`, text optically centered (no 1px drift), no `shadow-[0_0_28px]`
- [ ] Drift tiles (`H/He/Li/Ca/Fe/Cl`) removed (or gated behind a flag, but inbox says remove)
- [ ] Configure `py-14 → py-10 md:py-16` plus `mt` under navbar, consistent bottom padding; no content hugging navbar
- [ ] Mode cards have `1px hairline` only, active = `border-accent` + `bg-accent/5`, no 3px strip, no glow
- [ ] Mode cards show only `name + pitch + win`, no symbols

---

## Phase 3 — Game Feel & Theming QA (P2 polish, shippable you can advertise)

*Goal: Game pages feel correct, counters feel fun+gamey, white theme is actually usable.*

| # | Title | Source inbox | Type | Branch | Depends |
|---|-------|--------------|------|--------|---------|
| **P3-01** | Multiple Choice: enlarge element number | Multiple Choice: “element number too small” | enhancement | `feat/mc-enlarge-number` | — |
| **P3-02** | Multiple Choice: fix element card border effect (same slim) | Multiple Choice: “janky border on element cards” | enhancement | `fix/mc-card-borders` | P2-07 |
| **P3-03** | Multiple Choice: fix game mode title font | Multiple Choice: “title font fixing” | enhancement | `fix/mc-title-font` | — |
| **P3-04** | Education page: bump text size | Multiple Choice: “texts a bit too small” | enhancement | `fix/education-text-size` | P1-02 |
| **P3-05** | Hangman: redesign Return to Main Menu modal (modern, contrast) | Hangman: “Re-design Return to Main Menu? modal” | enhancement | `feat/hangman-exit-modal` | P1-03 |
| **P3-06** | All Game Modes: redesign level/lives counters (sleek, fun+gamey) | All Game Modes: “level and lives counters” + Q12 | enhancement | `feat/counters-redesign` | — |
| **P3-07** | Theming QA: white warm-paper — Home (contrast matrix) | General: white theme garish (Q14 B-2) | enhancement | `fix/theming-qa-home` | P1-03 |
| **P3-08** | Theming QA: white warm-paper — Configure/Game/Play (contrast) | General: white theme garish (Q14 B-3) | enhancement | `fix/theming-qa-game` | P1-03, P3-07 |

**Phase 3 exit criteria:**
- [ ] MC element number is `text-3xl md:text-4xl font-display text-specimen` with `annotation` label, not `text-sm`
- [ ] MC element cards use same slim `1px hairline` system
- [ ] MC title uses `font-display tracking-wide` (not `font-bold` fallback), optically aligned
- [ ] Education page body is `text-base leading-relaxed max-w-[65ch]`, not `text-sm`
- [ ] Hangman exit modal is centered `bg-bench border-hairline backdrop-blur`, `Cancel` ghost + `Exit` `bg-strontium text-white`, WCAG AA, `focus-trap` + `esc`
- [ ] Counters are fun+gamey but integrated: top spectral progress + `font-mono text-xs` `Lv 3 · 7/25 · ♥♥♡` (or equivalent), not floating boxes
- [ ] White warm-paper contrast matrix passes: every `bg-*`/`text-*` pair checked, Play! button `bg-sodium text-void` flat in both themes, no white-on-white

---

## Handoff to coding agent

Each row above = **one GitHub issue** with `ready-for-agent` (already triaged), `enhancement` or `bug`, and a `phase:1`/`phase:2`/`phase:3` label.  
Branch per issue, PR to `dev`, then `dev → master` (production) when phase is green.  
Inbox file `.scratch/inbox.md` is ticked off after issues are created.

**Non-goals (explicit):**
- No new game modes in this roadmap
- No leaderboard or SEO work (separate epics)
- No deletion of dark theme

**References:** `DESIGN.md` (Spectral Dark + new Daylight Lab warm-paper), `src/components/pages/HomePage.tsx`, `ConfigurePage.tsx`, `MultipleChoice.tsx`, `HangmanGame.tsx`, `atomologyStore.ts` (`sessionLength`, `educationalMode`), `.scratch/inbox.md`.
