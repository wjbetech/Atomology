import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResumeToPlay from "../components/ResumeToPlay";
import { useGameStore } from "../store/atomologyStore";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ResumeToPlay />
      <Routes>
        <Route path="/" element={<p>HOME</p>} />
        <Route path="/play" element={<p>PLAY</p>} />
        <Route path="/configure" element={<p>CONFIGURE</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ResumeToPlay", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("redirects an active run back into /play after refresh", () => {
    useGameStore.setState({
      gameStarted: true,
      gameMode: "multi",
    });

    renderAt("/");

    expect(screen.getByText("PLAY")).toBeTruthy();
  });

  it("leaves non-run visitors exactly where they are", () => {
    useGameStore.setState({
      gameStarted: false,
      gameMode: "",
    });

    renderAt("/");

    expect(screen.getByText("HOME")).toBeTruthy();
  });
});
