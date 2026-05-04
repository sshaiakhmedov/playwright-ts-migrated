import { test, expect } from '../../util/fixtures';

test.describe.skip('Real-World DB Integration Syntax', () => {
  test('Verify User Registration in Database', async ({ db }) => {
    const testEmail = `qa_test_${Date.now()}@mvideo.ru`;

    // 1. Perform UI Action
    await test.step('Register new user via UI', async () => {
      // await page.goto('/register');
      // await page.fill('#email', testEmail);
      // await page.click('#submit');
    });

    // 2. Verify in Database (Real Syntax)
    await test.step('Verify user record in Postgres', async () => {
      // The $1 is a placeholder for safety (SQL Injection protection)
      const query = 'SELECT id, email, status FROM users WHERE email = $1 LIMIT 1';
      const rows = await db.query(query, [testEmail]);

      // Assertion: Ensure we got exactly 1 row back
      expect(rows).toHaveLength(1);

      const user = rows[0];
      expect(user.email).toBe(testEmail);
      expect(user.status).toBe('PENDING_VERIFICATION');
    });
  });

  test('Cleanup: Remove test data directly from DB', async ({ db }) => {
    await test.step('Delete test user to keep DB clean', async () => {
      const deleteQuery = 'DELETE FROM users WHERE email LIKE $1';
      await db.query(deleteQuery, ['%@mvideo.ru']);

      // Verify deletion
      const count = await db.getRecordCount('users', 'email LIKE $1', ['%@mvideo.ru']);
      expect(count).toBe(0);
    });
  });
});
