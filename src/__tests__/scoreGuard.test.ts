import {
  maxScoreFor,
  validateScoreSubmission,
} from "../utils/scoreGuard";

const valid = {
  nickname: "Neon Wolf",
  mode: "multi",
  length: "q10",
  score: 8,
  answered: 10,
  correct: 8,
};

describe("validateScoreSubmission", () => {
  it("accepts a clean submission and normalises the nickname", () => {
    const r = validateScoreSubmission({ ...valid, nickname: "  Neon Wolf  " });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.clean.nickname).toBe("Neon Wolf");
  });

  it("rejects bad nicknames", () => {
    for (const nickname of ["ab", "this is way too long!!", "", "bad<script>"]) {
      const r = validateScoreSubmission({ ...valid, nickname });
      expect(r.ok).toBe(false);
    }
  });

  it("rejects unknown modes and unranked lengths", () => {
    expect(validateScoreSubmission({ ...valid, mode: "hangman" }).ok).toBe(false);
    expect(validateScoreSubmission({ ...valid, length: "endless" }).ok).toBe(false);
  });

  it("rejects impossible attempt counts and scores", () => {
    expect(validateScoreSubmission({ ...valid, answered: 11 }).ok).toBe(false); // over q10 limit
    expect(validateScoreSubmission({ ...valid, correct: 11 }).ok).toBe(false); // > answered
    expect(
      validateScoreSubmission({ ...valid, score: 999 }).ok
    ).toBe(false); // impossible score
    expect(validateScoreSubmission({ ...valid, answered: 0 }).ok).toBe(false);
  });

  it("caps scores at the theoretical maximum per length", () => {
    expect(maxScoreFor("q10")).toBe(10);
    expect(maxScoreFor("cycle")).toBe(118);
    expect(maxScoreFor("endless")).toBe(-1); // unranked sentinel
  });
});
