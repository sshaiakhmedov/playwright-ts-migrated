import { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';
import { LoginComponent } from '../components/Login.component';

export class SputnikHome extends Base {
  protected readonly path = '/';
  readonly loginComponent: LoginComponent;

  constructor(page: Page) {
    super(page);
    this.loginComponent = new LoginComponent(this.page);
  }

  // Constants
  static readonly HEADER_REGEXP
    = /(\d+) экскурси[яйи] в (\d+) городах на одном сайте. Онлайн бронирование, настоящие отзывы, расписание на каждый день./;

  // Web locators
  get headerContainer() {
    const container = this.page.locator('div.layout-header');
    return {
      container,
      loginButton: container.locator('[data-name="signin"]').first(),
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

  get secondaryFooter() {
    const component = this.page.locator('.layout-footer.mobileapp-hide');
    return {
      component,
      goroda: component.getByRole('link', { name: 'Города', exact: false }),
    };
  }

  get cityBannerSPB() {
    const component = this.page.locator('.city-banner-activities.city-banner-activities_big').first();
    return {
      component,
      cityLink: component.getByRole('link', { name: 'Санкт-Петербург' }),
    };
  }

  get popularCity() {
    const component = this.page.locator('.col-12.block_mt-30');
    return {
      component,
      header: component.getByText(/Популярные города/i),
      citiesList: component.getByRole('link'),
    };
  }

  // Methods
  async mainPageComponentsArePresent(): Promise<void> {
    await this.headerContainer.container.waitFor({ state: 'visible' });
    await this.topContainer.h1Header.waitFor({ state: 'visible' });
    await this.popularCity.component.waitFor({ state: 'visible' });
    await this.footer.componentIsLoaded();
  }

  async pageIsLoaded(): Promise<void> {
    await this.mainPageComponentsArePresent();
  }

  async login(): Promise<void> {
    await this.headerContainer.container.waitFor({ state: 'visible' });
    await this.headerContainer.loginButton.waitFor({ state: 'visible' });
    await this.headerContainer.loginButton.click();
  }

  async goToBanner(locator: Locator): Promise<void> {
    await locator.click();
  }

  cityByName(cityName: string): Locator {
    return this.popularCity.citiesList.filter({ hasText: cityName });
  }

  cityPill(cityName: string): Locator {
    return this.page.locator('a.city-pills', { hasText: cityName }).first();
  }
}
