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

  it("hides the site navbar while a game is running", () => {
    useGameStore.setState({ gameMode: "multi", gameStarted: true });
    renderLayout();
    expect(screen.queryByRole("link", { name: "About" })).toBeNull();
  });
});
