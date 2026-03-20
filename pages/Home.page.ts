import type { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';

export class Home extends Base {
  constructor(page: Page) {
    super(page);
  }

  // Locators as getters

  get topMainNavLinks(): Record<string, Locator> {
    return {
      findADoctor: this.page.getByRole('link', { name: 'Find a doctor' }),
      sameDayCare: this.page.getByRole('link', { name: 'Same-day care' }),
      locations: this.page.getByRole('link', { name: 'Locations' }),
    };
  }

  // Hero
  get findADoctorButton(): Locator {
    return this.page.locator('#homepage-hero').getByRole('button', { name: 'Find a doctor' });
  }

  get heroHeaderh1(): Locator {
    return this.page.getByRole('heading', { name: 'San Diego\'s health care leader' });
  }
}
