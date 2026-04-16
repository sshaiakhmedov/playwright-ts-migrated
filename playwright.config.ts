// @ts-check
import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 5 : 1,

  // Directory for test artifacts (traces, screenshots, etc.)
  outputDir: 'test-results',

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright'], // Keeps generating Allure reports
    ['html', { open: 'never' }], // The default Playwright HTML report
  ],

  /* Shared options */
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }, // Enforce desktop viewport globally
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'on',
    launchOptions: {
      args: ['--start-maximized'], // Tell Chrome to start maximized
    },
  },
  retries: process.env.CI ? 2 : 0,

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
