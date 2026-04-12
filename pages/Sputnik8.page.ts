import type { Page } from '@playwright/test';
import { Base } from './Base.page';

export class Sputnik8 extends Base {
  constructor(page: Page) {
    super(page);
  }

  // Constants
  static readonly HEADER_REGEXP =
    /(\d+) экскурсии в (\d+) городах на одном сайте. Онлайн бронирование, настоящие отзывы, расписание на каждый день./;

  // Web locators

  get headerContainer() {
    const container = this.page.locator('div.layout-header');
    return {
      container,
      loginButton: container.locator('[data-name="signin"]').filter({ visible: true }).first(),
    };
  }
  get topContainer() {
    return {
      h1Header: this.page.getByRole('heading', { name: 'Бронирование экскурсий по всему миру' }),
      leadText: this.page.locator('.lead-text'),
    };
  }

  get whichToursInMoscowPills() {
    const container = this.page.locator('.container.block_mt-50-50-30').nth(2);
    return {
      container,
      h1Header: container.getByText('Какие экскурсии в Москве вас интересуют?'),
      cityPillsGrouped: container.locator('a.city-pills'),
    };
  }

  get footer() {
    const component = this.page.locator('.layout-footer.mobileapp-hide');
    return {
      component,
      goroda: component.getByRole('link', { name: 'Города', exact: false }),
    };
  }

  // Methods
  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async login(): Promise<void> {
    await this.headerContainer.loginButton.click();
  }
}
