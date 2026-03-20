import type { Page, Locator } from '@playwright/test';

/**
 * Reusable Login component. Use this when multiple page objects share the same
 * login form (e.g. modal, header, or full-page login).
 */
export class LoginComponent {
  readonly page: Page;
  readonly root: Page | Locator;

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root ?? page;
  }

  // Locators scoped to root (page or modal/section)

  get loginButton(): Locator {
    return this.root.getByRole('link', { name: 'Login / Register' });
  }

  get usernameInput(): Locator {
    return this.root.getByRole('textbox', { name: 'Email or Username:' });
  }

  get passwordInput(): Locator {
    return this.root.getByRole('textbox', { name: 'Password:' }).first();
  }

  get signinRegisterButton(): Locator {
    return this.root.getByRole('button', { name: 'Sign in' }).first();
  }

  get forgotPasswordLink(): Locator {
    return this.root.getByRole('link', { name: 'Forgot?' });
  }

  get notBotCheckbox(): Locator {
    return this.root.getByRole('checkbox');
  }

  /**
   * Fill credentials and submit.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signinRegisterButton.click();
  }

  /**
   * Check if the login form is visible.
   */
  async isVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }
}
