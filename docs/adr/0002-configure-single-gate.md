# Configure as a single gate

The Configure page is a single gate: a Mode plus its Mode-specific options plus a Session length, then Start routes directly to `/play` via `createRun()`. There is no post-Configure interstitial, confirm-and-launch page, or separate "begin run" step. The earlier design explored a two-step flow ("Configure → interstitial → /play") but it was never fully shipped — only the wire-up was partial — and the in-product friction of the extra step was disproportionate to what it asked the user to confirm (one Mode + one length).

## Status

Accepted 2026-08-26. Implemented in P1-05 (#73, PR #96).

## Considered Options

- **Single gate (chosen)**: one screen, one Start button, one route transition. Matches what a solo learner actually does: pick a thing, play it.
- **Two-step wizard**: rejected — the second step was a confirm dialog over a one-row summary, which is what a single Start button is.
- **Two-screen Configure**: rejected — splits Mode selection from length selection across routes, adds a back button and a learnable flow for a two-field form.
- **Multi-step with optional interstitial**: rejected — the optional case is the same as single-gate in code paths, so the complexity buys nothing.

## Consequences

- **Route shape is fixed**: `/configure` is the only pre-run surface; `/play` follows directly. Any future "review your run" surface would be a new ADR.
- **Mode-specific options live on the same screen**: Hangman Difficulty only renders when Hangman is the selected Mode (P1-07, #75). This is the precedent for "options on the same page, conditionally rendered," not a separate step.
- **The Zustand `atomologyStore` is the source of truth for Mode + length at Start time**; the per-Mode components consume it, not their own local state.
- **Inbox finding "Session Length buttons are not directly wired up" is a pre-ADR observation, not a regression** — see commit `a6cb57a` for the wiring P1-05 landed.
