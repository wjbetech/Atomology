import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PeriodicTableHUD } from "../components/sub-components/PeriodicTableHUD";

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
});
