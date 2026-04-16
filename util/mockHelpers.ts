import type { Page } from '@playwright/test';

/**
 * Utility to isolate UI rendering perfectly from slow marketing trackers,
 * analytics, and heavy image downloads. Call this before page.goto()
 * to radically speed up non-E2E integration test suites.
 */
export async function applyPerformanceMocks(page: Page) {
  // Block Third-Party Analytics
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
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: '',
      });
    });
  }

  // Block Heavy Media (Images)
  await page.route('**/*.{png,jpg,jpeg,webp,gif}', async (route) => {
    const transparentPixelHex = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64',
    );

    await route.fulfill({
      status: 200,
      contentType: 'image/gif',
      body: transparentPixelHex,
    });
  });
}
