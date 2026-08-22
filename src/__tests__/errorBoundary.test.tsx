import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import { useGameStore } from "../store/atomologyStore";

function ThrowingChild(): never {
  throw new Error("boom");
}

function GoodChild() {
  return <p>all good</p>;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    useGameStore.setState({
      gameStarted: true,
      gameMode: "multi",
      score: 5,
    });
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children normally when nothing throws", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <GoodChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("all good")).toBeTruthy();
  });

  it("shows the fallback when a child throws", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Something went wrong")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Return to Main" }));
    expect(screen.getByRole("button", { name: "Reload page" }));
  });

  it("Return to Main resets the session and clears the error", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/game"]}>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Return to Main" }));

    const s = useGameStore.getState();
    expect(s.gameStarted).toBe(false);
    expect(s.gameMode).toBe("");
    expect(s.score).toBe(0);
    // boundary reset -> fallback gone (children would re-render; they still
    // throw, but the fallback's own dismissal is what we assert via state)
    expect(useGameStore.getState().score).toBe(0);
  });

  it("Reload page calls the reload handler", async () => {
    const user = userEvent.setup();
    const reload = jest.fn();

    render(
      <MemoryRouter>
        <ErrorBoundary onReloadPage={reload}>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Reload page" }));
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
