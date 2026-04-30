import { test, expect } from '../../../util/fixtures';
import { Legal } from '../../../pages';

test.describe('Kontakty', () => {
  test.describe('Footer Navigation', () => {
    test.beforeEach('Go Home', async ({ sputnikHome }) => {
      await sputnikHome.open();
    });

    test('"Контакты" link routes to the Contacts page in the same tab', async ({ sputnikHome, legalPage }) => {
      await sputnikHome.footer.clickContactsLink();
      await expect(sputnikHome.page).toHaveURL(Legal.URLS.CONTACTS_PAGE);
      await legalPage.mainPageComponentsArePresent();
    });
  });

  test.describe('Contacts page links', () => {
    test.beforeEach('Deep link directly to Contacts page (no #legal)', async ({ legalPage }) => {
      await legalPage.goto(Legal.URLS.CONTACTS_PLAIN);
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

  test.describe('Specialist Cards', () => {
    test.beforeEach('Open Contacts page (no #legal)', async ({ legalPage }) => {
      await legalPage.goto(Legal.URLS.CONTACTS_PLAIN);
    });

    test('specialist cards have image and email', async ({ legalPage }) => {
      const specialistCards = legalPage.professionalsSection.specialistCard;
      const count = await specialistCards.count();

      for (let i = 0; i < count; i++) {
        const card = specialistCards.nth(i);

        await expect(legalPage.specialistCardImage(card)).toBeVisible();
        await expect(legalPage.specialistCardEmail(card)).toBeVisible();
        expect(await legalPage.specialistCardEmail(card).getAttribute('href')).toMatch(/^mailto:/);
      }
    });
  });
});
