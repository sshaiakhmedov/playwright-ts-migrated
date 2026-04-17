import { Page, expect } from '@playwright/test';
import { Base } from './Base.page';

export class AboutCompany extends Base {
  protected readonly path = '/ru/about';

  constructor(page: Page) {
    super(page);
  }

  // Constants
  static readonly URLS = {
    ABOUT_PAGE: /.*\/ru\/about/,
    ADD_EXCURSION: '/ru/host-tour',
    ALL_EXCURSIONS: '/',
    VACANCIES: '/ru/jobs',
    YANDEX_DZEN: /.*zen\.yandex.*|.*dzen\.ru.*/,
  } as const;

  // Locators
  get promoLinks() {
    return {
      addExcursion: this.page.getByRole('link', { name: 'Добавить экскурсию', exact: true }).first(),
      allExcursions: this.page.getByRole('link', { name: 'Все экскурсии', exact: true }).first(),
      vacancies: this.page.getByRole('link', { name: 'Открытые вакансии', exact: true }).first(),
      yandexDzen: this.page.getByRole('link', { name: 'Наш канал в Яндекс.Дзен', exact: true }).first(),
    };
  }

  // Methods
  async pageIsLoaded(): Promise<void> {
    const links = this.promoLinks;
    await expect(links.addExcursion).toBeVisible();
    await expect(links.allExcursions).toBeVisible();
    await expect(links.vacancies).toBeVisible();
    await expect(links.yandexDzen).toBeVisible();
    await this.footer.componentIsLoaded();
  }
}
