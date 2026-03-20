import { test, expect } from '@playwright/test';

// The base URL where PostgREST serves our API
const API_URL = 'http://localhost:3000/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

test.describe('PostgREST API Tests', () => {
  test.skip(!!process.env.CI, 'Skipping PostgREST API tests in CI environment because the local server is not running.');

  test('GET /todos - should return a list of todos', async ({ request }) => {
    // 1. Send GET request to the REST endpoint
    const response = await request.get(API_URL);

    // 2. Validate the HTTP status is 200 OK
    expect(response.status()).toBe(200);

    // 3. Parse and validate the JSON body
    const body: Todo[] = await response.json();
    // console.log('GET Response:', body);

    expect(Array.isArray(body)).toBeTruthy();
    // Verify our sample data from setup.sql exists
    expect(body.length).toBeGreaterThanOrEqual(3);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('completed');
  });

  test('POST /todos - should create a new todo', async ({ request }) => {
    let body: Todo[] = [];
    const newTodo = {
      title: 'Write more automated API tests',
      completed: false,
    };

    // 1. Send POST request with JSON payload
    const response = await request.post(API_URL, {
      headers: {
        Prefer: 'return=representation',
      },
      data: newTodo,
    });

    await test.step('Validate creation', async () => {
      expect(response.status()).toBe(201);
    });

    await test.step('Validate response data', async () => {
      body = await response.json();
      // console.log('POST Response:', body);

      expect(body).toHaveLength(1);
      expect(body[0].title).toBe('Write more automated API tests');
      expect(body[0].completed).toBe(false);
      expect(body[0].id).toBeDefined();
    });
  });
});
