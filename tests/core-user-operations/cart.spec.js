import { test, expect } from '@playwright/test';

test.describe('Core customer operations', () => {
  test('Review and modify the shopping cart', async ({ page }) => {
    // 1. Start fresh, log in with standard_user and secret_sauce, and confirm the catalog is displayed.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // 2. Add Sauce Labs Onesie and Sauce Labs Bike Light.
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 3. Open the shopping cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$7.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();

    // 4. Remove Sauce Labs Onesie.
    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
    await expect(page.getByText('Sauce Labs Onesie')).not.toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 5. Click Continue Shopping.
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  });
});