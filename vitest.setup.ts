import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Without `test.globals: true` in vitest.config.mts, @testing-library/react's
// automatic cleanup-after-each-test never gets registered, so DOM from one
// test leaks into the next within the same file. Register it explicitly.
afterEach(() => {
  cleanup();
});
