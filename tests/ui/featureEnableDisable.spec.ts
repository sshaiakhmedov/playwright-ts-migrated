import { test, expect } from '../../util/fixtures';

test.describe('Feature enable / disable table', () => {
  test.beforeEach(async ({ featureEnableDisablePage }) => {
    await featureEnableDisablePage.goto('https://datatables.net/examples/basic_init/filter_only.html');
    await featureEnableDisablePage.table.root.waitFor({ state: 'visible' });
  });

  test('default disabled features are hidden', async ({ featureEnableDisablePage }) => {
    // Search input box IS visible in this example
    await expect(featureEnableDisablePage.searchInput).toBeVisible();

    // Pagination controls should not be visible
    await expect(featureEnableDisablePage.pagination).toHaveCount(0);

    // Page status (e.g. "Showing 1 to 57 of 57 entries") should not be visible
    await expect(featureEnableDisablePage.pageStatus).toHaveCount(0);

    // Column headers should not be sortable (missing sorting classes/roles)
    await expect(featureEnableDisablePage.columnOrdering).toHaveCount(0);
  });

  test('loads all 57 entries because pagination is disabled', async ({ featureEnableDisablePage }) => {
    const rowCount = featureEnableDisablePage.table.rows;
    await expect(rowCount).toHaveCount(57);
  });

  test('verify specific cell data - Tiger Nixon', async ({ featureEnableDisablePage }) => {
    // Look for Tiger Nixon's row
    const row = featureEnableDisablePage.getRowByName('Tiger Nixon');
    await expect(row).toBeVisible();

    // Verify his age
    const ageCell = featureEnableDisablePage.getAgeCell(row);
    await expect(ageCell).toHaveText('61');
  });
});
