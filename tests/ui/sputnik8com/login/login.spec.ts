import { test, expect } from '../../../../util/fixtures';

test.describe.skip('Failed Login:', function () {
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Trigger Login popup', async ({ sputnik8 }) => {
    await sputnik8.open({ waitUntil: 'domcontentloaded' });
    await sputnik8.login();
  });

  test('error message By Email when using non non-registered user', async ({ sputnik8 }) => {
    await sputnik8.loginComponent.loginByEmail('test@testtetststs.com', 'password');
    await expect(sputnik8.loginComponent.errorMessages.invalidEmailPhonePass).toHaveAttribute(
      'style',
      'color: #cc2f0e',
    );
  });

  test.skip('error message when By Phone when using non non-registered phone', async ({ sputnik8 }) => {
    await sputnik8.loginComponent.loginByPhone('9035772586', 'demopass');
    await expect(sputnik8.loginComponent.errorMessages.invalidEmailPhonePass).toHaveAttribute(
      'style',
      'color: #cc2f0e',
    );
  });
});
