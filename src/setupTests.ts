import { beforeAll } from "vitest";
import "@testing-library/jest-dom"; // Optional: extends Vitest's expect method with methods like .toBeInTheDocument()

beforeAll(() => {
    // This code runs once before all tests
    // Example: Mocking a global browser API not present in JSDOM
    // global.ResizeObserver = require('resize-observer-polyfill');
});
