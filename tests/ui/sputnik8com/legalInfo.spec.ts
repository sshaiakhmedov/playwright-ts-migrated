import { test, expect } from '../../../util/fixtures';
import { Legal } from '../../../pages';

test.describe('Pravovaya Informatisya', () => {
  test.describe('Footer Navigation', () => {
    test.beforeEach('Go Home', async ({ sputnikHome }) => {
      await sputnikHome.open();
    });

    test('"Правовая информация" link routs to the Legal page', async ({ sputnikHome, legalPage }) => {
      await sputnikHome.footer.clickLegalLink();
      await expect(legalPage.page).toHaveURL(Legal.URLS.LEGAL_PAGE);
    });
  });

  test.describe('Legal page links', () => {
    test.beforeEach('Deep link directly to Legal page', async ({ legalPage }) => {
      await legalPage.open();
      await legalPage.mainPageComponentsArePresent();
    });

    test('"Часто задаваемых вопросах" routs to the same tab', async ({ legalPage, sputnikHome }) => {
      await legalPage.pageLinks.faq.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.FAQ_PAGE);
      await sputnikHome.goBack();
      await legalPage.mainPageComponentsArePresent();
    });

    test('"Смотрите открытые вакансии" routs to the same tab', async ({ legalPage, sputnikHome }) => {
      await legalPage.pageLinks.vacancies.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.VACANCIES);
      await sputnikHome.goBack();
      await legalPage.mainPageComponentsArePresent();
    });

    test('"Перечень видов деятельности" link routs to the same tab', async ({ legalPage, sputnikHome }) => {
      await legalPage.pageLinks.perechenVidovDeyatelnosti.click();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.PERECHEN_VIDOV_DEYATELNOSTI);
      await sputnikHome.goBack();
      await legalPage.mainPageComponentsArePresent();
    });

    test('"Карточка юридического лица" link routs to new tab on yandex disk', async ({ legalPage }) => {
      const newTab = await legalPage.openInNewTab(legalPage.pageLinks.karochka_yur_litsa);
      await expect(newTab).toHaveURL(Legal.URLS.KARTOCHKA_YUR_LITSA);
      await newTab.close();
    });
  });
});
