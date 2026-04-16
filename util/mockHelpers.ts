import type { Page } from '@playwright/test';

/**
 * Utility to isolate UI rendering perfectly from slow marketing trackers,
 * analytics, and heavy image downloads. Call this before page.goto()
 * to radically speed up non-E2E integration test suites.
 */
export async function applyPerformanceMocks(page: Page) {
  // Block Third-Party Analytics using native aborts.
  // We use 'blockedbyclient' so the site thinks an adblocker intercepted it,
  // bypassing any internal JS retry-loops that a fake 200 OK would cause.
  const blockedDomains = [
    '**/*google-analytics.com*',
    '**/*analytics.google.com*',
    '**/*mc.yandex.ru*',
    '**/*mc.yandex.com*',
    '**/*bam.nr-data.net*',
    '**/*mindbox.ru*',
    '**/*vk.com/rtrg*',
  ];

  for (const domain of blockedDomains) {
    await page.route(domain, async (route) => {
      await route.abort('blockedbyclient');
    });
  }

  // Abort Heavy Media (Images) instead of injecting fake buffers.
  // Injecting base64 buffers for 100 images across the Node-to-Browser IPC bounds
  // causes severe CPU choking on weak 1-core GitLab CI Runners.
  await page.route('**/*.{png,jpg,jpeg,webp,gif}', async (route) => {
    await route.abort('blockedbyclient');
  });
}
