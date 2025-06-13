module.exports = {
  // 1. Tell Jest where your source and tests live
  roots: ["<rootDir>/src"],

  // 2. Recognize TS and JSX test files
  testMatch: ["**/?(*.)+(test|spec).+(ts|tsx|js)"],

  // 3. Compile via ts-jest
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // 4. Allow absolute imports from src/
  moduleDirectories: ["node_modules", "src"],

  // 5. Stub CSS and static assets
  moduleNameMapper: {
    "\\.(css|scss|png|jpg|jpeg|svg)$": "identity-obj-proxy"
  },

  // 6. Polyfills (see next step)
  setupFiles: ["<rootDir>/src/setupTestEnv.ts", "whatwg-fetch" ],

  // 7. After Jest’s env is set up (e.g. for custom matchers):
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
