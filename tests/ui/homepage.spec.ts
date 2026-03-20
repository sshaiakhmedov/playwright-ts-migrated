import { test, expect } from '../../util/fixtures';
import { HOME_DATA } from '../../data/home.data';

test.describe('Sharp Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('https://www.sharp.com/');
  });

  test('landing page title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(HOME_DATA.title);
  });

  test('Top main nav links are visible', async ({ homePage }) => {
    // Wrap the object in Object.values() to get an array of locators
    for (const webEl of Object.values(homePage.topMainNavLinks)) {
      await expect(webEl).toBeVisible();
    }
  });

  test('Hero Button Find a doctor navigates to the correct URL', async ({ homePage }) => {
    await homePage.findADoctorButton.click();
    await expect(homePage.page).toHaveURL(/doctors/);
  });

  test('Hero has corect header and subheader', async ({ homePage }) => {
    await homePage.page.getByRole('heading', { name: 'San Diego\'s health care leader' }).click();
    await homePage.page.getByText('Combining the science of').click();
  });
});
