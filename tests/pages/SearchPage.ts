import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly pageHeading: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput      = page.locator('input[name="search"]').first();
    this.pageHeading      = page.locator('h1').first();
    this.noResultsMessage = page.locator('text=No results found').or(page.locator('text=no results'));
  }

  async goto(query: string = '') {
    const path = query ? `/Search?q=${encodeURIComponent(query)}` : '/Search';
    await this.navigate(path);
  }

  async waitForResults() {
    // URL changes to /search?q=...&first=0 after results load
    await this.page.waitForURL(/search\?q=/i, { timeout: 20000 });
  }

}
