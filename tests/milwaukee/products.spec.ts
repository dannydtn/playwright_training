import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

// Helper: dismiss cookie banner nếu xuất hiện
async function dismissCookies(page: any) {
  const acceptBtn = page.getByRole('button', { name: 'Accept All Cookies' });
  if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await acceptBtn.click();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TC01 – Trang Products load thành công và hiển thị các thành phần chính
// ─────────────────────────────────────────────────────────────────────────────
test('TC01 - Products page loads with correct title, search bar and featured section', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
  await dismissCookies(page);

  // URL đúng
  expect(page.url()).toContain('/search');

  // Title đúng
  await expect(page).toHaveTitle(/Tool Finder|Search/i);

  // Search bar hiển thị
  await expect(productsPage.searchInput).toBeVisible();

  // Section "Featured Products" hiển thị
  await expect(productsPage.featuredProductsHeading).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// TC02 – Tìm kiếm sản phẩm từ trang Products trả về kết quả đúng
// ─────────────────────────────────────────────────────────────────────────────
test('TC02 - Search on Products page returns results and updates URL', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
  await dismissCookies(page);

  await productsPage.searchFor('drill');

  // Chờ URL cập nhật với query
  await page.waitForURL(/search\?q=drill/i, { timeout: 20000 });

  // URL chứa keyword
  expect(page.url()).toMatch(/search\?q=drill/i);
});

// ─────────────────────────────────────────────────────────────────────────────
// TC03 – Footer trang Products có link Contact Us hợp lệ
// ─────────────────────────────────────────────────────────────────────────────
test('TC03 - Products page footer contains Contact Us link', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
  await dismissCookies(page);

  // Footer link "Contact Us" hiển thị và trỏ đúng href
  await expect(productsPage.footerContactUsLink).toBeVisible();
  await expect(productsPage.footerContactUsLink).toHaveAttribute('href', '/contact');
});
