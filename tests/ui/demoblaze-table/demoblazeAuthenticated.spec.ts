import { test, expect } from '../../../util/fixtures';

test.describe.skip('Demoblaze Authenticated Tests', () => {
  const USERNAME = process.env.DEMOBLAZE_USERNAME || 'test';

  test('Verify user is already logged in via storageState', async ({ demoblazeHomePage }) => {
    // We go straight to the homepage without touching the login modal
    await demoblazeHomePage.open();

    // The welcome message should naturally appear because of our injected cookies
    await expect(demoblazeHomePage.welcomeMessage).toBeVisible();
    await expect(demoblazeHomePage.welcomeMessage).toHaveText(`Welcome ${USERNAME}`);
  });
});
