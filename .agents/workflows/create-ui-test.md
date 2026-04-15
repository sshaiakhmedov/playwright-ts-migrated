---
description: Step-by-step process for writing and running a Playwright UI test
---

# Create UI Test Workflow

When writing a new UI Spec or test, follow these exact steps:

1. **Explore the DOM**:
   - Use the browser tool to explore the DOM and find robust locators before writing them.
   - Prefer `getByRole` / user-centric locators.

2. **Setup Architecture**:
   - Check if the page exists in `pages/`. Provide a new or extend an existing Page Object.
   - Check if a `components/` object is needed for shared UI.
   - Check if `constants/` or `data/` should be created/updated.
   - Ensure the new page object is registered in `util/fixtures.ts`.

3. **Write the Test**:
   - Create the `.spec.ts` file in the appropriate project folder under `tests/ui/`.
   - Use fixtures from `util/fixtures.ts` instead of raw `@playwright/test`.
   - Use `beforeEach` or `beforeAll` hooks if appropriate.

4. **Generate Scenarios based on UI Module Type**:
   - You MUST read the `.agents/skills/ui-tests/standard-scenarios.md` file FIRST. 
   - Identify the correct UI Module Type (Form, Search, Navigation, etc.) and generate the strict, standardized combinations of Happy, Negative, and Edge case scenarios listed in that file.

5. **Local Run**:
   - Look at `package.json` scripts.
   - Run in **headless** mode first.
   - If headless passes, run in a **headed** mode to visually confirm.

6. **AI Code Review (MANDATORY)**:
   - BEFORE completing the workflow, you MUST review the `.spec.ts` code you just wrote.
   - If the strings `page.locator`, `page.getBy`, `page.$`, or `locator(` exist **ANYWHERE** inside the `.spec.ts` file, you have violated the Page Object Model rule.
   - **Self-Correct:** You MUST pause, refactor those raw locators back into the `pages/` object, and replace them with standard getter/method calls in the spec before presenting the code to the user.

## MANDATORY VERIFICATION CHECKLIST:
- [ ] Global `AGENTS.md` rules are followed (No locators, data, or env vars in specs; Page Objects and Components used correctly).
- [ ] Prioritizing `getByRole()` over any other locator strategy. Order of locator strategies:
   1. getByRole
   2. getByLabel
   3. getByPlaceholder
   4. getByText
   5. getByAltText
   6. getByTitle
   7. getByTestId
