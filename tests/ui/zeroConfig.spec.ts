import { test, expect } from '../../util/fixtures';
import { ZERO_CONFIG_TABLE } from '../../data/zeroConfigTable.data';

test.describe.skip('Zero Config table', () => {
  test.beforeEach(async ({ zeroConfigPage }) => {
    await zeroConfigPage.open();
    await zeroConfigPage.zeroConfigTable.click();
    await expect(zeroConfigPage.page).toHaveTitle(ZERO_CONFIG_TABLE.TITLE);
    await zeroConfigPage.table.root.waitFor({ state: 'visible' });
  });

  test('number of entries >25', async ({ zeroConfigPage }) => {
    const textContent = await zeroConfigPage.pageStatus.textContent();
    const numbers = textContent?.match(/\d+/g);
    expect(Number(numbers?.[2])).toBeGreaterThan(ZERO_CONFIG_TABLE.MIN_ENTRIES);
  });

  test('verifies table headers', async ({ zeroConfigPage }) => {
    await expect(zeroConfigPage.table.headers).toHaveText(Object.values(ZERO_CONFIG_TABLE.TABLE.HEADERS));
  });

  test('The oldest user with the age of 66', async ({ zeroConfigPage }) => {
    await zeroConfigPage.sortColumnBy('Age', 'desc');
    const firstTableRow = zeroConfigPage.table.rows.first();
    const oldestAge = await zeroConfigPage.getCellText(firstTableRow, ZERO_CONFIG_TABLE.TABLE.HEADERS.AGE);
    expect(Number(oldestAge)).toBe(ZERO_CONFIG_TABLE.TABLE.OLDEST_AGE);
  });

  test('The youngest user with the age of 20', async ({ zeroConfigPage }) => {
    await zeroConfigPage.sortColumnBy('Age', 'asc');
    const firstTableRow = zeroConfigPage.table.rows.first();
    const youngestAge = await zeroConfigPage.getCellText(firstTableRow, ZERO_CONFIG_TABLE.TABLE.HEADERS.AGE);
    expect(Number(youngestAge)).toBe(ZERO_CONFIG_TABLE.TABLE.YOUNGEST_AGE);
  });

  test('Can find entry by value from "Name" column', async ({ zeroConfigPage }) => {
    const row = await zeroConfigPage.findEntryByValue('Name', 'Airi Satou');
    await expect(row).toBeVisible();
  });

  test('main login button is visible', async ({ zeroConfigPage }) => {
    await expect(zeroConfigPage.login.loginButton).toBeVisible();
    await expect(zeroConfigPage.login.loginButton).toHaveText('Login / Register');
  });

  test('should allow an existing user to log in', async ({ zeroConfigPage }) => {
    await zeroConfigPage.login.loginButton.click();
    await zeroConfigPage.login.login('user@example.com', 'password123');
    await expect(zeroConfigPage.login.usernameInput).toBeHidden();
  });
});
