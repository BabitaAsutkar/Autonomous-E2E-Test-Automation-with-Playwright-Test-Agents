import { test, expect } from '@playwright/test';

test.describe('Core customer operations', () => {
  test('Successful customer login', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to https://www.saucedemo.com.
    await page.goto('https://www.saucedemo.com');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in Username and secret_sauce in Password, then click Login.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
  });
});