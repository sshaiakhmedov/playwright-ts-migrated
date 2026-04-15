---
description: Step-by-step process for adding and running API tests using Playwright
---

# Create API Test Workflow

When adding a new API Spec or test, follow these exact steps:

1. **Pre-requisites Check**:
   - Verify PostgREST and the DB are running.
   - Run `curl http://localhost:3000/` or check `docker-compose ps` to confirm.

2. **Data & Config Extraction**:
   - Use the `.env` file for storing Base URLs, tokens, and API keys. Fetch them via `process.env`.
   - If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` folder instead of hardcoding it in the spec.

3. **Reusability Check**:
   - If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper in an `api/` or `clients/` folder.

4. **Write the Test**:
   - Create the spec file in the appropriate project folder under `tests/api/`.
   - Use the `request` fixture: `test('api test', async ({ request }) => { ... })`.
   - Ensure you use correct assertions: e.g., `expect(response.ok()).toBeTruthy()`.

5. **Generate Scenarios**: Ensure you cover:
   - Happy Path (200/201)
   - Negative Path (400 Bad Request)
   - Authentication/Authorization (401/403)
   - Edge/Boundary Cases

6. **Local Run & Verify**:
   - Run `npm run test:api`.

## MANDATORY VERIFICATION CHECKLIST:
- [ ] Global `AGENTS.md` rules are followed.
- [ ] Request bodies/Complex parameters are extracted to `data/` or generated via factory functions.
- [ ] API endpoints are stored as constants or read from config if they change between environments.
- [ ] Using `expect(response.ok()).toBeTruthy()` or explicitly checking the `status()` before checking the response JSON.
- [ ] Descriptive variable names for parsed body data (e.g., `const userData = await response.json();` not `const data = ...`).
