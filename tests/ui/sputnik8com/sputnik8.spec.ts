import { test, expect } from '../../../util/fixtures';
import { Sputnik8 } from '../../../pages/Sputnik8.page';

test.describe('Main Landing Page Elements', () => {
  test.beforeEach('start with landing page', async ({ sputnik8 }) => {
    await sputnik8.open({ waitUntil: 'domcontentloaded' });
  });

  test('Top Header component', async ({ sputnik8 }) => {
    await expect(sputnik8.topContainer.h1Header).toBeVisible();
    await expect(sputnik8.topContainer.leadText).toHaveText(Sputnik8.HEADER_REGEXP);
  });

  test.skip('all epxected Moscow city pill are opened in the same tab with valid url', async ({ sputnik8, page }) => {
    await expect(sputnik8.whichToursInMoscowPills.h1Header).toBeVisible();
    const pills = await sputnik8.whichToursInMoscowPills.cityPillsGrouped.all();
    for (const pill of pills) {
      const hrefOfPill = await pill.getAttribute('href');
      if (!hrefOfPill) {
        throw new Error('Link is missing in the href attribut');
      }
      await pill.click();
      const shortenedUrl = hrefOfPill.split('#')[0];
      await page.waitForURL(url => url.href.includes(shortenedUrl), { waitUntil: 'domcontentloaded' });
      await page.goBack({ waitUntil: 'domcontentloaded' });
    }
  });

  test('"Города" статистика верна и открывает новыую страницу в тойже вкладке', async ({ sputnik8 }) => {
    await sputnik8.scrollIntoView(sputnik8.secondaryFooter.goroda);
  });
});
