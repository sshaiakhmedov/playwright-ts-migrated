---
name: api-tests
description: Guidelines on how to write API tests using Playwright's APIRequestContext. Use this when adding or updating API test specs to ensure correctness and maintainability.
---

# API Test Creation Guidelines

## Overview

Playwright can be used for API testing alongside UI testing via the built-in `request` fixture, which provides an `APIRequestContext`. When writing API tests, we want to maintain separation of concerns and reusability.

## Pre-requisites for Local PostgREST Tests

If you are running or writing API tests against the local PostgREST setup, the database and API must be running.

### 1. Start the Server
Before running `npm run test:api` or committing API test changes (which triggers the husky hook), ensure the Docker containers are running:
```bash
docker-compose up -d
```

### 2. Verify it's Running
You can quickly check if the PostgREST server is responding before running your Playwright tests:
```bash
curl http://localhost:3000/
# Or just run the tests: npm run test:api
```

## Required Test Coverage Strategy

When asked to write API tests for an endpoint, you MUST generate scenarios covering the following:
1. **Happy Path:** Valid request returns `200/201` and the correct data schema.
2. **Negative Path:** Invalid data (e.g., missing required fields, wrong data types) returns `400` Bad Request.
3. **Authentication/Authorization:** Missing, invalid, or expired tokens returns `401` or `403`.
4. **Edge/Boundary Cases:** Max length strings, empty datasets, etc.

## Guidelines & Rules

*** MUST DO: ***
1. **Use `request` fixture** instead of third-party libraries: `test('api test', async ({ request }) => { ... })`.
2. **Extract Payloads/Data:** If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` folder.
3. **Use API Helpers/Clients:** If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper in an `api/` or `clients/` folder.
4. **Environment Variables:** Use the `.env` file for storing Base URLs, tokens, and API keys. Fetch them via `process.env`.
5. **Use correct assertions:** Use Playwright's `expect` assertions (e.g., `expect(response.ok()).toBeTruthy()`, `expect(response.status()).toBe(200)`).
6. **Organize tests by folder:** Place the spec file in a project-specific subdirectory within `tests/api/` (e.g., `tests/api/postgrest/`).

*** NEVER DO THE FOLLOWING: ***
*(Note: For generic anti-patterns like "No hardcoded credentials", refer to the global `AGENTS.md` rules.)*
1. Never store massive JSON payloads directly inside the `test()` block.
2. Never chain UI interactions in the same test block as a pure API test unless you are specifically testing UI-API boundaries (in which case, it's an E2E test, not an API test).

## Execution Workflow

For the exact step-by-step procedure to execute when creating an API test, see:
- Run `/create-api-test` (located in `.agents/workflows/create-api-test.md`)

## Example Usage

```javascript
import { test, expect } from '@playwright/test';
// OR import { test, expect } from '../../util/fixtures'; if wrapping request

test('fetch user data returns 200', async ({ request }) => {
  const response = await request.get(`${process.env.API_BASE_URL}/users/1`);
  expect(response.ok()).toBeTruthy();
  
  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
});
```
