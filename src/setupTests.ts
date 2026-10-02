import { beforeAll } from "vitest";
import "@testing-library/jest-dom";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });

    Element.prototype.scrollIntoView = () => {};

    globalThis.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    globalThis.IntersectionObserver = class {
        readonly root = null;
        readonly rootMargin = "";
        readonly thresholds = [];
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    } as any;

    const storageMock = (() => {
        let store: Record<string, string> = {};
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => {
                store[key] = value.toString();
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            },
            get length() {
                return Object.keys(store).length;
            },
            key: (index: number) => Object.keys(store)[index] || null,
        };
    })();

    Object.defineProperty(window, "localStorage", {
        value: storageMock,
        writable: true,
    });
    Object.defineProperty(globalThis, "localStorage", {
        value: storageMock,
        writable: true,
    });
});
