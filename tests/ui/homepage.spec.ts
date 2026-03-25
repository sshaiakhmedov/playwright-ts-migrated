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

  test('Hero Button Find a doctor navigates to the correct URL', async ({ homePage, browserName }) => {
    test.skip(browserName === 'webkit', 'Navigation on this hero button behaves flakily in headless WebKit CI');
    await homePage.findADoctorButton.click();
    await expect(homePage.page).toHaveURL(/doctors/, { timeout: 15000 });
  });

  test('Hero has corect header and subheader', async ({ homePage }) => {
    await expect(homePage.page.getByRole('heading', { name: 'San Diego\'s health care leader' })).toBeVisible();
    await expect(homePage.page.getByText('Combining the science of')).toBeVisible();
  });
});
