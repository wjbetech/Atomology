# Atomology

A periodic-table learning game built with React + Vite + TypeScript + Tailwind/daisyUI + Zustand.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`wjbetech/Atomology`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/` (created lazily by `/domain-modeling`). See `docs/agents/domain.md`.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (note: currently only covers `.js/.jsx`)
- `npm test` — Jest
