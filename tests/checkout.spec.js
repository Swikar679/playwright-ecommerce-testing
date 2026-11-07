
const { test, expect } = require('@playwright/test');

test('should complete the checkout process successfully', async ({ page }) => {

    // 1. Open the website and log in
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Add Sauce Labs Backpack to the cart
    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // 3. Open the cart
    await page.locator('.shopping_cart_link').click();

    // 4. Start checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // 5. Enter customer information
    await page.getByPlaceholder('First Name').fill('Swikar');
    await page.getByPlaceholder('Last Name').fill('Tester');
    await page.getByPlaceholder('Zip/Postal Code').fill('44600');

    await page.getByRole('button', { name: 'Continue' }).click();

    // 6. Verify the order overview
    await expect(page.getByText('Sauce Labs Backpack', { exact: true }))
        .toBeVisible();

    await expect(page.getByText('Checkout: Overview')).toBeVisible();

    // 7. Finish checkout
    await page.getByRole('button', { name: 'Finish' }).click();

    // 8. Verify successful checkout
    await expect(page.getByText('Thank you for your order!'))
        .toBeVisible();
});

//We'll check that SauceDemo prevents a customer from continuing checkout when required information is missing.

test('should prevent checkout when first name is missing', async ({ page }) => {

    // Log in
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Add a product and open the cart
    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();

    // Start checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Leave First Name empty
    await page.getByPlaceholder('Last Name').fill('Tester');
    await page.getByPlaceholder('Zip/Postal Code').fill('44600');

    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify the validation error
    await expect(
        page.getByText('Error: First Name is required')
    ).toBeVisible();
});

