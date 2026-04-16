import { test, expect } from '../../../util/fixtures';
import { applyPerformanceMocks } from '../../../util/mockHelpers';

test.describe('Landing Page Performance Optimization (Integration Mocking)', () => {
  test('Ensure core UI loads cleanly when third-party and heavy media are masked', async ({ sputnikHome, page }) => {
    // Apply reusable network masks (intercept trackers & heavy imagery instantly)
    await applyPerformanceMocks(page);

    // 3. Measure layout execution
    const startTime = Date.now();

    // Navigate to the homepage. The media/trackers will be intercepted and bypassed instantaneously.
    await sputnikHome.open({ waitUntil: 'domcontentloaded' });

    // 4. Validate Core Component Reliability
    // Even without real images or marketing analytics tracking scripts,
    // the page layout and components must functionally render without JS errors blocking the DOM.

    // The popular cities section must map smoothly from the backend API, independently of images.
    const moscowPill = page.locator('text="Москва"').first();
    await expect(moscowPill).toBeVisible();
    await expect(moscowPill).toHaveAttribute('href', '/ru/moscow');

    // Make sure the main header brand isn't broken
    const supportPhone = page.locator('a[href^="tel:"]').first();
    await expect(supportPhone).toBeVisible();

    const loadTimeMs = Date.now() - startTime;
    console.log(`Mock-optimized UI load took: ${loadTimeMs}ms`);
  });
});
