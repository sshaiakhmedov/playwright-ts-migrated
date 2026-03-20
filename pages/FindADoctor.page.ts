import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';
import { FAD_DATA } from '../data/postman.data';

export class FindADoctor extends Base {
  constructor(page: Page) {
    super(page);
  }

  // Locators as getters
  get fadMenu(): Locator {
    return this.page.locator('#header-nav-fad');
  }

  get findPrimaryCare(): Locator {
    return this.page.locator('#primary-care-doctor-drawer-open');
  }

  get findAspecialist(): Locator {
    return this.page.locator('#specialist-doctor-drawer-open > span');
  }

  get findDoctorByName(): Locator {
    return this.page.locator('#doctor-drawer-open');
  }

  // Action methods
  async goToFADmenu(): Promise<void> {
    await this.click(this.fadMenu);
    await expect(this.page).toHaveTitle(FAD_DATA.title);
  }

  // Verification methods
  async verifyMenuVisible(): Promise<void> {
    await expect(this.fadMenu).toBeVisible();
  }

  async verifyAllOptionsVisible(): Promise<void> {
    await expect(this.findPrimaryCare).toBeVisible();
    await expect(this.findAspecialist).toBeVisible();
    await expect(this.findDoctorByName).toBeVisible();
  }
}
