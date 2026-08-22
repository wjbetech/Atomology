import { useGameStore } from "../store/atomologyStore";
import canonicalElements from "../data/elements";

describe("generateNextRound", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      gameStarted: true,
      answerQueue: [],
      elements: [],
      answer: null,
      answerElementName: "",
    });
  });

  it("produces four options and picks one as the answer", () => {
    useGameStore.getState().generateNextRound();

    const s = useGameStore.getState();
    expect(s.elements).toHaveLength(4);
    expect(s.answer).toBeTruthy();
    expect(s.answerElementName).toBe(s.answer?.name);
    expect(s.elements.map((e) => e.name)).toContain(s.answer?.name);
  });

  it("never offers the correct answer as its own distractor twice", () => {
    for (let i = 0; i < 50; i++) {
      useGameStore.getState().generateNextRound();
      const { elements, answer } = useGameStore.getState();
      const correctCount = elements.filter((e) => e.name === answer?.name);
      expect(correctCount).toHaveLength(1);
      const uniqueNames = new Set(elements.map((e) => e.name));
      expect(uniqueNames.size).toBe(4);
    }
  });

  it("does not repeat a correct answer before all 118 are shown", () => {
    const seen = new Set<string>();
    const total = canonicalElements.length;
    expect(total).toBe(118);

    for (let i = 0; i < total; i++) {
      useGameStore.getState().generateNextRound();
      const a = useGameStore.getState().answer;
      expect(a).toBeTruthy();
      if (a) {
        expect(seen.has(a.name)).toBe(false);
        seen.add(a.name);
      }
    }

    expect(seen.size).toBe(118);
  });

  it("refills the queue after exhaustion so play continues", () => {
    for (let i = 0; i < 118; i++) {
      useGameStore.getState().generateNextRound();
    }
    // every element has been shown; the cycle is exhausted
    expect(useGameStore.getState().answerQueue).toHaveLength(0);

    // next cycle begins with a fresh pool minus the new answer
    useGameStore.getState().generateNextRound();
    const a = useGameStore.getState().answer;
    expect(a).toBeTruthy();
    expect(useGameStore.getState().answerQueue).toHaveLength(117);
  });

  it("normalises phase to lowercase on generated options", () => {
    useGameStore.getState().generateNextRound();
    const { elements } = useGameStore.getState();
    for (const el of elements) {
      expect(el.phase).toBe(el.phase.toLowerCase());
    }
  });
});
