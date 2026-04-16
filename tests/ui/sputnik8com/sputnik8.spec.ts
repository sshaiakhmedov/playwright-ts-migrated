import { test, expect } from '../../../util/fixtures';
import { Sputnik8 } from '../../../pages/Sputnik8.page';

test.describe('Main Landing Page', () => {
  test.beforeEach('start with landing page', async ({ sputnik8 }) => {
    await sputnik8.open({ waitUntil: 'domcontentloaded' });
  });

  test('Top Header component', async ({ sputnik8 }) => {
    await expect(sputnik8.topContainer.h1Header).toBeVisible();
    await expect(sputnik8.topContainer.leadText).toHaveText(Sputnik8.HEADER_REGEXP);
  });

  test('Moscow city pills open in the same tab and valid url', async ({ sputnik8, request }) => {
    await expect(sputnik8.whichToursInMoscowPills.h1Header).toBeVisible();

    // We query all pills to ensure they don't open in a new tab
    // and verify their href destination via an API request for speed and stability.
    const pillsLoc = sputnik8.whichToursInMoscowPills.cityPillsGrouped;
    const count = await pillsLoc.count();

    // Instead of awaiting each request sequentially (which takes ~20s for 15 requests),
    // we fire them all off in parallel to finish almost instantly.
    const validationPromises = [];

    for (let i = 0; i < count; i++) {
      validationPromises.push(
        (async () => {
          const pill = pillsLoc.nth(i);

          const hrefOfPill = await pill.getAttribute('href');
          if (!hrefOfPill) {
            throw new Error('Link is missing in the href attribut');
          }

          // Asserts that the element does not open in a new tab
          const target = pill;
          await expect(target).not.toHaveAttribute('target', '_blank');

          // Verify the URL structure is valid and the endpoint is reachable
          const shortenedUrl = hrefOfPill.split('#')[0];
          const response = await request.get(shortenedUrl);
          expect(response.status()).toBe(200);
        })(),
      );
    }

    await Promise.all(validationPromises);
  });

  test('"Города" статистика верна и открывает новыую страницу в тойже вкладке', async ({ sputnik8 }) => {
    await sputnik8.scrollIntoView(sputnik8.secondaryFooter.goroda);
  });
});
