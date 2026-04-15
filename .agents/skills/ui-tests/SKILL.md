---
name: ui-tests
description: Guidelines on how to write Playwright UI tests, best practices, MUST DO, NEVER DO, MANDATORY CHECKLIST, and how to run tests. Use this when writing or running new UI tests.
---

# UI Test Creation Guidelines

## Required Test Coverage Strategy

When asked to write UI tests for a feature, you MUST generate scenarios covering the following:
1. **Happy Path:** Successful completion of the core user flow (e.g., successful login, successful checkout).
2. **Negative Path:** Form validation errors, invalid credentials, or rejecting incorrect inputs.
3. **State Variations:** Empty states, loading states, interactions with disabled buttons, or handled API failures.
4. **Edge/Boundary Cases:** Boundary values in forms or edge navigation paths.

## Guidelines & Rules

*** MUST DO: ***
1. **Create/extend a page object** in `pages/` (or reuse an existing one).
2. **Use fixtures** from `util/fixtures.ts` instead of raw `@playwright/test`.
3. Try to use `beforeEach` or `beforeAll` hooks if needed.
4. **Use Deep Links!** Do not waste test execution time clicking through the UI just to reach the feature you are testing. Always use direct navigation (`page.goto(DEEP_URL)`) in `beforeEach` so the test starts directly on the form/UI module being tested. Test UI navigation only when you are explicitly writing a "Navigation" test.
5. Use the browser tool to explore the DOM before writing any locators.
6. use `.env` file for environment variables.
7. read constants from `constants/` or `data/` folder as per the case.
8. use page objects from `pages/` folder.
9. use components from `components/` folder.
10. If a new spec implies new Page Object, Component, Fixture, Constant, Data, or Locator, create it in the appropriate folder.
11. **Organize specs by folder:** Place the `.spec.ts` file in a project-specific subdirectory within `tests/ui/` (e.g., `tests/ui/sharp/`).
12. **Group related elements:** In Page Objects, if elements relate to one module/block, nest all related locators inside a single getter object. This makes reading and navigation clearer (e.g., see `Home.page.ts` or `SameDayCare.page.ts` for an example implementations).

*(Note: For generic anti-patterns like "No locators/constants in specs", refer to the global `AGENTS.md` rules.)*

## Execution Workflow

For the exact step-by-step procedure to execute when creating a new UI test, see:
- Run `/create-ui-test` (located in `.agents/workflows/create-ui-test.md`)

## Example Test

```javascript
import { test, expect } from '../../util/fixtures';

test('example', async ({ homePage }) => {
  await homePage.goto('https://www.sharp.com/');
  await expect(homePage.page).toHaveTitle(/Sharp/);
});
```

Prefer **`getByRole` / user-centric locators** in page objects and components; keep raw CSS in `locator()` as a last resort.
