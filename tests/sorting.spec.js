


const { test, expect } = require('@playwright/test');

// Test 1: Standard user
test('standard_user: should sort products by price from low to high', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('.product_sort_container').selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => Number(price.replace('$', '')));
    const expectedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(expectedPrices);
});

// Test 2: Problem user
test('problem_user: should sort products by price from low to high', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('problem_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('.product_sort_container').selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => Number(price.replace('$', '')));
    const expectedPrices = [...numericPrices].sort((a, b) => a - b);

    // We expect this assertion to expose the sorting defect.
    expect(numericPrices).toEqual(expectedPrices);
});


// SORT-004: Product names A to Z
test('standard_user: should sort products by name A to Z', async ({ page }) => {

    // Log in
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Select Name (A to Z)
    await page.locator('.product_sort_container').selectOption('az');

    // Collect displayed product names
    const names = await page.locator('.inventory_item_name').allTextContents();

    // Generate expected alphabetical order
    const expectedNames = [...names].sort((a, b) => a.localeCompare(b));

    // Verify alphabetical order
    expect(names).toEqual(expectedNames);
});


// SORT-005: Product names Z to A
test('standard_user: should sort products by name Z to A', async ({ page }) => {

    // Log in
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Select Name (Z to A)
    await page.locator('.product_sort_container').selectOption('za');

    // Collect displayed product names
    const names = await page.locator('.inventory_item_name').allTextContents();

    // Generate expected reverse alphabetical order
    const expectedNames = [...names].sort((a, b) => b.localeCompare(a));

    // Verify reverse alphabetical order
    expect(names).toEqual(expectedNames);
});
