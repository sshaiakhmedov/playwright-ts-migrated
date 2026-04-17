import { Page, Locator, expect } from '@playwright/test';
import { Base } from './Base.page';
import { LoginComponent } from '../components/Login.component';

interface TableLocators {
  root: Locator;
  headers: Locator;
  rows: Locator;
}

export class ZeroConfig extends Base {
  readonly login: LoginComponent;

  protected readonly path = 'https://datatables.net/examples/index';

  constructor(page: Page) {
    super(page);
    this.login = new LoginComponent(this.page);
  }

  // Web Elements
  get zeroConfigTable(): Locator {
    return this.page.getByRole('link', { name: 'Zero configuration' });
  }

  get searchInput(): Locator {
    return this.page.getByRole('searchbox', { name: 'Search:' });
  }

  // number of entries on the page
  get pageStatus(): Locator {
    return this.page.getByRole('status');
  }

  // Table on Zero configuration page
  get table(): TableLocators {
    const root = this.page.locator('table#example');

    return {
      root,
      headers: root.locator('thead th'),
      rows: root.locator('tbody tr'),
    };
  }

  // Methods
  async pageIsLoaded(): Promise<void> {
    await expect(this.zeroConfigTable).toBeVisible();
  }

  /**
   * Sort a column ascending or descending.
   * DataTables toggles sort order on each click: 1 click => asc, 2 clicks => desc.
   */
  async sortColumnBy(columnName: string, order: 'asc' | 'desc'): Promise<void> {
    const header = this.table.root.locator('.dt-column-header', { hasText: columnName }).first();
    await header.click();
    if (order === 'desc') await header.click();
    await this.pageStatus.waitFor({ state: 'visible' });
  }

  /**
   * Get a cell's text for a given row and column header label.
   */
  async getCellText(row: Locator, headerName: string): Promise<string> {
    const headers = await this.table.headers.allTextContents();
    const normalized = headers.map(h => (h || '').trim());
    const colIndex = normalized.findIndex(h => h.toLowerCase() === headerName.toLowerCase());
    if (colIndex === -1) {
      throw new Error(`Column "${headerName}" not found. Headers: ${normalized.join(', ')}`);
    }

    const text = await row.locator('td').nth(colIndex).textContent();
    return (text ?? '').trim();
  }

  /**
   * Filter table using the global search box and return the first row
   * that matches the provided value.
   */
  async findEntryByValue(_columnName: string, value: string): Promise<Locator> {
    // DataTables global search field
    await this.searchInput.fill(value);
    await this.pageStatus.waitFor({ state: 'visible' });
    return this.table.rows.filter({ hasText: value }).first();
  }
}
