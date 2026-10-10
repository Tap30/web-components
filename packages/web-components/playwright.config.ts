import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const config: PlaywrightTestConfig<object, object> = defineConfig({
  testDir: "./src",
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
    baseURL: "http://localhost:3000",
    permissions: ["clipboard-write", "clipboard-read"],
  },
  webServer: {
    command: "pnpm --filter @tapsioss/lit-playground run start:test",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:3000/test",
    gracefulShutdown: {
      signal: "SIGTERM",
      timeout: 1000,
    },
  },
});

export default config;
