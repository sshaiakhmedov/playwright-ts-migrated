import { test, expect } from '../../../../util/fixtures';

test.describe('Contact Chat', () => {
  test.describe.configure({ timeout: 120_000 });
  test.use({ viewport: null });

  test.beforeEach('Navigate to homepage', async ({ sputnikHome }) => {
    await sputnikHome.open();
    await sputnikHome.pageIsLoaded();
  });

  test('Chat button opens list of contact options and iframe works', async ({ contactChat }) => {
    await test.step('Open chat', async () => {
      await contactChat.openChat();
    });

    await test.step('Verify contact list appears with three chat options', async () => {
      await expect(contactChat.contactList.items).toHaveCount(3);
      await expect(contactChat.contactList.items.first()).toBeVisible();
    });

    await test.step('Open web chat from contact list', async () => {
      await contactChat.clickContactItem(0);
      await contactChat.waitForChatLoaded();
      await contactChat.expectChatIframeContent();
    });

    await test.step('Close chat widget', async () => {
      await contactChat.iframeContent.closeBtn.click();
      await expect(contactChat.iframeContent.chatWidget).toBeHidden();

      // The contact list should still be visible after closing just the widget
      const items = await contactChat.contactList.items.all();
      for (const item of items) {
        await expect(item).toHaveCSS('display', 'block');
      }
    });

    await test.step('Close entire chat experience by clicking main button', async () => {
      await contactChat.chatButton.click();
      const items = await contactChat.contactList.items.all();
      for (const item of items) {
        await expect(item).toHaveCSS('display', 'none');
      }
      await expect(contactChat.chatButton).toBeVisible();
    });
  });
});
