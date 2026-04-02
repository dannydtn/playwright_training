import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL = 'https://www.milwaukeetool.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async dismissCookieBanner() {
    const acceptBtn = this.page.getByRole('button', { name: 'Accept All Cookies' });
    if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptBtn.click();
    }
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
}
