import { Page, Locator, FrameLocator } from '@playwright/test';

export class ContactChat {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Constnats
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
      // Static text can be defined here or as a constant
      offlineMessage: frame.locator('.we-are-offline'),
      closeBtn: frame.locator('.widget-close .el-icon-close'),
    };
  }

  // Methods

  /** Click the chat button to open the contact list */
  async openChat(): Promise<void> {
    // Wait for the button to appear (it has a delayed appearance of ~30s)
    await this.chatButton.waitFor({ state: 'visible', timeout: 40000 });
    await this.chatButton.click();
  }

  /** Click a contact list item by zero‑based index */
  async clickContactItem(index: number): Promise<void> {
    await this.contactList.items.nth(index).click();
  }

  /** Wait for the chat to be fully loaded inside the iframe */
  async waitForChatLoaded(): Promise<void> {
    await this.iframeContent.chatWidget.waitFor({ state: 'visible', timeout: 30000 });
    await this.iframeContent.offlineMessage.waitFor({ state: 'visible', timeout: 30000 });
  }
}
