# Atomology Design Language — "Spectral Dark"

> Every element has its own light.

Committed design language for the Atomology redesign. Produced via the
`frontend-design` skill; all UI tickets (#40–#52) must derive their visual
decisions from this document and may not introduce colours or typefaces
outside it without amending this file first.

---

## Grounding

Atomology teaches the periodic table through play. The subject's own world —
excited atoms emitting discrete wavelengths of light, flame tests, darkened
labs, specimen labels — is the source of every choice below. The signature
insight: **each element literally has a colour** (its emission/flame-test
hue), so colour in this app encodes information rather than decorating it.

- **Audience:** curious solo learners first; teacher-presentable always.
- **Feeling:** a lab at night where specimens glow — precise, luminous,
  quietly playful. Texture lives in components (tactile cards, squishy
  presses, light that responds); never in mascots or clutter.
- **Banned:** purple/violet in any shade. Also banned: the generic AI looks —
  cream+serif+terracotta, black-with-one-acid-accent, broadsheet hairlines.
  *Exception (2026-08-25, Q7 B):* warm-paper **is** used for **Daylight Lab light only** (see below); the ban still applies to dark flagship.

## Palette

### Surfaces & ink (dark flagship)

| Token        | Hex       | Role                                    |
| ------------ | --------- | --------------------------------------- |
| `void`       | `#060A12` | Page background (blue-black, not grey)  |
| `bench`      | `#0D1522` | Card / surface                          |
| `slide`      | `#131E30` | Raised surface, hover, inputs           |
| `hairline`   | `#1F2C42` | Borders, grid lines                     |
| `specimen`   | `#E9F1FA` | Primary text ("the specimen lit")       |
| `annotation` | `#8FA3BC` | Secondary text, captions, unit labels   |

### Spectral accents (semantic, multi-hue on purpose)

Real emission spectra are multi-coloured — that physics justifies departing
from the single-accent-on-black default. Accents are assigned by element
category so hue carries meaning:

| Token       | Hex       | Flame/discharge source            | Semantic role              |
| ----------- | --------- | --------------------------------- | -------------------------- |
| `sodium`    | `#FFCB47` | Sodium D-line (gold)              | Primary action, highlight  |
| `copper`    | `#35D99A` | Copper flame (emerald)            | Success / correct          |
| `strontium` | `#FF5470` | Strontium flame (crimson)         | Error / wrong / danger     |
| `argon`     | `#45C4FF` | Discharge-tube cyan               | Links, info, focus ring    |
| `calcium`   | `#FF8A5C` | Calcium flame (orange)            | Streaks, milestones, warn  |

### Category → accent mapping

| Category                  | Accent     |
| ------------------------- | ---------- |
| Alkali metal              | strontium  |
| Alkaline earth metal      | calcium    |
| Transition metal          | argon      |
| Post-transition metal     | copper     |
| Metalloid                 | sodium     |
| Diatomic nonmetal         | copper     |
| Halogen                   | sodium     |
| Noble gas                 | argon      |
| Lanthanide                | calcium    |
| Actinide                  | strontium  |
| Unknown                   | annotation |

### Daylight Lab (warm-paper light counterpart) — *Q7 B override 2026-08-25*

> QA audit (inbox 25/08/2026, Q7 B) chose **warm-paper** for light theme
> despite the prior ban on `cream+serif+terracotta` for Spectral Dark.
> The ban **still applies to dark flagship**; light is intentionally
> warm-paper for daylight-lab readability. This is the single source of
> truth for all light-theme QA (P3-07/08).

Warm paper evokes sunlit lab benches and specimen cards, not generic AI
cream. Tokens are named the same as dark but their hexes invert:

| Token        | Hex       | Role (light)                          | Contrast note |
| ------------ | --------- | ------------------------------------- | ------------- |
| `paper`      | `#FDF6EC` | Page background (warm paper)          | — |
| `bench`      | `#F3E8D3` | Card / surface on paper               | `bench` vs `paper` ≥1.2:1, vs `ink` ≥12:1 |
| `slide`      | `#E9DDC5` | Raised surface, hover, inputs         | — |
| `hairline`   | `#DCCEB8` | Borders, grid lines                   | `hairline` vs `paper` ≥1.5:1, vs `ink` ≥9:1 |
| `specimen`   | `#1C1917` | Primary text (warm near-black)        | `specimen` vs `paper` ≥16:1 (AAA) |
| `annotation` | `#7A6E5D` | Secondary text, captions              | `annotation` vs `paper` ≥6.2:1 (AA) |
| `ink`        | `#1C1917` | Alias for `specimen` on light         | — |

Accents are the same hues darkened ~15% for contrast on warm-paper:

| Token       | Light hex | Dark hex | Use on light |
| ----------- | --------- | -------- | ------------ |
| `sodium`    | `#E6B43F` | `#FFCB47` | Primary action (unchanged hue, darker value) |
| `copper`    | `#2FAE7A` | `#35D99A` | Success |
| `strontium` | `#E64C62` | `#FF5470` | Error |
| `argon`     | `#3AA8D8` | `#45C4FF` | Links, focus |
| `calcium`   | `#E67A3A` | `#FF8A5C` | Warn |

Light implementation: `data-theme="cupcake"` (or `light`) maps to these
tokens via CSS variables (`--paper`, `--bench`, etc.) and `bg-paper`
`text-ink` utilities. Dark remains `data-theme="night"` with `void` etc.
Both themes share the same accent hue names; only the light hexes are
swapped in via the theme. See `P1-03`, `P3-07`, `P3-08`.

## Typography

Three roles, loaded only when the application pass consumes them:

| Role               | Face                  | Weights   | Use                                            |
| ------------------ | --------------------- | --------- | ---------------------------------------------- |
| Display / specimen | **Michroma**          | 400       | Element symbols, big numerals, page titles     |
| Body               | **Atkinson Hyperlegible** | 400/700 | All prose; chosen for low-vision readability (education story) |
| Data / utility     | **IBM Plex Mono**     | 400/500   | Atomic masses, configs, eyebrows, labels       |

Type scale (desktop → mobile): display `clamp(2rem, 6vw, 4.5rem)` · h2 `1.5rem`
· body `1rem` · caption/mono-label `0.75rem` uppercase, letter-spacing `0.12em`.

Michroma is used with restraint: if text is not an element symbol, a numeral,
or a title being treated as a specimen label, it is not Michroma.

## Texture & depth rules

1. Cards sit on `bench` with a 1px `hairline` border at 60% opacity and an
   inner top-edge **emission strip** (see Signature).
2. Corner ticks: measurement-mark details on primary cards (CSS pseudo-
   elements), like a photographed specimen slide frame.
3. Glow is earned: outer shadows are tinted by the card's accent at ≤25%
   alpha, and appear on interaction or achievement — never as ambient decor.
4. Rounded geometry everywhere: radius tokens `sm 8px / md 14px / lg 22px /
   pill 999px`.
5. Backgrounds may carry a barely-visible grid of `hairline` verticals spaced
   on the 8px rhythm, evoking a spectrum readout scale.

## Signature: the emission-line motif

Thin discrete light streaks with gaps — a real spectrum barcode. It appears
as:

- **Progress:** session progress renders as spectrum lines filling left to
  right (not a plain bar).
- **Card edge:** the 2px top strip of key cards, coloured by the element's
  category accent.
- **Dividers:** short line-triplets between content sections.
- **Focus rings:** 2px argon-cyan offset ring drawn as paired lines.

This motif is the memorable element of the identity; when in doubt about a
decorative decision, reach for it instead of inventing new ornament.

## Motion personality

- **Staggered line-draw reveals** — spectral strips animate in sequence on
  page load (80ms stagger).
- **Spring squish** — buttons/cards compress ~3% with a spring on press
  (framer-motion springs, stiffness ~400 / damping ~17).
- **Photon burst** — celebrations emit particles in the element's accent hue;
  replaces generic confetti during the application pass.
- Score/count numerals tick up with a mono-font roll.
- **All motion collapses under `prefers-reduced-motion: reduce`** to instant
  states; celebration becomes a static glow.

## Counterfactual check (skill requirement)

Tested against the three AI-default looks: not warm-cream+serif+terracotta
(dark, cool, multi-hue); not single-acid-accent-on-black (multi-hue semantic
palette justified by emission physics); not broadsheet (rounded, glowing,
textured). The category→colour mapping and emission-line motif would not be
produced for a brief about anything other than chemistry.

## Application notes

- Tokens land inertly (#38); Michroma loads with the Home hero (#40) — the
  display face is part of that page's identity. Atkinson Hyperlegible and
  IBM Plex Mono load during the application pass (#47), so no bytes are
  spent on unused assets before then.
