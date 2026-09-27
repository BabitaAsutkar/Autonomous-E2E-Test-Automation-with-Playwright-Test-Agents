import { test, expect } from '@playwright/test';

test.describe('Core customer operations', () => {
  test('Complete checkout and place an order', async ({ page }) => {
    // 1. Start fresh, log in, add Sauce Labs Bike Light, open the cart, and click Checkout.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.getByRole('button', { name: /Cart, 1 item/ }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    // 2. Click Continue without entering any information.
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');

    // 3. Enter Test, Customer, and 12345 in the checkout fields, then click Continue.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $9.99')).toBeVisible();
    await expect(page.getByText('Tax: $0.80')).toBeVisible();
    await expect(page.getByText('Total: $10.79')).toBeVisible();

    // 4. Click Finish.
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});