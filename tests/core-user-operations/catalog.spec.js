import { test, expect } from '@playwright/test';

test.describe('Core customer operations', () => {
  test('Browse and sort the product catalog', async ({ page }) => {
    // 1. Start fresh, navigate to https://www.saucedemo.com, and log in with standard_user and secret_sauce.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    // 2. Select Price (low to high) from the Sort products dropdown.
    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('lohi');
    const productCards = page.locator('[data-test="inventory-item"]');
    await expect(productCards.first()).toContainText('Sauce Labs Onesie');
    await expect(productCards.first()).toContainText('$7.99');
    await expect(productCards.last()).toContainText('Sauce Labs Fleece Jacket');
    await expect(productCards.last()).toContainText('$49.99');

    // 3. Open Sauce Labs Backpack product details.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();

    const productDetailAddToCartButton = page.locator('.inventory_details_desc_container button');
    await expect(productDetailAddToCartButton).toBeVisible();
    await expect(productDetailAddToCartButton).toHaveText('Add to cart');

    // 4. Return to the Products catalog.
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });
});