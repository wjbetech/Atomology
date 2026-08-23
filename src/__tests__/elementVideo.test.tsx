import { render, screen } from "@testing-library/react";
import ElementVideo from "../components/ElementVideo";
import { elementVideos } from "../data/videos";

describe("ElementVideo", () => {
  it("renders a curated thumbnail card when the element has an entry", () => {
    // temporarily seed a curated entry
    elementVideos["Helium"] = {
      title: "Helium: the element that escapes Earth",
      youtubeId: "dQw4w9WgXcQ",
    };

    render(<ElementVideo name="Helium" />);

    const link = screen.getByRole("link", { name: /Helium/i });
    expect(link.getAttribute("href")).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    expect(screen.getByAltText("Helium: the element that escapes Earth"));

    delete elementVideos["Helium"];
  });

  it("falls back to a YouTube search link for uncurated elements", () => {
    render(<ElementVideo name="Osmium" />);

    const link = screen.getByRole("link", { name: /Osmium on YouTube/i });
    expect(link.getAttribute("href")).toBe(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        "Osmium element uses and where it is found"
      )}`
    );
  });
});
