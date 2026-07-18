import { test, expect } from '../fixtures/fixtures';
import { PASSWORD, USERS } from '../fixtures/test-data';

test.describe('Login', () => {
  test('standard user lands on the inventory', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  // Data-driven negative cases — one row per rejection reason.
  const rejections = [
    { title: 'locked-out user is blocked', username: USERS.lockedOut, password: PASSWORD, error: /locked out/i },
    { title: 'wrong password is rejected', username: USERS.standard, password: 'wrong-password', error: /do not match/i },
    { title: 'missing username is rejected', username: '', password: PASSWORD, error: /Username is required/i },
    { title: 'missing password is rejected', username: USERS.standard, password: '', error: /Password is required/i },
  ];

  for (const { title, username, password, error } of rejections) {
    test(title, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toContainText(error);
    });
  }
});
