# 1-hour last-config persistence

The user's previous Run's Mode, Session length, lives setting, and `educationalMode` are persisted as a single record to `localStorage` under `atomology:lastConfig` with a `savedAt` timestamp, and restored on Configure page mount if the record is fresher than 1 hour; otherwise the page mounts with documented defaults. This makes "I came back to the tab an hour later" feel continuous without making "I came back tomorrow" feel like a stale config is haunting the form.

## Status

Accepted 2026-08-26. Implemented in P1-06 (#74, PR #97).

## Considered Options

- **1-hour TTL on a single record (chosen)**: matches "remember last game mode" while not trapping a user in a session they finished a day ago.
- **No TTL**: the values stick forever. Surprising after a week, and confuses "the last thing I played" with "the thing I usually play."
- **`sessionStorage`**: dies with the tab, so refresh-during-config would not restore. The brief was "I came back to the tab," not "I refreshed."
- **Per-field TTLs**: rejected — the four fields move together (a Run is all four or none) and per-field expiry is just complexity in service of a non-use-case.
- **Longer TTL (day/week)**: rejected — the use case is "I closed the tab and came back within an hour," not "I play this once a week."

## Consequences

- **One localStorage key**, not four. The four fields are conceptually one record (a Run's configuration); splitting them invites drift.
- **TTL check happens on Configure page mount only.** Other surfaces (HUD, Results) do not consult `atomology:lastConfig` — that key is the *form's* memory, not the *running game's*. A separate key (`atomology.session`) holds in-flight game state and is the only key the rest of the app reads.
- **Defaults are the documented defaults** (e.g., Mode = Multiple Choice, Session length = q10, lives = 3, educationalMode = false). The defaults live in `atomologyStore` and are the single source of truth.
- **TTL is wall-clock UTC ms**, not a relative-from-mount. A user who left the tab open overnight sees defaults on next mount; a user who has the tab in the foreground but does not navigate to Configure does not see anything change.
- **`savedAt` is the only timestamp**; the four fields are not individually versioned. Migrations (e.g., a renamed session length) bump the record's shape, not the timestamp.
