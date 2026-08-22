import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../components/pages/HomePage";

describe("Home hero", () => {
  it("shows the wordmark, tagline, and exactly two CTAs", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("ATOMOLOGY")).toBeTruthy();
    expect(screen.getByText("Every element has its own light.")).toBeTruthy();

    const play = screen.getByRole("link", { name: "Play!" });
    const instructions = screen.getByRole("link", { name: "Instructions" });
    expect(play.getAttribute("href")).toBe("/configure");
    expect(instructions.getAttribute("href")).toBe("/instructions");
  });
});
