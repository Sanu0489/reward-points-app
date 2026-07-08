import "@testing-library/jest-dom/vitest";

import "@testing-library/jest-dom/vitest";

// Example: mock browser APIs used by components
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    }),
});