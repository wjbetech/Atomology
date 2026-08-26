# Atomology

A single-player periodic-table learning game with three game modes
(Multiple Choice, Open Answer, Hangman) on a unified session model.
Spectroscopic identity, no auth, no multiplayer.

## Language

**Mode**:
A game-mode choice on the Configure page: `multiple-choice` (pick the
element matching a shown symbol/number), `open-answer` (type the
element name), or `hangman` (guess letter by letter).
_Avoid_: game, game-type, mode-of-play.

**Difficulty**:
A Hangman-only setting that controls the element pool: `easy` (Z=1–38),
`medium` (Z=1–82), `hard` (Z=1–118). Defaults to `medium`. Hidden on
the Configure page until Hangman is the selected Mode.
_Avoid_: level (conflicts with session level), pool.

**Session length**:
A run-level option that bounds the number of questions in a single
play session: `q10`, `q25`, `cycle` (one full pass over 118 elements),
or `endless` (no upper bound, unranked on the global leaderboard).
_Avoid_: length, run-length, game-length.

**Run**:
One play session from Start to a win state (length capped) or exit.
Has a Mode, a Session length, an optional `lives` setting (arcade
lives mode, fast-follow), and an `educationalMode` boolean that
unlocks the per-element info page after each question.
_Avoid_: game, session (used for the localStorage session key —
internal, not user-facing), match.

**Configure**:
The settings page (`/configure`). A single gate: user picks Mode
plus any Mode-specific options (Difficulty, lives) plus Session
length, then Start routes directly to `/play`. There is no
post-Configure interstitial.
_Avoid_: setup, settings, pre-game.

**Play**:
The game-running route (`/play`). Hosts whichever Mode the current
Run uses. End of run routes to Results.
_Avoid_: game, match.

**Results**:
The end-of-run page. Shows run stats, local personal bests, and
the global leaderboard (Neon-backed) where eligible.

**Specimen**:
The visual identity of an element on screen — its category-accent
emission line, its display number, and the cards it inhabits.
In the design language it is also a CSS class (`text-specimen`,
`bg-bench`) and a token role (the warm near-black text colour in
Daylight Lab).
_Avoid_: tile, card (the broader component), chip.

**Emission line**:
The signature visual motif: thin discrete coloured streaks (real
spectrum barcode) used as progress bars, card top strips, dividers,
and focus rings. Each element's accent hue is sourced from its
flame/discharge colour (see `DESIGN.md` Category → Accent mapping).
_Avoid_: streak, line, spectrum-bar (use the design name).

**Daylight Lab**:
The warm-paper light theme (Q7 B, 2026-08-25). Token names are
shared with Spectral Dark; only hex values invert on `data-theme`.
The prior ban on cream/serif/terracotta in `DESIGN.md` still
applies to Spectral Dark — the ban is overridden for this theme
only.
_Avoid_: light theme, paper theme, cupcake (daisyUI's underlying
preset — implementation detail, not domain).

**Spectral Dark**:
The dark flagship theme. Blue-black surfaces (`void`/`bench`/
`slide`) with multi-hue semantic accents (`sodium`/`copper`/
`strontium`/`argon`/`calcium`) and Atkinson Hyperlegible / Michroma
/ IBM Plex Mono.
_Avoid_: dark theme, night (daisyUI preset name — implementation
detail).

**Last config**:
The user's previous Run's Mode + Session length + lives +
educationalMode, persisted to `localStorage` under
`atomology:lastConfig` with a `~1hr TTL` timestamp. Restored on
mount of the Configure page when fresh; discarded after the TTL.
_Avoid_: remember, prefs, recent.
