# 🧪 Playwright E2E Testing Project – Milwaukee Tool

## 📌 Overview

This project demonstrates end-to-end (E2E) testing using **Playwright + TypeScript** with the **Page Object Model (POM)** design pattern.

The test suite validates core user flows on the Milwaukee Tool website:
👉 https://www.milwaukeetool.com

---

## 🏗️ Project Structure

```
tests/
 ├── milwaukee/
 │   └── milwaukee.spec.ts     # Main test cases (TC01, TC02)
 |   └── pipeline.spec.ts     # Main test cases (TC01, TC02, TC03)
 |   └── products.spec.ts     # Main test cases (TC01, TC02, TC03)
 └── pages/
     ├── BasePage.ts           # Base class: navigate, dismiss cookie, get title/URL
     ├── HomePage.ts           # Homepage locators & actions
     ├── PipelinePage.ts       # Pipeline locators & actions
     ├── ProductsPage.ts       # Products locators & actions
     └── SearchPage.ts         # Search results page locators & actions

playwright.config.ts           # Project config, baseURL, browser, reporter
package.json
playwright-report/             # HTML report generated after test run
```

---

## 🧪 Test Scenarios Milwaukee.spec.ts

### 1. 🏠 Homepage Tests (`TC01`)

**Objective:** Verify that the homepage loads correctly and displays required elements.

**Test steps:**

1. Navigate to homepage (`/`)
2. Dismiss cookie banner if visible
3. Verify:
   * ✅ Logo is visible
   * ✅ Search bar is visible and has correct placeholder `"Search MilwaukeeTool.com"`
   * ✅ Section "EXPLORE THE SYSTEMS" is displayed
   * ✅ Footer contains a "Contact Us" link

---

### 2. 🔍 Search Flow Tests (`TC02`)

**Objective:** Validate that the search feature navigates correctly to the results page.

**Test flow:**

1. Navigate to homepage
2. Type keyword `"drill"` into the search bar and press Enter
3. Wait for URL to change to search results page
4. Verify:
   * ✅ URL contains `search?q=drill`
   * ✅ Page title matches pattern `Tool Finder` or `Search`

---

## 🧪 Test Scenarios Pipeline.spec.ts
...

## 🧪 Test Scenarios Product.spec.ts
...
---

## 🎯 Key Features

* ✅ Page Object Model (POM)
* ✅ Reusable `BasePage` class with shared navigation & cookie handling

---

## 🚀 How to Run Tests

**1. Install dependencies**
```bash
npm install
npx playwright install chromium
```

**2. Run all tests**
```bash
npx playwright test
```

**3. Run Milwaukee project only**
```bash
npx playwright test --project=milwaukee
```

**4. Run a specific test case**
```bash
npx playwright test -g "TC01"
```

**5. View HTML report**
```bash
npx playwright show-report
```

---

## ⚙️ Configuration

| Setting | Value |
|---|---|
| Base URL | https://www.milwaukeetool.com |
| Browser | Desktop Chrome |
| Viewport | 1440 × 900 |
| Action Timeout | 30 000 ms |
| Trace | on-first-retry |
| Screenshot | only-on-failure |
| Retries (CI) | 2 |

---

## 🧠 Future Enhancements

* Add product filtering & category navigation tests
* Add negative test cases (invalid search, empty query)
* Add cross-browser testing (Firefox, WebKit)
* Integrate CI/CD pipeline (GitHub Actions)
* Add API validation layer
