import { Page } from '@playwright/test';
import BasePage from './Base.page';
import { Label } from '../components/basic/label';

/**
 * ServicesPage class represents the services page of the application.
 * @extends BasePage
 */
export default class ServicesPage extends BasePage {
  /** The title of the services page. */
  readonly servicesTitle: Label;

  constructor(
    public page: Page,
    readonly url = '/services',
  ) {
    super(page);
    this.servicesTitle = new Label({ name: 'Services Title', locator: this.page.locator('.gradient-text', { hasText: 'Services' }) });
  }

  /**
   * Navigates to the services page.
   * @param {string} [url=this.url] - The URL of the services page.
   * @returns {Promise<void>}
   */
  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
