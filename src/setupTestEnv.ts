import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

declare global {
  // eslint-disable-next-line no-var
  var ResizeObserver: typeof ResizeObserver;
}

class MockResizeObserver {
  constructor(callback: ResizeObserverCallback) {}
  disconnect() {}
  observe(target: Element, options?: ResizeObserverOptions) {}
  unobserve(target: Element) {}
}

globalThis.ResizeObserver = MockResizeObserver as any;

const testUser = {
  id: "test-user-id",
  email: "test@test.com",
};

// Ensure jsdom localStorage is available
if (typeof globalThis.localStorage !== "undefined") {
  globalThis.localStorage.setItem("user", JSON.stringify(testUser));
}
