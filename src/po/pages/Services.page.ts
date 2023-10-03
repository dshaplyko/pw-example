import { Page } from '@playwright/test';
import BasePage from './Base.page';
import { Label } from '../components/basic/label';

export default class ServicesPage extends BasePage {
  readonly servicesTitle: Label;

  constructor(
    public page: Page,
    readonly url = '/services',
  ) {
    super(page);
    this.servicesTitle = new Label({ name: 'Services Title', locator: this.page.locator('.gradient-text', { hasText: 'Services' }) });
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
