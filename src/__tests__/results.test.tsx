import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResultsPage from "../components/pages/ResultsPage";
import { useGameStore } from "../store/atomologyStore";

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/results"]}>
      <ResultsPage />
    </MemoryRouter>
  );
}

describe("ResultsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({ lastRun: null });
    jest.restoreAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("shows an inviting empty state when no run has finished", () => {
    renderPage();

    expect(screen.getByText("NO RUN YET")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Start one now" })
    ).toBeTruthy();
  });

  it("renders accurate stats for a finished run", () => {
    useGameStore.setState({
      lastRun: {
        mode: "multi",
        length: "q10",
        score: 8,
        answered: 10,
        correct: 8,
        bestStreak: 5,
        endedBy: "completed",
      },
    });

    renderPage();

    expect(screen.getByText("RUN COMPLETE")).toBeTruthy();
    expect(screen.getByText("8")).toBeTruthy();
    expect(screen.getByText("80%")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText(/Multiple Choice · 10 questions/)).toBeTruthy();
    expect(screen.queryByText(/Flawless/i)).toBeNull();
  });

  it("calls out a flawless run", () => {
    useGameStore.setState({
      lastRun: {
        mode: "open",
        length: "q25",
        score: 25,
        answered: 25,
        correct: 25,
        bestStreak: 25,
        endedBy: "completed",
      },
    });

    renderPage();

    expect(screen.getByText(/Flawless — every single answer correct!/i)).toBeTruthy();
    expect(screen.getByText("100%")).toBeTruthy();
  });

  it("badges NEW BEST on beaten categories only", () => {
    // establish prior bests: score 8, accuracy 80%, streak 5
    useGameStore.setState({
      lastRun: {
        mode: "multi",
        length: "q10",
        score: 8,
        answered: 10,
        correct: 8,
        bestStreak: 5,
        endedBy: "completed",
      },
    });
    const first = renderPage();
    expect(screen.getAllByText("New best")).toHaveLength(3);
    first.unmount();

    // new run beats streak only
    useGameStore.setState({
      lastRun: {
        mode: "multi",
        length: "q10",
        score: 6,
        answered: 10,
        correct: 6,
        bestStreak: 9,
        endedBy: "completed",
      },
    });
    renderPage();
    expect(screen.getAllByText("New best")).toHaveLength(1);
  });

  it("offers Play again and Home exits", () => {
    useGameStore.setState({
      lastRun: {
        mode: "multi",
        length: "q10",
        score: 3,
        answered: 10,
        correct: 3,
        bestStreak: 2,
        endedBy: "finished",
      },
    });

    renderPage();

    expect(screen.getByRole("link", { name: "Play again" }).getAttribute("href")).toBe("/configure");
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByText(/Session ended on your call/i)).toBeTruthy();
  });
});
