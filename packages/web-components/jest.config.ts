import { createJsWithTsEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  ...createJsWithTsEsmPreset(),
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "jest-environment-jsdom",
  injectGlobals: false,
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.[jt]sx?$": "$1",
  },
};

export default jestConfig;
