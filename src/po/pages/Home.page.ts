import { Page } from '@playwright/test';
import BasePage from './Base.page';

/**
 * Home page object class that extends the BasePage class.
 * @extends BasePage
 */
export default class HomePage extends BasePage {
  /**
   * Creates an instance of HomePage.
   * @param {Page} page - Playwright page object.
   * @param {string} [url='/'] - URL of the home page.
   */
  constructor(
    public page: Page,
    readonly url = '/',
  ) {
    super(page);
  }

  /**
   * Navigates to the home page URL.
   * @param {string} [url=this.url] - URL to navigate to.
   * @returns {Promise<void>}
   */
  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
