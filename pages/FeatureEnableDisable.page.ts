import type { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';

interface TableLocators {
  root: Locator;
  headers: Locator;
  rows: Locator;
}

export class FeatureEnableDisable extends Base {
  constructor(page: Page) {
    super(page);
  }

  // Web Elements

  get searchInput(): Locator {
    return this.page.getByRole('searchbox', { name: 'Search:' });
  }

  // number of entries on the page
  get pageStatus(): Locator {
    return this.page.getByRole('status');
  }

  // Table on Feature Enable / Disable page
  get table(): TableLocators {
    const root = this.page.locator('table#example');

    return {
      root,
      headers: root.locator('thead th'),
      rows: root.locator('tbody tr'),
    };
  }

  get pagination(): Locator {
    return this.page.locator('.dt-paging');
  }

  get columnOrdering(): Locator {
    // Specifically targets the sort indicators inside headers
    return this.table.headers.locator('.dt-column-order');
  }

  /**
   * Returns the specific row locator for a given name
   */
  getRowByName(name: string): Locator {
    return this.table.rows.filter({ hasText: name }).first();
  }

  /**
   * Returns the age cell for a specific row locator
   */
  getAgeCell(rowLocator: Locator): Locator {
    // Age is the 4th column (index 3)
    return rowLocator.locator('td').nth(3);
  }
}
