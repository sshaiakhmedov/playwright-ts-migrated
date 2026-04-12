import { test, expect } from '@playwright/test';
import { Sputnik8 } from '../../../pages/Sputnik8.page';

test.describe('Main Landing Page Elements', () => {
  let sputnik8: Sputnik8;

  test.beforeEach('start with landing page', async ({ page }) => {
    sputnik8 = new Sputnik8(page);
    await sputnik8.goto();
  });

  test('Top Header component', async () => {
    await expect(sputnik8.topContainer.h1Header).toBeVisible();
    await expect(sputnik8.topContainer.leadText).toHaveText(Sputnik8.HEADER_REGEXP);
  });

  test('all epxected Moscow city pill are opened in the same tab with valid url', async ({ page }) => {
    await expect(sputnik8.whichToursInMoscowPills.h1Header).toBeVisible();
    const pills = await sputnik8.whichToursInMoscowPills.cityPillsGrouped.all();
    for (const pill of pills) {
      const hrefOfPill = await pill.getAttribute('href');
      if (!hrefOfPill) {
        throw new Error('Link is missing in the href attribut');
      }
      await pill.click();
      const shortenedUrl = hrefOfPill.split('#')[0];
      console.log('shortHred', shortenedUrl);
      await page.waitForURL((url) => url.href.includes(shortenedUrl), { waitUntil: 'domcontentloaded' });
      await page.goBack({ waitUntil: 'domcontentloaded' });
    }
  });

  test.only('"Города" статистика верна и открывает новыую страницу в тойже вкладке', async () => {
    await sputnik8.scrollIntoView(sputnik8.footer.goroda);
  });
});
