import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { currentYear } from '../util/helpers';

/**
 * Reusable Footer component incl. Rights info, About Company and the rest of the linked menus
 */

export class FooterLinks {
  readonly page: Page;
  readonly root: Page | Locator;

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root ?? page;
  }

  // Constants
  readonly FOOTER_LINKS = {
    ABOUT: 'О компании',
    BUSINESS: 'Партнерская программа',
    LEGAL: 'Правовая информация',
    VACANCIES: 'Вакансии',
    BANKING_INFO: 'Реквизиты',
    CONTACTS: 'Контакты',
  } as const;

  readonly TEXTS = {
    COPYRIGHT: `© 2012 - ${currentYear} ООО "Спутник"`,
    MADE_IN_SBP: 'Сделано в Петербурге',
  } as const;

  // Locators

  get copyRights() {
    return this.page.locator('.layout-footer__bottom-rights');
  }

  get aboutLink() {
    return this.root.getByRole('link', { name: this.FOOTER_LINKS.ABOUT });
  }

  get businessLink() {
    return this.root.getByRole('link', { name: this.FOOTER_LINKS.BUSINESS });
  }

  get legalLink() {
    return this.page.getByRole('link', { name: this.FOOTER_LINKS.LEGAL });
  }

  get vacanciesLink() {
    return this.page.getByRole('link', { name: this.FOOTER_LINKS.VACANCIES });
  }

  get bankingInfoLink() {
    return this.page.getByRole('link', { name: this.FOOTER_LINKS.BANKING_INFO });
  }

  get contactsLink() {
    return this.page.getByRole('link', { name: this.FOOTER_LINKS.CONTACTS });
  }

  get madeInSbp() {
    return this.page.locator('.layout-footer__sputnik-made');
  }

  get gorodaLink() {
    return this.root.getByRole('link', { name: 'Города', exact: false });
  }

  // Methods
  async componentIsLoaded(): Promise<void> {
    await expect(this.copyRights).toContainText(this.TEXTS.COPYRIGHT);
    await expect(this.aboutLink).toBeVisible();
    await expect(this.businessLink).toBeVisible();
    await expect(this.legalLink).toBeVisible();
    await expect(this.vacanciesLink).toBeVisible();
    await expect(this.bankingInfoLink).toBeVisible();
    await expect(this.contactsLink).toBeVisible();
    await expect(this.madeInSbp).toContainText(this.TEXTS.MADE_IN_SBP);
  }

  async clickAboutLink(): Promise<void> {
    await this.aboutLink.click();
  }

  async clickBusinessLink(): Promise<void> {
    await this.businessLink.click();
  }

  async clickLegalLink(): Promise<void> {
    await this.legalLink.click();
  }

  async clickVacanciesLink(): Promise<void> {
    await this.vacanciesLink.click();
  }

  async clickBankingInfoLink(): Promise<void> {
    await this.bankingInfoLink.click();
  }

  async clickContactsLink(): Promise<void> {
    await this.contactsLink.click();
  }
}
