const { test, expect } = require('@playwright/test');

test('should successfully log in', async ({ page }) => {

    // Open the website
    await page.goto('https://www.saucedemo.com/');

    // Locate the input fields and enter credentials
    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Locate and click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.getByText('Products')).toBeVisible();

});

//Invallid credentials login 
test('should reject invalid login credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('wrong_user');

    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(
        'Username and password do not match any user in this service'
    )).toBeVisible();

});