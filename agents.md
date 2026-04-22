# Agent Project Instructions

This file contains critical configuration and environment instructions for AI agents working on this project.

## Node.js Version Requirements

**IMPORTANT**: ALWAYS use Node.js v20+ for this project. The default environment node (v14) is incompatible with the modern Playwright and TypeScript features used here.

### How to use the correct Node version:

If the default `node -v` shows v14, use the full path to the Node 20 binary installed in the user's home directory:

- **Path**: `/Users/sshaiakhmedov/.nvm/versions/node/v20.20.1/bin/node`
- **NVM usage**: If `nvm` is available in your shell, run `nvm use 20`.
- **Direct Command**: 
  Instead of `npx playwright test`, use:
  ```bash
  env PATH="/Users/sshaiakhmedov/.nvm/versions/node/v20.20.1/bin:$PATH" npx playwright test --project=chrome
  ```
  **CRITICAL**: You MUST always run tests exclusively against `--project=chrome` unless the user explicitly requests otherwise. Do not run the full suite which includes WebKit.

## Husky pre-commit (local vs IDE sandbox)

When staged files touch UI/API tests, page objects, components, or `util/fixtures.ts`, Husky runs `lint-staged`, then **`npm run typecheck`**, then **`npm run test:all:chrome` only if** the Playwright Chromium binary exists (`scripts/playwright-chromium-ready.mjs`). Some IDE agent sandboxes use an isolated browser cache where Chromium is not installed, so the full suite is skipped there after typecheck passes; **GitHub Actions still runs the full Chrome project on push**.

To skip the Playwright step even when Chromium is installed (fast local commit): `HUSKY_SKIP_PLAYWRIGHT=1 git commit ...` (use sparingly).

## Common Issues to Avoid
- **Unexpected token '{'**: This usually means you are running code with Node 14 that expects Node 18+. Check your version immediately.
- **ESM Modules**: This project uses `"type": "module"`. Ensure all scripts and commands respect this.

## MANDATORY AGENT CONTEXT RETENTION & FOCUS PROTOCOL
To prevent tunnel-vision, context fragmentation, and architectural violations during script generation, **EVERY AI AGENT MUST STRICTLY ADHERE TO THIS PRE-FLIGHT CHECKLIST** before writing any test code:

1. **Never Assume Architecture:** Do not blindly parse JSON recordings or raw prompts directly into `.spec.ts` files without aligning them to the repository's native Base page models.
2. **Execute Workflows & Plan First:** If creating a UI or API test, you **MUST** review the corresponding workflow in `.agents/workflows/` and skill in `.agents/skills/`. Before writing ANY code, you **MUST** generate a `task.md` checklist artifact outlining the steps and wait for user approval. Do NOT skip straight to writing code.
3. **Reference Benchmarks:** You **MUST** utilize `view_file` to read a neighboring, high-quality test file (e.g., `tests/ui/sputnik8com/spbCityBanner.spec.ts`) to anchor your execution matrix (e.g., observing how fixtures are injected, and how `test.step()` blocks and Deep Links are constructed).
4. **Zero Tolerance for Inline Mutators:** Never write raw string locators or explicit timeouts (`waitForTimeout`) directly inside a spec. 100% of locators and URLs belong in Page Object encapsulations.
5. **Clean Debug Code:** NEVER leave `console.log` statements in final `.spec.ts` files. Use `test.step()` for visibility and progress tracking.
6. **Externalize Test Data:** NEVER hardcode user data, credentials, emails, or expected large text blocks in `.spec.ts` files. All test data MUST be imported from the `data/` directory or defined as constants in Page Objects if appropriate.
