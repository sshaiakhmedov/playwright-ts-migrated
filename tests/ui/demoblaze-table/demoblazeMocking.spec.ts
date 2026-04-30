import { test, expect } from '../../../util/fixtures';

test.describe('Demoblaze API Mocking', () => {
  test('Mock the /entries API to display a custom Playwright Product', async ({ demoblazeHomePage, page }) => {
    // 1. Define the custom JSON payload we want to inject into the frontend
    const MOCK_DATA = {
      Items: [
        {
          cat: 'notebook',
          desc: 'This is a custom laptop injected via Playwright Network Mocking. It is the fastest laptop in the world.',
          id: 999,
          img: 'imgs/macbook_air.jpg',
          price: 9999,
          title: 'Playwright Pro M4 Max',
        },
      ],
      LastEvaluatedKey: { id: '9' },
    };

    // 2. Intercept the network request BEFORE navigating
    // The asterisk (*) functions as a wild card to match any query parameters
    await page.route('**/entries*', async (route) => {
      // Fulfill the route with our custom JSON response instead of letting it reach the real database
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_DATA),
      });
    });

    // 3. Navigate to the homepage (the frontend will now ask for /entries and get our mock)
    await demoblazeHomePage.open();

    // 4. Assert that the frontend UI rendered our fake mocked product
    // Wait for the custom title to be visible in the product grid
    await expect(demoblazeHomePage.getProductTitle('Playwright Pro M4 Max')).toBeVisible();

    // Assert the custom price is rendered
    await expect(demoblazeHomePage.getProductPrice('$9999')).toBeVisible();

    // Assert the custom description is rendered
    await expect(demoblazeHomePage.getProductDescription('This is a custom laptop injected via Playwright Network Mocking.')).toBeVisible();
  });
});
