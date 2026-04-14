import { test, expect } from '../../../util/fixtures';

test.describe('SBP Banner', () => {
  test.beforeEach('goto home', async ({ sputnikHome }) => {
    await sputnikHome.open({ waitUntil: 'domcontentloaded' });
  });

  test('Click on SBP banner title opens /sbp-city in the same tab', async ({ sputnikHome, page }) => {
    await sputnikHome.cityBannerSPB.cityLink.click();
    await expect(page).toHaveURL('/ru/st-petersburg');
  });
});

test.describe('Popular cities', () => {
  test.beforeEach('go home', async ({ sputnikHome }) => {
    await sputnikHome.open({ waitUntil: 'domcontentloaded' });
  });

  test('Check each city', async ({ sputnikHome }) => {
    await expect(sputnikHome.popularCity.component).toBeVisible();
    await expect(sputnikHome.popularCity.header).toBeVisible();
    const countOfCities = await sputnikHome.popularCity.citiesList.count();
    for (let i = 0; i < countOfCities; i++) {
      const href = await sputnikHome.popularCity.citiesList.nth(i).getAttribute('href');
      await sputnikHome.popularCity.citiesList.nth(i).click();
      const openedUrl = sputnikHome.getURL();
      expect(openedUrl).toContain(href);
      await sputnikHome.goBack();
    }
  });

  test('Kazan city click', async ({ sputnikHome, page }) => {
    const kazanLocator = sputnikHome.cityByName('Казань');
    const href = await sputnikHome.getAttribute(kazanLocator, 'href');
    await kazanLocator.click();
    await expect(page).toHaveURL(new RegExp(href!));
  });
});
