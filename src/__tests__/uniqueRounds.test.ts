import { act } from "react";
import { useGameStore, ElementType } from "../store/atomologyStore";
import canonicalElements from "../data/elements";

describe("118 unique rounds in multiple choice", () => {
  beforeEach(() => {
    localStorage.clear();
    const normalized: ElementType[] = (canonicalElements as any[])
      .filter((e) => typeof e?.number === "number" && e.number <= 118)
      .map((data: any) => ({
        atomicMass: data.atomic_mass,
        category: data.category,
        density: data.density,
        discoveredBy: data.discovered_by,
        melt: data.melt,
        name: data.name,
        number: data.number,
        period: data.period,
        phase: (data.phase || data.phase?.toLowerCase() || "") as string,
        symbol: data.symbol,
      }));

    useGameStore.setState({
      elements: [],
      fullElements: normalized,
      remainingAnswers: undefined,
      answer: null,
      answerElementName: null,
      gameStarted: true,
    } as any);
  });

  it("does not repeat a correct answer before all 118 are shown", async () => {
    const seen = new Set<string>();
    const pool = (useGameStore.getState() as any).fullElements || [];
    expect(pool.length).toBe(118);

    act(() => {
      const reset = (useGameStore.getState() as any).resetAnswerQueue;
      if (typeof reset === "function") reset();
    });

    for (let i = 0; i < 118; i++) {
      await act(async () => {
        const gen = (useGameStore.getState() as any).generateNextRound;
        if (typeof gen === "function") await gen();
      });
      const a = useGameStore.getState().answer;
      expect(a).toBeTruthy();
      if (a) {
        expect(seen.has(a.name)).toBe(false);
        seen.add(a.name);
      }
    }

    expect(seen.size).toBe(118);
  });
});
