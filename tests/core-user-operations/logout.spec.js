import { test, expect } from '@playwright/test';

test.describe('Core customer operations', () => {
  test('Log out of the customer session', async ({ page }) => {
    // 1. Start fresh, navigate to https://www.saucedemo.com, and log in with standard_user and secret_sauce.
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();

    // 2. Open the navigation menu.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

    // 3. Click Logout.
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeHidden();
  });
});
