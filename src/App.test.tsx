import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import DesignSystem from "./pages/DesignSystem";
import { AtomLoader } from "./components/SpinnerLoader";
import Hero from "./sections/Hero";

describe("App smoke test", () => {
  it("renders the root application without crashing", async () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders the design system component", async () => {
    render(<DesignSystem />);

    expect(await screen.findByText(/Pixelated Love/i)).toBeInTheDocument();
  });

  it("renders the atom loader", () => {
    render(<AtomLoader />);

    expect(screen.getByTestId("atom-loader")).toBeInTheDocument();
  });

  it("renders one page title and three selectable font samples", () => {
    render(
      <Hero
        t={{
          hero: {
            line1: "Web Mashina",
            line2: "",
            line3: "creates out of love for humans.",
            cta: "Contact",
          },
          nav: { projects: "Projects" },
        }}
        scrollToSection={() => {}}
      />,
    );

    const pageTitles = screen.getAllByRole("heading", { level: 1 });
    expect(pageTitles).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: /Devina Garden/i }),
    ).toBeInTheDocument();
    const typewriterOption = screen.getByRole("button", {
      name: /Another Typewriter/i,
    });
    expect(
      screen.getByRole("button", { name: /Barber Chop/i }),
    ).toBeInTheDocument();

    fireEvent.click(typewriterOption);

    expect(typewriterOption).toHaveAttribute("aria-pressed", "true");
    expect(pageTitles[0]).toHaveClass("font-headings");
  });
});
