// @ts-check
import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 5 : 1,

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright'], // Keeps generating Allure reports
    ['html', { open: 'never' }], // The default Playwright HTML report
  ],

  /* Shared options */
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: 'https://www.demoblaze.com',
      },
    },
    {
      timeout: 30000, // whole test (ms)
      expect: { timeout: 5000 }, // expect assertions
      name: 'UI Tests - Chromium',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        baseURL: 'https://www.demoblaze.com',
        navigationTimeout: 15000, // page.goto, reload, etc.
        actionTimeout: 10000, // click, fill, check, etc.
        storageState: '.auth/user.json', // Automatically inject auth state
      },
    },
    {
      timeout: 30000, // whole test (ms)
      expect: { timeout: 5000 }, // expect assertions
      name: 'UI Tests - WebKit',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        browserName: 'webkit', // Safari support
        baseURL: 'https://www.demoblaze.com',
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
