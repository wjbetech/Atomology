import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import EduInfoPage from "../components/EduInfoPage";
import { getRawElementByName } from "../data/elements";
import { useGameStore, useUIStore } from "../store/atomologyStore";

function renderEdu() {
  return render(
    <MemoryRouter>
      <EduInfoPage />
    </MemoryRouter>
  );
}

describe("getRawElementByName", () => {
  it("returns the full raw entry with educational fields", () => {
    const h = getRawElementByName("Hydrogen");
    expect(h?.symbol).toBe("H");
    expect(h?.summary).toBeTruthy();
    expect(h?.image?.url).toContain("wikimedia");
    expect(h?.bohr_model_image).toBeTruthy();
    expect(h?.electron_configuration_semantic).toBeTruthy();
  });
});

describe("EduInfoPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useUIStore.setState({ eduInfoName: "Helium" });
    useGameStore.setState({ gameMode: "multi", gameStarted: true });
  });

  it("renders the element dossier with photo and attribution", () => {
    renderEdu();

    expect(screen.getByText("Helium")).toBeTruthy();
    expect(screen.getByAltText(/Bohr model of Helium/i)).toBeTruthy();
    // summary snippet from helium's dataset entry
    expect(
      screen.getByText(/lowest among all the elements/i)
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Back to Game/i })
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Exit to Configure/i })
    ).toBeTruthy();
  });

  it("Back to Game runs the registered continuation and closes", async () => {
    const user = userEvent.setup();
    let continued = false;
    useUIStore.setState({
      eduExit: () => {
        continued = true;
      },
    });

    renderEdu();
    await user.click(screen.getByRole("button", { name: /Back to Game/i }));

    await waitFor(() => expect(continued).toBe(true));
    expect(useUIStore.getState().eduInfoName).toBeNull();
  });

  it("Enter key continues without clicking", async () => {
    const user = userEvent.setup();
    let continued = false;
    useUIStore.setState({
      eduExit: () => {
        continued = true;
      },
    });

    renderEdu();
    await user.keyboard("{Enter}");

    expect(continued).toBe(true);
  });
});
