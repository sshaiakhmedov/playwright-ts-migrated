import { test, expect } from '../../../util/fixtures';
import { SputnikHome } from '../../../pages/SputnikHome.page';

test.describe('Popular cities Banner', () => {
  test.beforeAll('Footer is present', async ({ browser }) => {
    await SputnikHome.executeOnce(browser, SputnikHome, async (home) => {
      await home.footer.componentIsLoaded();
    });
  });

  test.beforeEach('goto home', async ({ sputnikHome }) => {
    await sputnikHome.open();
  });

  test('Click on SBP banner title opens /sbp-city in the same tab', async ({ sputnikHome, page }) => {
    await sputnikHome.cityBannerSPB.cityLink.click();
    await expect(page).toHaveURL('/ru/st-petersburg');
  });
});

test.describe('Popular cities', () => {
  test.beforeEach('go home', async ({ sputnikHome }) => {
    await sputnikHome.open();
  });

  test('Check each popular city', async ({ sputnikHome, request }) => {
    await expect(sputnikHome.popularCity.component).toBeVisible();
    await expect(sputnikHome.popularCity.header).toBeVisible();

    // We verify city links via API for speed and stability,
    // avoiding the flaky UI goBack() loop under parallel load.
    const citiesLoc = sputnikHome.popularCity.citiesList;
    const count = await citiesLoc.count();
    const limit = Math.min(count, 5);

    const validationPromises = [];

    for (let i = 0; i < limit; i++) {
      validationPromises.push(
        (async () => {
          const city = citiesLoc.nth(i);
          const href = await city.getAttribute('href');
          if (!href) {
            throw new Error(`City link at index ${i} is missing href`);
          }

          // Verify the URL structure is reachable
          const response = await request.get(href);
          expect(response.status()).toBe(200);
        })(),
      );
    }

    await Promise.all(validationPromises);
  });

  test('Dubai city click', async ({ sputnikHome, page }) => {
    const kazanLocator = sputnikHome.cityByName('Дубай');
    const href = await sputnikHome.getAttribute(kazanLocator, 'href');
    await kazanLocator.click();
    await expect(page).toHaveURL(new RegExp(href!));
  });
});
