import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Run every test file in parallel.
  fullyParallel: true,

  // Fail the CI build if `test.only` was left in the source.
  forbidOnly: !!process.env.CI,

  // Retry only on CI, to absorb transient network flakiness against the live site.
  retries: process.env.CI ? 2 : 0,

  // Cap workers on CI for stable, repeatable runs.
  workers: process.env.CI ? 2 : undefined,

  reporter: [['list'], ['html', { open: 'never' }]],

  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: 'https://www.saucedemo.com',

    // saucedemo tags elements with `data-test`, so getByTestId() targets them.
    testIdAttribute: 'data-test',

    actionTimeout: 15_000,
    navigationTimeout: 20_000,

    // Diagnostics kept lean: only capture when something actually fails.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
