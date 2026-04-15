import { test, expect } from '../../../../util/fixtures';

test.describe('Failed Login:', function () {
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Trigger Login popup', async ({ loginPage, sputnik8 }) => {
    await loginPage.open({ waitUntil: 'domcontentloaded' });
    await sputnik8.login();
  });

  test('error message By Email when using non non-registered user', async ({ loginPage }) => {
    await loginPage.loginByEmail('test@testtetststs.com', 'password');
    await expect(loginPage.errorMessages.invalidEmailPhonePass).toHaveAttribute('style', 'color: #cc2f0e');
  });

  test.skip('error message when By Phone when using non non-registered phone', async ({ loginPage }) => {
    // TODO: very strange rendering of password field, no matter what we've tried.
    await loginPage.loginByPhone('9035772586', 'demopass');
    await expect(loginPage.errorMessages.invalidEmailPhonePass).toHaveAttribute('style', 'color: #cc2f0e');
  });
});
