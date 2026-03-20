import type { Page, Locator } from '@playwright/test';

/**
 * Reusable Login component for demoblaze.com.
 * Encapsulates the login modal locators and behavior.
 */
export class DemoblazeLoginComponent {
  readonly page: Page;
  readonly root: Page | Locator;

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root ?? page;
  }

  get loginLink(): Locator {
    return this.root.locator('#login2');
  }

  get usernameInput(): Locator {
    return this.root.locator('#loginusername');
  }

  get passwordInput(): Locator {
    return this.root.locator('#loginpassword');
  }

  get loginButton(): Locator {
    return this.root.locator('button.btn-primary:has-text("Log in")');
  }

  /**
   * Check if the login modal is visible.
   */
  async isVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  /**
   * Open the login modal by clicking the login link.
   */
  async openLoginModal(): Promise<void> {
    await this.loginLink.click();
  }

  /**
   * Fill credentials and submit.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
