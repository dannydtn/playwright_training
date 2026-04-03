import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Header search
  readonly searchInput: Locator;

  // Featured products section
  readonly featuredProductsHeading: Locator;

  // Footer
  readonly footerContactUsLink: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput            = page.locator('input[name="search"]').first();
    this.featuredProductsHeading = page.getByRole('heading', { name: 'Featured Products' });
    this.footerContactUsLink    = page.locator('a[href="/contact"]').last();
  }

  async goto() {
    await this.navigate('/search');
  }

  async searchFor(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
