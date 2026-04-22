// @ts-check
import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Run tests in files in parallel
  fullyParallel: true,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 6 : 5,

  // Directory for test artifacts (traces, screenshots, etc.)
  outputDir: 'test-results',

  // CI: skip HTML report (no upload to GitLab); local keeps HTML for debugging.
  reporter: process.env.CI
    ? [['list'], ['allure-playwright']]
    : [
        ['list'],
        ['allure-playwright'],
        ['html', { open: 'never' }],
      ],

  /* Shared options */
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }, // Enforce desktop viewport globally
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    // Full screenshots on every step are heavy in CI (disk + artifact upload).
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
    launchOptions: {
      args: ['--start-maximized'], // Tell Chrome to start maximized
    },
  },
  // CI retries multiply wall time when the suite hits real network flakiness; 1 is a compromise vs local 0.
  retries: process.env.CI ? 1 : 0,

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: 'https://www.sputnik8.com',
      },
    },
    {
      expect: { timeout: 15000 },
      name: 'chrome',
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        baseURL: 'https://www.sputnik8.com/ru/',
        locale: 'ru-RU',
        viewport: { width: 1920, height: 1080 },
        navigationTimeout: 15000,
        actionTimeout: 15000,
      },
    },
    {
      timeout: 90000, // whole test (ms)
      expect: { timeout: 5000 }, // expect assertions
      name: 'UI Tests - WebKit',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        browserName: 'webkit', // Safari support
        baseURL: 'https://www.sputnik8.com/ru/',
        navigationTimeout: 15000,
        actionTimeout: 10000,
        storageState: '.auth/user.json',
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://postman-echo.com', // Different base for API
      },
      timeout: 10000,
    },
  ],
};

export default config;
