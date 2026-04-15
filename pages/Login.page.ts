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
      phoneInput: container.locator('#user_phone'),
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
    await this.signingModalContent.loginByEmai.waitFor({ state: 'visible' });
    await this.signingModalContent.enterWebsiteButton.waitFor({ state: 'visible' });
    await this.signingModalContent.emailInput.waitFor({ state: 'visible' });
    await this.signingModalContent.emailInput.fill(email);
    await this.signingModalContent.passwordInput.fill(password);
    await this.signingModalContent.enterWebsiteButton.click();
  }

  async loginByPhone(number: string, password: string): Promise<void> {
    const phoneLabel = this.signingModalContent.loginByPhone;
    const phoneInput = this.signingModalContent.phoneInput;
    const passwordInput = this.signingModalContent.passwordInput;
    const submitButton = this.signingModalContent.enterWebsiteButton;

    await this.page.evaluate(el => el.click(), await phoneLabel.elementHandle());
    await phoneInput.waitFor({ state: 'visible' });
    await phoneInput.fill(number, { force: true });
    await passwordInput.fill(password, { force: true });
    await this.page.evaluate(el => el.click(), await submitButton.elementHandle());
  }
}
