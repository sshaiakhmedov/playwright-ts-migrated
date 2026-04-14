import { Base } from './Base.page';
import type { Page } from '@playwright/test';

export class Login extends Base {
  protected readonly path = '/';

  constructor(page: Page) {
    super(page);
  }

  // Class Web Elements

  get signingModalContent() {
    const container = this.page.locator('.sputnik-modal__inner').filter({ hasText: 'Вход на сайт' });
    return {
      container,
      title: container.getByText('Вход на сайт', { exact: true }).first(),
      loginByEmai: container.locator('label', { hasText: 'Вход через E-Mail' }),
      emailInput: container.getByPlaceholder('example@email.ru'),
      passwordInput: container.locator('#user_signin_password'),
      loginByPhone: container.locator('label', { hasText: 'Вход по номеру телефона' }),
      phoneInput: container.locator('[for="phone"] #user_phone'),
      enterWebsiteButton: container.locator('input[type="submit"][value="Вход на сайт"]'),
    };
  }

  get errorMessages() {
    return {
      invalidEmailPhonePass: this.page.locator('.js-error-block__item', {
        hasText: 'Неправильный email, номер телефона или пароль.',
      }),
    };
  }

  // Class Web Elements

  async loginByEmail(email: string, password: string): Promise<void> {
    await this.signingModalContent.emailInput.fill(email);
    await this.signingModalContent.passwordInput.fill(password);
    await this.page.waitForTimeout(2000);

    await this.signingModalContent.enterWebsiteButton.click();
    await this.page.waitForTimeout(2000);
  }

  async loginByPhone(number: string, password: string): Promise<void> {
    await this.signingModalContent.loginByPhone.click();
    // Wait for the tab animation/transition to finish
    // await this.signingModalContent.phoneInput.waitFor({ state: 'visible' });
    await this.signingModalContent.phoneInput.fill(number);
    await this.signingModalContent.passwordInput.fill(password);
    await this.page.waitForTimeout(2000);

    await this.page.waitForTimeout(2000);

    await this.signingModalContent.enterWebsiteButton.click();
    await this.page.waitForTimeout(2000);
  }
}
