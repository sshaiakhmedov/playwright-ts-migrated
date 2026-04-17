import { test, expect } from '../../../util/fixtures';
import { AboutCompany } from '../../../pages/AboutCompany.page';

test.describe('About Company Page', () => {
  test.describe('Footer Navigation', () => {
    test.beforeEach('Navigate to home', async ({ sputnikHome }) => {
      await sputnikHome.open({ waitUntil: 'domcontentloaded' });
      await sputnikHome.pageIsLoaded();
    });

    test('Verify "О компании" link in the footer routes to the About page', async ({ sputnikHome }) => {
      await sputnikHome.footer.clickAboutLink();
      await expect(sputnikHome.page).toHaveURL(AboutCompany.URLS.ABOUT_PAGE);
    });
  });

  test.describe('Promo Links Interaction', () => {
    // Following SKILL.md Rule #4: Use Deep Links! Do not waste time clicking through the UI just to reach the feature.
    test.beforeEach('Deep link directly to About page', async ({ aboutCompanyPage }) => {
      await aboutCompanyPage.open({ waitUntil: 'domcontentloaded' });
      await aboutCompanyPage.pageIsLoaded();
    });

    test('Verify links successfully open in the same tab', async ({ aboutCompanyPage, sputnikHome }) => {
      const { addExcursion, allExcursions, vacancies, yandexDzen } = aboutCompanyPage.promoLinks;
      const URLS = AboutCompany.URLS;

      // "Добавить экскурсию" -> /ru/host-tour
      await test.step('Validate "Добавить эксурсию" routing and opes in the same tab', async () => {
        await addExcursion.click();
        expect(aboutCompanyPage.getURL()).toContain(URLS.ADD_EXCURSION);
        await aboutCompanyPage.goBack();
      });

      // "Все экскурсии" -> Root
      await test.step('Validate "Все эксурсии" routing and opes in the same tab', async () => {
        await allExcursions.click();
        expect(sputnikHome.getURL()).toContain(URLS.ALL_EXCURSIONS);
        await sputnikHome.pageIsLoaded();
        await sputnikHome.goBack();
      });

      // "Открытые вакансии" -> /ru/jobs
      await test.step('Validate "Открытые вакансии" routing and opes in the same tab', async () => {
        await vacancies.click();
        expect(aboutCompanyPage.getURL()).toContain(URLS.VACANCIES);
        await aboutCompanyPage.goBack();
      });

      // "Наш канал в Яндекс.Дзен" -> new tab popup
      // TODO: skipping since started to hit captcha page
      await test.step.skip('Validate native "Yandex Dzen" social popup flow', async () => {
        const [newPage] = await Promise.all([aboutCompanyPage.page.context().waitForEvent('page'), yandexDzen.click()]);
        await expect(newPage).toHaveURL(URLS.YANDEX_DZEN);
        await newPage.close();
      });
    });
  });
});
