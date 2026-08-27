import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useGameStore } from "../store/atomologyStore";

function renderLayout() {
  return render(
    <MemoryRouter>
      <Layout>
        <div>content</div>
      </Layout>
    </MemoryRouter>
  );
}

describe("Layout navbar visibility", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({ gameMode: "multi", gameStarted: false });
  });

  it("shows the site navbar with nav links on the landing screen", () => {
    renderLayout();
    expect(screen.getByRole("link", { name: "About" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Contact" })).toBeTruthy();
  });

  it("shows the theme toggle in the navbar on non-game screens", () => {
    renderLayout();
    expect(screen.getByLabelText("Toggle theme")).toBeTruthy();
  });

  it("hides the site navbar while a game is running", () => {
    useGameStore.setState({ gameMode: "multi", gameStarted: true });
    renderLayout();
    expect(screen.queryByRole("link", { name: "About" })).toBeNull();
  });

  it("shows the mode title while a multiple-choice game is running", () => {
    useGameStore.setState({ gameMode: "multi", gameStarted: true });
    renderLayout();
    expect(screen.getByText("Multiple Choice")).toBeTruthy();
  });

  it("shows the mode title while an open-answer game is running", () => {
    useGameStore.setState({ gameMode: "open", gameStarted: true });
    renderLayout();
    expect(screen.getByText("Open Answer")).toBeTruthy();
  });

  it("shows level and lives while playing hangman", () => {
    useGameStore.setState({
      gameMode: "hangman",
      gameStarted: true,
      hangmanDifficulty: "easy10",
      hangmanIndex: 0,
      hangmanIncorrectGuesses: 0,
    });
    renderLayout();
    expect(screen.getByText("LEVEL:")).toBeTruthy();
    expect(screen.getByText("LIVES:")).toBeTruthy();
    expect(screen.getByText("1/10")).toBeTruthy();
  });
});
