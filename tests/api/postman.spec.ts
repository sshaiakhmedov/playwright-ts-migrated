import { test, expect } from '../../util/fixtures';

test.describe('Postman Echo API Tests', () => {
  test('GET with 2 query parameters returns 200', async ({ api }) => {
    const queryParams = {
      key1: 'bar1',
      key2: 'bar2',
      key3: 'extraParam',
    };

    const response = await api.postman.getPostmanEcho(queryParams);
    expect(response.args.key1).toBe('bar1');
    expect(response.args.key3).toBe('extraParam');
  });

  test('POST with JSON payload returns 200', async ({ api }) => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    const response = await api.postman.postPostmanEcho(payload);
    expect(response.json.name).toBe('John Doe');
    expect(response.json.age).toBe(30);
    expect(response.json.email).toBe('john.doe@example.com');
  });
});
