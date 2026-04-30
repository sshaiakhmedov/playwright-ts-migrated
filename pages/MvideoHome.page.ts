import { Locator, expect } from '@playwright/test';
import { Base } from './Base.page';

export class MvideoHome extends Base {
  protected readonly path = '/';

  // ── First-Visit Modals ──

  get locationConfirmation() {
    const container = this.page.locator('banner, [role="banner"]').first();
    return {
      container,
      confirmButton: this.page.getByRole('button', { name: 'Все верно' }),
      changeCity: this.page.getByText('Выбрать город', { exact: true }),
    };
  }

  get cookieBanner() {
    return {
      banner: this.page.locator('div.cookie-consent'),
      acceptButton: this.page.getByRole('button', { name: 'Понятно' }),
    };
  }

  get promoBanner() {
    const container = this.page.locator('.insider-banner-wrapper').first();
    return {
      container,
      closeButton: container.getByRole('button', { name: 'Закрыть' }),
    };
  }

  // ── Header ──

  get logo(): Locator {
    return this.page.getByRole('link', { name: 'Логотип сайта' });
  }

  get searchInput(): Locator {
    return this.page.getByPlaceholder('Поиск в М.Видео');
  }

  get searchButton(): Locator {
    return this.page.locator('button.main-search__submit');
  }

  get catalogButton(): Locator {
    return this.page.getByRole('button', { name: 'Каталог' });
  }

  get headerActions() {
    return {
      orderStatus: this.page.getByRole('link', { name: 'Статус заказа' }),
      login: this.page.getByRole('link', { name: 'Войти', exact: true }),
      comparison: this.page.getByRole('link', { name: 'Сравнение' }),
      favorites: this.page.getByRole('link', { name: 'Избранное' }),
      cart: this.page.getByRole('link', { name: 'Корзина' }),
    };
  }

  // ── Top Bar ──

  get topBar() {
    const container = this.page.locator('.top-navbar');
    return {
      location: container.getByText('Москва').first(),
      stores: container.getByRole('link', { name: 'Магазины', exact: true }),
      installation: container.getByRole('link', { name: 'Установка и ремонт' }),
      mCombo: container.getByRole('link', { name: 'М.Комбо' }),
      mClick: container.getByRole('link', { name: 'М.Клик' }),
    };
  }

  // ── Category Navigation ──

  get categoryNav(): Locator {
    return this.page.locator('div.slide-panel__content');
  }

  categoryByName(name: string): Locator {
    return this.categoryNav.getByRole('link', { name });
  }

  // ── Methods ──

  /**
   * Dismiss all first-visit popups (location confirmation, cookie banner, promo banner).
   * Each is handled gracefully — if it's not visible within a short timeout, it's skipped.
   */
  async dismissFirstVisitPopups(): Promise<void> {
    // Location confirmation
    const locationBtn = this.locationConfirmation.confirmButton;
    if (await locationBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await locationBtn.click();
    }

    // Cookie banner
    const cookieBtn = this.cookieBanner.acceptButton;
    if (await cookieBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cookieBtn.click();
    }

    // Promo banner
    const promoClose = this.promoBanner.closeButton;
    if (await promoClose.isVisible({ timeout: 2000 }).catch(() => false)) {
      await promoClose.click();
    }
  }

  async pageIsLoaded(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.catalogButton).toBeVisible();
    await expect(this.headerActions.cart).toBeVisible();
  }
}
