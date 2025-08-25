import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PeriodicTableHUD } from "../components/sub-components/PeriodicTableHUD";
import HUDWrapper from "../components/sub-components/HUDWrapper";
import { useGameStore } from "../store/atomologyStore";
import { act } from "react";

describe("PeriodicTableHUD", () => {
  it("fills the element box when symbol is in guessed set", () => {
    const guessed = new Set<string>(["H"]);
    render(<PeriodicTableHUD guessed={guessed} current={""} />);

    // Hydrogen element in data has name 'Hydrogen' and symbol 'H'
    const hydrogen = screen.getByTitle("Hydrogen");
    expect(hydrogen).toHaveClass("bg-green-400");
  });

  it("renders empty boxes for non-guessed elements", () => {
    const guessed = new Set<string>();
    render(<PeriodicTableHUD guessed={guessed} current={""} />);

    const hydrogen = screen.getByTitle("Hydrogen");
    expect(hydrogen).not.toHaveClass("bg-green-400");
  });

  it("places lanthanides like Erbium in the HUD and toggles fill when guessed", () => {
    // not guessed
    const guessedEmpty = new Set<string>();
    const { rerender } = render(
      <PeriodicTableHUD guessed={guessedEmpty} current={""} />
    );

    const erb = screen.getByTitle("Erbium");
    expect(erb).toBeInTheDocument();
    expect(erb).not.toHaveClass("bg-green-400");

    // guessed
    const guessedEr = new Set<string>(["Er"]);
    rerender(<PeriodicTableHUD guessed={guessedEr} current={""} />);
    const erbAfter = screen.getByTitle("Erbium");
    expect(erbAfter).toHaveClass("bg-green-400");
  });

  it("integration: store action addGuessedElement updates HUD", () => {
    // Ensure clean state
    act(() => {
      useGameStore.getState().resetGuessedElements();
      useGameStore.getState().setGameStarted(true);
    });

    render(<HUDWrapper />);

    const erb = screen.getByTitle("Erbium");
    expect(erb).not.toHaveClass("bg-green-400");

    act(() => {
      useGameStore.getState().addGuessedElement("Er");
    });

    const erbAfter = screen.getByTitle("Erbium");
    expect(erbAfter).toHaveClass("bg-green-400");

    // cleanup
    act(() => {
      useGameStore.getState().resetGuessedElements();
      useGameStore.getState().setGameStarted(false);
    });
  });
});
