import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PipelinePage extends BasePage {
  // Hero section
  readonly heroDescription: Locator;
  readonly getAlertsLink: Locator;

  // New Products section
  readonly newProductsByCategoryHeading: Locator;
  readonly categoryFilterM18: Locator;
  readonly categoryFilterM12: Locator;
  readonly productGrid: Locator;
  readonly loadMoreButton: Locator;

  // Explore the Systems section
  readonly exploreSystemsHeading: Locator;

  constructor(page: Page) {
    super(page);

    // Hero
    this.heroDescription  = page.getByText('Discover solutions that lead to safer');
    this.getAlertsLink    = page.getByRole('link', { name: 'Get New Product Alerts' });

    // Product section
    this.newProductsByCategoryHeading = page.getByRole('heading', { name: 'New Products By Category' });
    this.categoryFilterM18            = page.getByText('M18™', { exact: true });
    this.categoryFilterM12            = page.getByText('M12™', { exact: true });
    this.productGrid                  = page.locator('main').locator('a[href*="/products/details/"]').first();
    this.loadMoreButton               = page.getByRole('button', { name: 'Load More' });

    // Systems section
    this.exploreSystemsHeading = page.getByRole('heading', { name: 'Explore the Systems' });
  }

  async goto() {
    await this.navigate('/pipeline');
  }
}
