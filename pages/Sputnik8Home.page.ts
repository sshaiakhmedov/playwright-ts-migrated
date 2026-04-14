import { Page, Locator } from '@playwright/test';
import { Base } from '../pages/Base.page';

export class SputnikHome extends Base {
  protected readonly path = '/';

  constructor(page: Page) {
    super(page);
  }

  // Locators
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
  async goToBanner(locator: Locator): Promise<void> {
    await locator.click();
  }

  // Methods to form dynamic Locators
  cityByName(cityName: string): Locator {
    return this.popularCity.citiesList.filter({ hasText: cityName });
  }
}
