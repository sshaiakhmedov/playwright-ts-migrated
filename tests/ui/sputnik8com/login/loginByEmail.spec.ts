import { test, expect } from '@playwright/test';
import { Sputnik8 } from '../../../../pages/Sputnik8.page';
import { Login } from '../../../../pages/Login.page';

test.describe('Filed Login:', function () {
  let loginPage: Login;
  let sputnik8: Sputnik8;

  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Trigger Login popup', async ({ page }) => {
    loginPage = new Login(page);
    sputnik8 = new Sputnik8(page);
    await loginPage.goToHomePage();
    await sputnik8.login();
  });

  test('error message By Email when using non non-registered user', async () => {
    await loginPage.loginByEmail('test@testtetststs.com', 'password');
    await expect(loginPage.errorMessages.invalidEmailPhonePass).toHaveAttribute('style', 'color: #cc2f0e');
  });

  test.only('error message when By Phone when using non non-registered phone', async () => {
    await loginPage.loginByPhone('234234234', 'demopass');
    await expect(loginPage.errorMessages.invalidEmailPhonePass).toHaveAttribute('style', 'color: #cc2f0e');
  });

  test;
});
