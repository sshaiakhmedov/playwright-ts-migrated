import { test, expect } from '../../../../util/fixtures';

test.describe.skip('Failed Login:', function () {
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Trigger Login popup', async ({ sputnikHome }) => {
    await sputnikHome.open();
    await sputnikHome.login();
  });

  test('error message By Email when using non non-registered user', async ({ sputnikHome }) => {
    await sputnikHome.loginComponent.loginByEmail('test@testtetststs.com', 'password');
    await expect(sputnikHome.loginComponent.errorMessages.invalidEmailPhonePass).toHaveAttribute(
      'style',
      'color: #cc2f0e',
    );
  });

  test.skip('error message when By Phone when using non non-registered phone', async ({ sputnikHome }) => {
    await sputnikHome.loginComponent.loginByPhone('9035772586', 'demopass');
    await expect(sputnikHome.loginComponent.errorMessages.invalidEmailPhonePass).toHaveAttribute(
      'style',
      'color: #cc2f0e',
    );
  });
});
