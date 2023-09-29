import { Page, test } from '@playwright/test';
import { Header } from '../components/header.component';
import { Cookie } from '../components/cookie.component';
import config from '../../../playwright.config';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

/**
 * BasePage class is an abstract class that represents a base page object.
 * It implements the IPage interface and provides common functionality for all page objects.
 */
export default abstract class BasePage implements IPage {
  readonly header: Header;

  readonly cookie: Cookie;

  /**
   * Creates an instance of BasePage.
   * @param {Page} page - The Playwright page object.
   */
  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header({ name: 'Header', locator: this.page.locator('.header__content') });
    this.cookie = new Cookie({ name: 'Cookie', locator: this.page.locator('div#onetrust-banner-sdk') });
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} - A Promise that resolves when the navigation is complete.
   */
  async goto(url: string): Promise<void> {
    const urlToNavigate = config.use.baseURL + url;
    await test.step(`Opening the url "${urlToNavigate}"`, async () => {
      await this.page.goto(url, { waitUntil: 'load' });
    });
  }

  /**
   * Reloads the current page.
   * @returns {Promise<void>} - A Promise that resolves when the page is reloaded.
   */
  async reload(): Promise<void> {
    const currentUrl = this.page.url();

    await test.step(`Reloading page with url "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }

  /**
   * Saves the current storage state to a file.
   * @param {string} path - The path to the file where the storage state will be saved.
   * @returns {Promise<void>} - A Promise that resolves when the storage state is saved.
   */
  async saveStorageState(path: string): Promise<void> {
    await this.page.context().storageState({ path });
  }
}
