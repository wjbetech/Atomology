import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ConfigurePage from "../components/pages/ConfigurePage";
import { useGameStore, useUIStore } from "../store/atomologyStore";

describe("ConfigurePage", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      gameMode: "",
      gameStarted: false,
      sessionLength: "q25",
    });
    useUIStore.setState({ educationalMode: false });
  });

  function renderPage() {
    return render(
      <MemoryRouter initialEntries={["/configure"]}>
        <ConfigurePage />
      </MemoryRouter>
    );
  }

  it("introduces all three modes and session lengths", () => {
    renderPage();

    expect(screen.getByText("Multiple Choice")).toBeTruthy();
    expect(screen.getByText("Open Answer")).toBeTruthy();
    expect(screen.getByText("Hangman")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "10 questions" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Endless" })).toBeTruthy();
  });

  it("disables Start until a mode is chosen", () => {
    renderPage();

    const start = screen.getByRole("button", {
      name: /Choose a mode to start/i,
    }) as HTMLButtonElement;
    expect(start.disabled).toBe(true);
  });

  it("starts a configured run with the picked settings", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /Multiple Choice/i }));
    await user.click(screen.getByRole("radio", { name: "10 questions" }));
    await user.click(screen.getByRole("button", { name: "Start!" }));

    const s = useGameStore.getState();
    expect(s.gameStarted).toBe(true);
    expect(s.gameMode).toBe("multi");
    expect(s.sessionLength).toBe("q10");
  });

  it("persists the educational mode preference", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(
      screen.getByRole("checkbox", { name: "Educational mode" })
    );
    expect(useUIStore.getState().educationalMode).toBe(true);
  });
});
