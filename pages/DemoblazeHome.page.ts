import { Page, Locator, expect } from '@playwright/test';
import { Base } from './Base.page';
import { DemoblazeLoginComponent } from '../components/DemoblazeLogin.component';

export class DemoblazeHome extends Base {
  readonly loginModal: DemoblazeLoginComponent;

  protected readonly path = 'https://demoblaze.com/';

  constructor(page: Page) {
    super(page);
    this.loginModal = new DemoblazeLoginComponent(this.page);
  }

  // Locators
  get welcomeMessage(): Locator {
    return this.page.locator('#nameofuser');
  }

  // --- Product Locators ---
  getProductTitle(title: string): Locator {
    return this.page.locator('.card-title', { hasText: title });
  }

  getProductPrice(price: string): Locator {
    return this.page.locator('h5', { hasText: price });
  }

  getProductDescription(description: string): Locator {
    return this.page.locator('#article', { hasText: description });
  }

  // Methods
  async pageIsLoaded(): Promise<void> {
    await expect(this.page.locator('#nava')).toBeVisible();
    await expect(this.page.locator('#cat')).toBeVisible();
  }
}
