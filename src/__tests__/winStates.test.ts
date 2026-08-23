import { useGameStore } from "../store/atomologyStore";

describe("session win states", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      gameMode: "multi",
      gameStarted: true,
      sessionLength: "q10",
      score: 0,
      questionsAnswered: 0,
      correctCount: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastRun: null,
    });
  });

  it("records attempts and tracks streaks", () => {
    const s = useGameStore.getState();
    s.recordAnswer(true);
    s.recordAnswer(true);
    s.recordAnswer(false);
    s.recordAnswer(true);

    const after = useGameStore.getState();
    expect(after.questionsAnswered).toBe(4);
    expect(after.correctCount).toBe(3);
    expect(after.currentStreak).toBe(1);
    expect(after.bestStreak).toBe(2);
  });

  it("auto-finishes a finite session at its limit with a summary", () => {
    const s = useGameStore.getState();
    for (let i = 0; i < 10; i++) s.recordAnswer(i < 8); // 8/10 correct

    const after = useGameStore.getState();
    expect(after.questionsAnswered).toBe(10);
    expect(after.lastRun).not.toBeNull();
    expect(after.lastRun?.mode).toBe("multi");
    expect(after.lastRun?.length).toBe("q10");
    expect(after.lastRun?.answered).toBe(10);
    expect(after.lastRun?.correct).toBe(8);
    expect(after.lastRun?.endedBy).toBe("completed");
    expect(after.gameStarted).toBe(false);
  });

  it("endless sessions never auto-finish", () => {
    useGameStore.setState({ sessionLength: "endless" });
    const s = useGameStore.getState();
    for (let i = 0; i < 30; i++) s.recordAnswer(true);

    expect(useGameStore.getState().lastRun).toBeNull();
    expect(useGameStore.getState().gameStarted).toBe(true);
  });

  it("finishRun ends an endless run on demand", () => {
    useGameStore.setState({ sessionLength: "endless", score: 7 });
    useGameStore.getState().recordAnswer(true);
    useGameStore.getState().finishRun("finished");

    const lastRun = useGameStore.getState().lastRun;
    expect(lastRun?.endedBy).toBe("finished");
    expect(lastRun?.score).toBe(7);
    expect(useGameStore.getState().gameStarted).toBe(false);
  });
});
