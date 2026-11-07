# E-commerce Website Testing with Playwright

## Project Overview

This project demonstrates manual and automated testing of the SauceDemo e-commerce application using Playwright and JavaScript.

The goal was to practise real-world QA activities, including validating user workflows, checking application behaviour, performing cross-browser testing, and identifying defects.

Application: https://www.saucedemo.com/  
Testing Framework: Playwright Test  
Language:JavaScript  
Browsers: Chromium, Firefox, WebKit

Testing Scope

 1. Login Testing
- Verify login with valid credentials.
- Verify that invalid credentials are rejected.

 2. Cart Testing
- Add a product to the cart.
- Verify that the selected product appears in the cart.
- Remove a product from the cart.
- Add multiple products and verify cart quantity.
- Verify that cart contents are preserved when continuing shopping.

3. Checkout Testing
- Complete the simulated checkout process.
- Verify validation when the first name is missing.

 4. Product Sorting Testing
- Sort products by price from low to high.
- Sort product names from A to Z.
- Sort product names from Z to A.
- Test price sorting using the (problem_user) account to investigate unexpected behaviour.
 Cross-Browser Testing

The test suite is configured to run on:

- Chromium
- Firefox
- WebKit

This allows the same test scenarios to be checked across three browser engines.

Defect Identified

BUG-SORT-001: Product sorting does not work correctly for problem_user

- Feature:Product sorting
- Test: Price low to high
- Expected: Products should appear in ascending price order.
- Actual: The displayed product order does not match ascending price order.
- Browsers: Chromium, Firefox and WebKit

The failure was investigated using Playwright's assertion output and page snapshot.

 Project Structure

```text
playwright-ecommerce-testing/
├── tests/
│   ├── homepage.spec.js
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── cart.advanced.spec.js
│   ├── checkout.spec.js
│   └── sorting.spec.js
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

How to Run the Tests

 Install dependencies

```bash
npm install
```

 Install Playwright browsers

```bash
npx playwright install
```

Run all tests

```bash
npx playwright test
```

 Run a specific test file

```bash
npx playwright test tests/cart.advanced.spec.js
```

 View the HTML report

```bash
npx playwright show-report
```

 Key Skills Practised

- Writing automated test cases using Playwright.
- JavaScript fundamentals for test automation.
- Locators and assertions.
- Positive and negative testing.
- E-commerce user workflow testing.
- Cross-browser testing.
- Debugging failed test cases.
- Identifying and documenting application defects.

## Note

SauceDemo is a demonstration application. The checkout workflow is simulated and does not process real payments or orders.

This project was created for learning and QA portfolio development.
