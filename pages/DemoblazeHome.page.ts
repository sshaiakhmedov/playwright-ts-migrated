import type { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';
import { DemoblazeLoginComponent } from '../components/DemoblazeLogin.component';

export class DemoblazeHome extends Base {
  readonly loginModal: DemoblazeLoginComponent;

  protected readonly path = 'https://demoblaze.com/';

  constructor(page: Page) {
    super(page);
    this.loginModal = new DemoblazeLoginComponent(this.page);
  }

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
}
