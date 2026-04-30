import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class ContactChat {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Constants
  readonly OFFLINE_MESSAGE_TEXT = 'К сожалению, нет операторов в сети :(';

  // Web Elements

  get chatButton(): Locator {
    return this.page.locator('#hde-contact-container').first();
  }

  get contactList() {
    const container = this.page.locator('#hde-contact-list');
    return {
      container,
      items: container.locator('li'),
    };
  }

  get chatIframe(): FrameLocator {
    return this.page.frameLocator('#hde-iframe');
  }

  get iframeContent() {
    const frame = this.chatIframe;
    return {
      chatWidget: frame.locator('body'),
      offlineMessage: frame.locator('.we-are-offline'),
      /** Shown when operators are online; stable anchor instead of time-of-day offline copy */
      messageField: frame.getByPlaceholder('Сообщение'),
      closeBtn: frame.locator('.widget-close .el-icon-close'),
    };
  }

  // Methods

  /** Click the chat button to open the contact list */
  async openChat(): Promise<void> {
    // Wait for the button to appear (it has a delayed appearance of ~30s)
    await this.chatButton.waitFor({ state: 'visible', timeout: 40000 });
    await this.chatButton.click();
    // List `<ul>` may stay `hidden` while `li` entries are shown — wait on an item, not the container
    await this.contactList.items.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Click a contact list item by zero‑based index */
  async clickContactItem(index: number): Promise<void> {
    const item = this.contactList.items.nth(index);
    await item.waitFor({ state: 'visible' });
    await item.click();
  }

  /**
   * Wait until the helpdesk iframe has rendered either offline or online chat UI.
   * Offline-only waits fail when operators are in network.
   */
  async waitForChatLoaded(): Promise<void> {
    await this.page.locator('#hde-iframe').waitFor({ state: 'attached', timeout: 30000 });
    const ready = this.iframeContent.offlineMessage.or(this.iframeContent.messageField);
    await ready.waitFor({ state: 'visible', timeout: 30000 });
  }

  /** Offline banner vs online composer depends on operator availability; both are valid. */
  async expectChatIframeContent(): Promise<void> {
    await expect(this.iframeContent.offlineMessage.or(this.iframeContent.messageField)).toBeVisible();
    if (await this.iframeContent.offlineMessage.isVisible()) {
      await expect(this.iframeContent.offlineMessage).toHaveText(this.OFFLINE_MESSAGE_TEXT);
    } else {
      await expect(this.iframeContent.messageField).toBeVisible();
    }
  }
}
