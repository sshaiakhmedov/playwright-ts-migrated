import { test, expect } from '../../../util/fixtures';
import { SEARCH_QUERIES } from '../../../data/mvideo.data';

test.describe('Mvideo Search', () => {
  test.describe('Happy Path — valid product query', () => {
    test.beforeEach('navigate and search', async ({ mvideoHome, mvideoSearch }) => {
      await mvideoHome.open();
      await mvideoHome.dismissFirstVisitPopups();
      await mvideoSearch.searchFor(SEARCH_QUERIES.ROBOT_VACUUM);
    });

    test('search results page loads with relevant products', async ({ mvideoSearch, page }) => {
      await test.step('verify URL contains search path', async () => {
        await expect(page).toHaveURL(/search/);
      });

      await test.step('verify heading displays the search query', async () => {
        await expect(mvideoSearch.searchHeading).toContainText(SEARCH_QUERIES.ROBOT_VACUUM);
      });

      await test.step('verify result count is shown', async () => {
        await expect(mvideoSearch.resultCountText).toBeVisible();
      });

      await test.step('verify product cards are displayed', async () => {
        await expect(mvideoSearch.productCardLinks.first()).toBeVisible({ timeout: 10000 });
        const cardCount = await mvideoSearch.productCardLinks.count();
        expect(cardCount).toBeGreaterThan(0);
      });

      await test.step('verify first product is relevant to search query', async () => {
        const productImg = mvideoSearch.productImage(0);
        const altText = await productImg.getAttribute('alt') ?? '';
        const keywords = SEARCH_QUERIES.ROBOT_VACUUM.toLowerCase().split(' ');
        const altLower = altText.toLowerCase();
        const hasRelevantKeyword = keywords.some(keyword => altLower.includes(keyword));
        expect(hasRelevantKeyword).toBe(true);
      });

      await test.step('verify add to cart buttons are present', async () => {
        const cartButtonCount = await mvideoSearch.addToCartButtons.count();
        expect(cartButtonCount).toBeGreaterThan(0);
      });
    });

    test('search input retains the query text', async ({ mvideoHome }) => {
      await test.step('verify search input shows the searched query', async () => {
        await expect(mvideoHome.searchInput).toHaveValue(SEARCH_QUERIES.ROBOT_VACUUM);
      });
    });
  });

  test.describe('Negative Path — nonsense query', () => {
    test('nonsense query shows no results or zero relevant products', async ({ mvideoHome, mvideoSearch }) => {
      await mvideoHome.open();
      await mvideoHome.dismissFirstVisitPopups();
      await mvideoSearch.searchFor(SEARCH_QUERIES.NONSENSE);

      await test.step('verify no results message or empty product list', async () => {
        const hasNoResults = await mvideoSearch.noResultsMessage.isVisible({ timeout: 5000 }).catch(() => false);
        const cardCount = await mvideoSearch.productCardLinks.count();

        // Mvideo may show "nothing found" message OR redirect to an empty results page
        expect(hasNoResults || cardCount === 0).toBe(true);
      });
    });
  });
});
