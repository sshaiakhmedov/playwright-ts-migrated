import { test, expect } from '../../util/fixtures';

test.describe('Api testing', () => {
  test('GET', async ({ request }) => {
    const respBody = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(respBody.status()).toBe(200);
  });
});
