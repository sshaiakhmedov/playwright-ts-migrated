import { test, expect } from '../../../util/fixtures';

test.describe('Promo', () => {
  test.beforeEach('Go to landing page', async ({ mvideoHome }) => {
    await test.step('Open Mvideo Home Page', async () => {
      await mvideoHome.open();
    });
  });

  test('Verify Promo page opens on the same tab with correct theme', async ({ mvideoHome }) => {
    await test.step('Click the promo banner', async () => {
      await mvideoHome.promo.click();
    });

    await test.step('Verify navigation to the promo page', async () => {
      await expect(mvideoHome.page).toHaveURL('/promo/skidka-klienta?from=hb');
    });
  });
});
