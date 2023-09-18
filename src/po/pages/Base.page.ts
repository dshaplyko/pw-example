import { Page, test } from '@playwright/test';
import { Header } from '../components/header.component';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

export default abstract class BasePage implements IPage {
  readonly header: Header;

  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header({ name: 'Header', locator: this.page.locator('.header__content') });
  }

  async goto(url: string): Promise<void> {
    await test.step(`Opening the url "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    });
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();

    await test.step(`Reloading page with url "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }
}
