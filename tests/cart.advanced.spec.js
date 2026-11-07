
const { test, expect } = require('@playwright/test');

// Reusable login helper.
// This avoids repeating the same login steps in every test.
async function loginAsStandardUser(page) {
    await page.goto('https://www.saucedemo.com/');

    // Enter valid login credentials.
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    // Confirm that login was successful.
    await expect(page).toHaveURL(/inventory.html/);
}


// CART-001: Add one specific product to the cart.
test('should add Sauce Labs Backpack to the cart', async ({ page }) => {
    await loginAsStandardUser(page);

    // Locate the Backpack product container.
    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    // Click Add to cart only inside the Backpack container.
    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // Verify that the cart badge displays one item.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});


// CART-002: Verify that the selected product appears in the cart.
test('should display Sauce Labs Backpack in the cart', async ({ page }) => {
    await loginAsStandardUser(page);

    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // Open the shopping cart.
    await page.locator('.shopping_cart_link').click();

    // Verify that exactly one Backpack item appears in the cart.
    const backpackInCart = page.locator('.cart_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(backpackInCart).toHaveCount(1);
});


// CART-003: Remove a product from the cart.
test('should remove a product from the cart', async ({ page }) => {
    await loginAsStandardUser(page);

    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // Open the cart.
    await page.locator('.shopping_cart_link').click();

    // Locate the Backpack specifically inside the cart.
    const backpackInCart = page.locator('.cart_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    // Remove the Backpack.
    await backpackInCart.getByRole('button', { name: 'Remove' }).click();

    // Verify that no cart items remain.
    await expect(page.locator('.cart_item')).toHaveCount(0);

    // Verify that the cart badge disappears when the cart is empty.
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});


// CART-004: Add multiple products and verify the cart quantity.
test('should add multiple products to the cart', async ({ page }) => {
    await loginAsStandardUser(page);

    // Locate the Backpack product container.
    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    // Locate the Bike Light product container.
    const bikeLight = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bike Light' });

    // Add both products to the cart.
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

    // Verify that the cart badge displays two items.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Open the shopping cart.
    await page.locator('.shopping_cart_link').click();

    // Locate each product separately.
    // This avoids Playwright strict-mode violations when multiple
    // elements match the general '.cart_item' locator.
    const backpackInCart = page.locator('.cart_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    const bikeLightInCart = page.locator('.cart_item')
        .filter({ hasText: 'Sauce Labs Bike Light' });

    // Verify that each product appears exactly once.
    await expect(backpackInCart).toHaveCount(1);
    await expect(bikeLightInCart).toHaveCount(1);

    // Verify that exactly two products are displayed in the cart.
    await expect(page.locator('.cart_item')).toHaveCount(2);
});


// CART-005: Continue shopping and verify that the cart is preserved.
test('should preserve cart items when continuing shopping', async ({ page }) => {
    await loginAsStandardUser(page);

    const backpack = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // Open the cart.
    await page.locator('.shopping_cart_link').click();

    // Return to the inventory page using Continue Shopping.
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // Verify that the user has returned to the inventory page.
    await expect(page).toHaveURL(/inventory.html/);

    // Verify that the previously added product remains in the cart.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
