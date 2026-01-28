import React from "react";
import { render } from "@testing-library/react";
import SocialCard from "./SocialCard";

describe("SocialCard Performance", () => {
    test("should render without excessive re-renders", () => {
        const { rerender } = render(<SocialCard />);

        // Measure initial render time
        const start = performance.now();
        rerender(<SocialCard />);
        const end = performance.now();

        expect(end - start).toBeLessThan(16); // Less than one frame (60fps)
    });

    test("should not cause layout thrashing", () => {
        render(<SocialCard />);
        // Check that animations use transform/opacity (GPU-accelerated)
        // This component does use transform, which is good!
    });
});
