import { test, expect } from '@playwright/test';

test.describe('API calls', () => {
  test('GET call returns expected schema', async ({ request }) => {
    const resp = await request.get('https://jsonplaceholder.typicode.com/posts');
    await resp.json();
    // console.log('body:', JSON.stringify(body, null, 2));
    expect(resp.status()).toBe(200);
  });

  test('POST', async ({ request }) => {
    const postResp = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Quran',
        suras: 114,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(postResp.status()).toBe(201);
    // console.log(await postResp.json());
    const headers = postResp.headers();
    expect(headers['content-type']).toContain('application/json');
    console.log(postResp.statusText());
    console.log(await postResp.text());
  });
});
