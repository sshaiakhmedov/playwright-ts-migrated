import { test, expect } from '../../../util/fixtures';
import { Legal } from '../../../pages';

test.describe('Pravovaya Informatisya', () => {
  test.describe('Footer Navigation', () => {
    test.beforeEach('Go Home and click Legal Info', async ({ sputnikHome }) => {
      await sputnikHome.open({ waitUntil: 'domcontentloaded' });
      await sputnikHome.pageIsLoaded();
    });

    test('Footer navigation', async ({ sputnikHome, legalPage }) => {
      await sputnikHome.footer.clickLegalLink();
      await expect(legalPage.page).toHaveURL(Legal.URLS.LEGAL_PAGE);
    });
  });

  test.describe('Main sections', () => {
    test.beforeEach('Deep link directly to About page', async ({ legalPage }) => {
      await legalPage.open({ waitUntil: 'domcontentloaded' });
      await legalPage.pageIsLoaded();
    });

    test('FAQ link routs to FAQ page on the same tab', async ({ legalPage, sputnikHome }) => {
      await legalPage.pageLinks.faq.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.FAQ_PAGE);
      await sputnikHome.goBack();
    });

    test('Vacancies link routs to vacancies page in the same tab', async ({ legalPage, sputnikHome }) => {
      await legalPage.pageLinks.vacancies.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.VACANCIES);
      await sputnikHome.goBack();
    });

    test('Перечень видов деятельности link routs to Перечень видов деятельности page in the same tab', async ({
      legalPage,
      sputnikHome,
    }) => {
      await legalPage.pageLinks.perechenVidovDeyatelnosti.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.PERECHEN_VIDOV_DEYATELNOSTI);
      await sputnikHome.goBack();
    });
  });
});
