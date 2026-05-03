import { Locator, expect } from '@playwright/test';
import { Base } from './Base.page';

export class MvideoSearchResults extends Base {
  protected readonly path = '/search';

  // ── Search Results Page ──

  get searchHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get resultCountText(): Locator {
    return this.page.locator('.listing-page-title__count');
  }

  /**
   * Product card links — each card is an `<a>` with name starting with "Открыть карточку товара".
   */
  get productCardLinks(): Locator {
    return this.page.getByRole('link', { name: /Открыть карточку товара/ });
  }

  productCardLink(index: number): Locator {
    return this.productCardLinks.nth(index);
  }

  /**
   * Product images inside the card links.
   */
  productImage(index: number): Locator {
    return this.productCardLink(index).getByRole('img').first();
  }

  get addToCartButtons(): Locator {
    return this.page.getByRole('button', { name: 'В корзину' });
  }

  get noResultsMessage(): Locator {
    return this.page.getByText('По вашему запросу ничего не найдено');
  }

  get filterButtons() {
    return {
      popular: this.page.getByRole('button', { name: 'Популярные' }),
      allFilters: this.page.getByRole('button', { name: 'Все фильтры' }),
      price: this.page.getByRole('button', { name: 'Цена' }),
      category: this.page.getByRole('button', { name: 'Категория' }),
      brand: this.page.getByRole('button', { name: 'Бренд' }),
    };
  }

  // ── Methods ──

  /**
   * Perform search from the current page by typing into the search bar and pressing Enter.
   */
  async searchFor(query: string): Promise<void> {
    const searchInput = this.page.getByPlaceholder('Поиск в М.Видео');
    await searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Extract product name from the card link's accessible name.
   * The link name format is: "Открыть карточку товара <Product Name>"
   */
  async getProductName(index: number): Promise<string> {
    const linkName = await this.productCardLink(index).getAttribute('aria-label')
      ?? await this.productCardLink(index).innerText();
    return linkName.replace(/Открыть карточку товара\s*/i, '').trim();
  }

  async pageIsLoaded(): Promise<void> {
    await expect(this.searchHeading).toBeVisible();
    await expect(this.productCardLinks.first()).toBeVisible();
  }
}
