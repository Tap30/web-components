import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";
import { COVERAGE_DIR } from "./playwright/coverage.ts";

const config: PlaywrightTestConfig<
  { coverageDir: string | undefined },
  object
> = defineConfig({
  testDir: "./src",
  // Coverage: collected per test (`use.coverageDir`), reported and checked
  // against a 100% threshold after the run — see ./playwright/coverage.ts.
  globalSetup: "./playwright/global-setup.ts",
  globalTeardown: "./playwright/global-teardown.ts",
  fullyParallel: true,
  retries: process.env.CI ? 2 : undefined,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  projects: [
    {
      name: "💻 Desktop",
      use: devices["Desktop Chrome"],
    },
    // {
    //   name: "📱 iOS",
    //   use: devices["iPhone X"],
    // },
    {
      name: "📱 Android",
      use: devices["Galaxy S9+"],
    },
  ],
  use: {
    coverageDir: COVERAGE_DIR,
    baseURL: "http://localhost:3001",
    permissions: ["clipboard-write", "clipboard-read"],
  },
  webServer: {
    command: "pnpm --filter @tapsioss/react-playground run start:test",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:3001/test",
    gracefulShutdown: {
      signal: "SIGTERM",
      timeout: 1000,
    },
  },
});

export default config;
