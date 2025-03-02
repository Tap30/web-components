import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  fullyParallel: true,
  retries: process.env.CI ? 2 : undefined,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  projects: [
    {
      name: "💻 Desktop",
      use: devices["Desktop Chrome"],
    },
    {
      name: "📱 iOS",
      use: devices["iPhone X"],
    },
    {
      name: "📱 Android",
      use: devices["Galaxy S9+"],
    },
  ],
  use: {
    baseURL: "http://localhost:5173",
    permissions: ["clipboard-write"],
  },
  webServer: {
    command: "pnpm --filter @tapsioss/playground run dev",
    reuseExistingServer: !process.env.CI,
  },
});
