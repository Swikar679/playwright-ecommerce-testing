const { test, expect } = require('@playwright/test');

test('should open Playwright website', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
});