import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

// Helper: dismiss cookie banner nếu xuất hiện
async function dismissCookies(page: any) {
  const acceptBtn = page.getByRole('button', { name: 'Accept All Cookies' });
  if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await acceptBtn.click();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TC01 – Trang chủ load thành công và hiển thị các thành phần chính
// ─────────────────────────────────────────────────────────────────────────────
test('TC01 - Homepage loads with logo, search bar, and key sections', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await dismissCookies(page);

  // Logo hiển thị
  await expect(homePage.logo).toBeVisible();

  // Search input hiển thị
  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.searchInput).toHaveAttribute('placeholder', 'Search MilwaukeeTool.com');

  // Section "EXPLORE THE SYSTEMS" tồn tại
  await expect(homePage.exploreSystemsSection).toBeVisible();

  // Footer có link "Contact Us"
  await expect(homePage.footerContactUsLink).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// TC02 – Search từ Homepage chuyển đến trang kết quả đúng
// ─────────────────────────────────────────────────────────────────────────────
test('TC02 - Search from homepage navigates to search results page', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);

  await homePage.goto();
  await dismissCookies(page);

  // Nhập từ khoá và submit
  await homePage.searchFor('drill');

  // Chờ URL chuyển về trang search
  await searchPage.waitForResults();

  // URL chứa query parameter đúng
  await expect(page.url()).toMatch(/search\?q=drill/i);

  // Title trang tìm kiếm đúng
  await expect(page).toHaveTitle(/Tool Finder|Search/i);
});
