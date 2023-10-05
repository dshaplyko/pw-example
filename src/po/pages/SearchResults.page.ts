import { Page } from '@playwright/test';
import BasePage from './Base.page';
import { Label } from '../components/basic/label';

/**
 * SearchResults class represents the search results page of the application.
 * @extends BasePage
 */
export default class SearchResults extends BasePage {
  readonly searchResultsCounter: Label;

  constructor(
    public page: Page,
    readonly url = '/search',
  ) {
    super(page);
    this.searchResultsCounter = new Label({ name: 'Search Results Counter', locator: this.page.locator('h2.search-results__counter') });
  }

  /**
   * Navigates to the search results page.
   * @param {string} [url=this.url] - The URL of the search results page.
   * @returns {Promise<void>}
   */
  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async shouldHaveProperResultsLabel(term: string): Promise<void> {
    const checkRegexp = new RegExp(`\\d+ results for "${term}"`);
    await this.searchResultsCounter.shouldHaveText(checkRegexp);
  }
}
