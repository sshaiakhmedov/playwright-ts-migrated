// @ts-check
import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Run tests in files in parallel
  fullyParallel: true,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 10 : 5,

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
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
  retries: process.env.CI ? 2 : 0,

  projects: [
    {
      expect: { timeout: 15000 },
      name: 'sputnik8',
      testDir: './tests/ui',
      testIgnore: ['**/mvideo/**'],
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
      expect: { timeout: 15000 },
      name: 'mvideo',
      testDir: './tests/ui/mvideo',
      fullyParallel: true,
      use: {
        browserName: 'chromium',
        baseURL: 'https://www.mvideo.ru/',
        locale: 'ru-RU',
        navigationTimeout: 15000,
        actionTimeout: 15000,
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled'],
        },
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://postman-echo.com',
      },
      timeout: 10000,
    },
  ],
};

export default config;
