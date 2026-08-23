-- Atomology leaderboard schema (Neon Postgres free tier)
-- Run once against DATABASE_URL, or paste into the Neon SQL editor.

CREATE TABLE IF NOT EXISTS scores (
  id         BIGSERIAL PRIMARY KEY,
  nickname   TEXT        NOT NULL,
  mode       TEXT        NOT NULL CHECK (mode IN ('multi', 'open')),
  length     TEXT        NOT NULL CHECK (length IN ('q10', 'q25', 'cycle')),
  score      INT         NOT NULL,
  answered   INT         NOT NULL,
  correct    INT         NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS scores_board_idx
  ON scores (mode, length, score DESC, created_at ASC);
