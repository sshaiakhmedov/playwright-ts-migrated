import { test, expect } from '../../../util/fixtures';
import { DEMOBLAZE_DATA } from '../../../data/demoblaze.data';

test.describe('Demoblaze Login Tests', () => {
  // Override the storage state for this specific file, so the user starts unauthenticated
  test.use({ storageState: { cookies: [], origins: [] } });

  const USERNAME = process.env.DEMOBLAZE_USERNAME!;
  const PASSWORD = process.env.DEMOBLAZE_PASSWORD!;

  test('Happy Path: User can log in with valid credentials', async ({ demoblazeHomePage }) => {
    await test.step('Navigate to homepage', async () => {
      await demoblazeHomePage.open();
    });

    await test.step('Open login modal', async () => {
      await demoblazeHomePage.loginModal.openLoginModal();
      await expect(demoblazeHomePage.loginModal.usernameInput).toBeVisible();
    });

    await test.step('Login with credentials', async () => {
      await demoblazeHomePage.loginModal.login(USERNAME, PASSWORD);
    });

    await test.step('Verify successful login message', async () => {
      await expect(demoblazeHomePage.welcomeMessage).toBeVisible();
      await expect(demoblazeHomePage.welcomeMessage).toHaveText(`Welcome ${USERNAME}`);
    });
  });

  const negativeScenarios = DEMOBLAZE_DATA.getNegativeLoginScenarios(USERNAME, PASSWORD);

  for (const scenario of negativeScenarios) {
    test(`Negative Path: User cannot log in with ${scenario.description}`, async ({ demoblazeHomePage, page }) => {
      // Navigate to homepage
      await demoblazeHomePage.open();

      // Set up dialog handler before triggering action
      let dialogMessage = '';
      page.on('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });

      // Open login modal
      await demoblazeHomePage.loginModal.openLoginModal();

      // Ensure modal is visible
      await expect(demoblazeHomePage.loginModal.usernameInput).toBeVisible();

      // Login with credentials from scenario
      await demoblazeHomePage.loginModal.login(scenario.username, scenario.password);

      // Wait for dialog message to be populated
      await expect.poll(() => dialogMessage, { timeout: 15000 }).toContain(scenario.errorMessage);
    });
  }
});
