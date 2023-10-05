import { Page, expect, test } from '@playwright/test';
import { Header } from '../components/header.component';
import { Cookie } from '../components/cookie.component';
import config from '../../../playwright.config';
import { Component } from '../components/basic/component';
import { SearchPanel } from '../components/search.panel.component';

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

  readonly body: Component;

  readonly searchPanel: SearchPanel;

  /**
   * Creates an instance of BasePage.
   * @param {Page} page - The Playwright page object.
   */
  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header({ name: 'Header', locator: this.page.locator('.header__content') });
    this.cookie = new Cookie({ name: 'Cookie', locator: this.page.locator('div#onetrust-banner-sdk') });
    this.searchPanel = new SearchPanel({ name: 'Search Panel', locator: this.page.locator('div.header-search__panel') });
    this.body = new Component({ name: 'Body', locator: this.page.locator('body') });
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

  /**
   * Checks if the page has the specified theme.
   * @param theme - The theme to check for.
   */
  async shouldHaveTheme(theme: 'dark' | 'light'): Promise<void> {
    await this.body.shouldHaveClass(new RegExp(`${theme}-mode`));
  }

  async shouldHaveUrl(url: string): Promise<void> {
    await test.step(`page should have "${url}" url`, async () => {
      await expect(this.page).toHaveURL(new RegExp(url));
    });
  }
}
