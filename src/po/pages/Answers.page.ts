import { Page, Locator } from '@playwright/test';
import BasePage from './Base.page';

export default class AnswersPage extends BasePage {
  readonly progress: Locator;

  constructor(page: Page, readonly url: string = '#/answers') {
    super(page);
    this.url = url;
    this.progress = this.page.locator('span.part-stat__label');
  }
}
