import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    // ── SauceDemo (cần auth) ─────────────────────────────────────────────
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'saucedemo',
      testMatch: /auth\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        storageState: 'test-results/user.json',
      },
      dependencies: ['setup'],
    },

    // ── Milwaukee Tool (không cần auth) ──────────────────────────────────
    {
      name: 'milwaukee',
      testMatch: /milwaukee\.spec\.ts/,
      use: {
        actionTimeout: 30000,
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.milwaukeetool.com',
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
