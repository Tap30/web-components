import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  fullyParallel: true,
  retries: process.env.CI ? 2 : undefined,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [["github"]]
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
    command: "pnpm --filter @tapsioss/playground run start:test",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:3000/test",
    gracefulShutdown: {
      signal: "SIGTERM",
      timeout: 1000,
    },
  },
});
