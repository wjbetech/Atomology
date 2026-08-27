# Daylight Lab warm-paper light theme

The light theme (Daylight Lab) uses warm-paper tokens (cream/beige paper, brass ink) for daylight-lab readability, relaxing the DESIGN.md ban on cream+serif+terracotta that exists to keep Spectral Dark from drifting into the generic AI look. Spectral Dark remains cool (blue-black surfaces, multi-hue semantic accents) — the relaxation permits warm-paper; it does not authorise a future warm dark variant. Single source of truth for the Daylight Lab palette and contrast posture; P3-07 and P3-08 verify both themes against this contract.

## Status

Accepted 2026-08-26. Supersedes the `DESIGN.md` "Banned" sentence that read as theme-agnostic; DESIGN.md "Daylight Lab" section is the implementation source.

## Considered Options

- **Cool light grey**: AA-readable, on-brand, but lacks the daylight-lab feel the brief calls for.
- **Neutral white + cool ink**: safe contrast, no identity. Rejected for the same reason the dark flagship isn't a single-accent-on-black.
- **Warm-paper (chosen)**: matches the brief; contrast achieved by darkening accents ~15% on light.
- **No light theme**: rejected — the app ships with a theme toggle and a sun/moon switch is a hard product expectation.

## Consequences

- **DESIGN.md amendment required**: the "Banned" clause must be relaxed to "banned on Spectral Dark" rather than theme-agnostic, and the Daylight Lab section must point at this ADR as the single source of truth.
- **Token names are shared** between themes; only hexes invert on `data-theme`. The daisyUI preset name (`cupcake`) is an implementation detail, not a domain term — see `CONTEXT.md`.
- **Phase 3 contrast matrix (P3-07, P3-08)** is the verification surface. Bar: AA for all token pairs, AAA for primary text (`specimen` on `paper` is already ≥16:1, recorded in `DESIGN.md`).
- Any future warm dark variant is a new ADR, not a quiet code change.
