import { test, expect } from '@playwright/test';
import { PipelinePage } from '../pages/PipelinePage';

// Helper: dismiss cookie banner nếu xuất hiện
async function dismissCookies(page: any) {
  const acceptBtn = page.getByRole('button', { name: 'Accept All Cookies' });
  if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await acceptBtn.click();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TC01 – Trang Pipeline load thành công và hiển thị các thành phần chính
// ─────────────────────────────────────────────────────────────────────────────
test('TC01 - Pipeline page loads with correct title and key sections', async ({ page }) => {
  const pipelinePage = new PipelinePage(page);

  await pipelinePage.goto();
  await dismissCookies(page);

  // URL đúng
  expect(page.url()).toContain('/pipeline');

  // Title đúng
  await expect(page).toHaveTitle(/Pipeline/i);

  // Hero description hiển thị
  await expect(pipelinePage.heroDescription).toBeVisible();

  // Link "Get New Product Alerts" hiển thị
  await expect(pipelinePage.getAlertsLink).toBeVisible();

  // Section "New Products By Category" hiển thị
  await expect(pipelinePage.newProductsByCategoryHeading).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// TC02 – Bộ lọc danh mục sản phẩm hoạt động đúng
// ─────────────────────────────────────────────────────────────────────────────
test('TC02 - Category filter tabs are visible and clickable', async ({ page }) => {
  const pipelinePage = new PipelinePage(page);

  await pipelinePage.goto();
  await dismissCookies(page);

  // Các tab lọc hiển thị
  await expect(pipelinePage.categoryFilterM18).toBeVisible();
  await expect(pipelinePage.categoryFilterM12).toBeVisible();

  // Click vào tab M12™ và kiểm tra không báo lỗi
  await pipelinePage.categoryFilterM12.click();

  // Sản phẩm đầu tiên trong grid vẫn hiển thị sau khi lọc
  await expect(pipelinePage.productGrid).toBeVisible({ timeout: 15000 });
});

// ─────────────────────────────────────────────────────────────────────────────
// TC03 – Click sản phẩm từ Pipeline chuyển đến trang Product Detail đúng
// ─────────────────────────────────────────────────────────────────────────────
test('TC03 - Clicking a product navigates to the product detail page', async ({ page }) => {
  const pipelinePage = new PipelinePage(page);

  await pipelinePage.goto();
  await dismissCookies(page);

  // Click vào sản phẩm đầu tiên trong grid
  await pipelinePage.productGrid.click(); 
  await page.getByRole('button', { name: 'Product Details' }).click();

  // Chờ trang detail load
  await page.waitForURL(/\/products\/details\//i, { timeout: 20000 });

  // URL chứa đường dẫn product detail
  expect(page.url()).toMatch(/\/products\/details\//i);
});
