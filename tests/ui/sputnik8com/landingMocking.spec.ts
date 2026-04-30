import { test, expect } from '../../../util/fixtures';
import { applyPerformanceMocks } from '../../../util/mockHelpers';

test.describe('Landing Page Performance Optimization (Integration Mocking)', () => {
  test('Ensure core UI loads cleanly when third-party and heavy media are masked', async ({ sputnikHome, page }) => {
    // Apply reusable network masks (intercept trackers & heavy imagery instantly)
    await applyPerformanceMocks(page);

    // Navigate to the homepage. The media/trackers will be intercepted and bypassed instantaneously.
    await sputnikHome.open();

    // Validate Core Component Reliability
    // Even without real images or marketing analytics tracking scripts,
    // the page layout and components must functionally render without JS errors blocking the DOM.

    await test.step('Verify popular city section is functional', async () => {
      // The popular cities section must map smoothly from the backend API, independently of images.
      const moscowPill = sputnikHome.cityPill('Москва');
      await expect(moscowPill).toBeVisible();
      await expect(moscowPill).toHaveAttribute('href', '/ru/moscow');
    });
  });
});
