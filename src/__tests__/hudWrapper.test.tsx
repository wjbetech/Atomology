import { render, screen } from "@testing-library/react";
import HUDWrapper from "../components/sub-components/HUDWrapper";
import { useGameStore, useUIStore } from "../store/atomologyStore";

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

function seedState(overrides: Record<string, unknown> = {}) {
  useGameStore.setState({
    gameStarted: true,
    gameMode: "multi",
    guessedElements: [],
    ...overrides,
  });
  useUIStore.setState({ showHUD: true });
}

describe("HUDWrapper visibility", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders nothing on mobile even when showHUD is enabled", () => {
    mockMatchMedia(false);
    seedState();

    render(<HUDWrapper />);

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByTitle("Hydrogen")).toBeNull();
  });

  it("renders the periodic table overlay on desktop", () => {
    mockMatchMedia(true);
    seedState();

    render(<HUDWrapper />);

    expect(screen.getByTitle("Hydrogen")).toBeTruthy();
  });

  it("renders nothing when showHUD is disabled", () => {
    mockMatchMedia(true);
    seedState();
    useUIStore.setState({ showHUD: false });

    render(<HUDWrapper />);

    expect(screen.queryByTitle("Hydrogen")).toBeNull();
  });

  it("renders nothing outside an active multi/open game", () => {
    mockMatchMedia(true);
    seedState({ gameStarted: false });

    render(<HUDWrapper />);

    expect(screen.queryByTitle("Hydrogen")).toBeNull();
  });
});
