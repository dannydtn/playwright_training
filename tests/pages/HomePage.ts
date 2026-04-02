import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Header
  readonly logo: Locator;
  readonly searchInput: Locator;

  // Hero / Body sections
  readonly exploreSystemsSection: Locator;
  readonly packoutSection: Locator;

  // Footer
  readonly footerContactUsLink: Locator;

  constructor(page: Page) {
    super(page);
    // Header
    this.logo            = page.locator('.fill-WHITE.h-full');
    this.searchInput     = page.locator('.searchbar__wrapper input[name="search"]');

    // Body
    this.exploreSystemsSection = page.getByRole('heading', { name: 'EXPLORE THE SYSTEMS' });
    this.packoutSection       = page.getByText('Modular Storage System');

    // Footer
    this.footerContactUsLink  = page.locator('a[href="/contact"]').last();
  }

  async goto() {
    await this.navigate('/');
  }

  async searchFor(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
