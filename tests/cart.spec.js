const { test, expect } = require('@playwright/test');

test('should add a product to the shopping cart', async ({ page }) => {

    // Step 1: Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Log in
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 3: Add Sauce Labs Backpack to cart
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Step 4: Verify cart count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});




test('should display the correct product in the cart', async ({ page }) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Log in
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Identify the backpack product specifically
    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    // Add the backpack to cart
    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // Open the shopping cart
    await page.locator('.shopping_cart_link').click();

    // Verify the correct product appears
    await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

});