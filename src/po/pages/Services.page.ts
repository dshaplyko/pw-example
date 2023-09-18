import { Page } from '@playwright/test';
import BasePage from './Base.page';

export default class ServicesPage extends BasePage {
  constructor(
    public page: Page,
    readonly url = '/services',
  ) {
    super(page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
