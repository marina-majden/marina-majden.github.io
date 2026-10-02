import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App smoke test", () => {
    it("renders the root application without crashing", async () => {
        render(<App />);
        expect(document.body).toBeInTheDocument();
    });
});
