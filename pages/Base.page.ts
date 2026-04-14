import type { Page, Locator } from '@playwright/test';

/**
 * Base page class that all page objects extend from.
 * Provides common functionality for interacting with pages.
 */
export abstract class Base {
  readonly page: Page;
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  async open(options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }): Promise<void> {
    await this.page.goto(this.path, options);
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  getURL(): string {
    return this.page.url();
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async clearAndFill(locator: Locator, text: string): Promise<void> {
    await locator.clear();
    await locator.fill(text);
  }

  async type(locator: Locator, text: string, delay = 100): Promise<void> {
    await locator.pressSequentially(text, { delay });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isHidden(locator: Locator): Promise<boolean> {
    return await locator.isHidden();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async isDisabled(locator: Locator): Promise<boolean> {
    return await locator.isDisabled();
  }

  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  async getInnerText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async getValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
    return await locator.getAttribute(attributeName);
  }

  async waitForVisible(locator: Locator, timeout = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator: Locator, timeout = 30000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  async getCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
}
