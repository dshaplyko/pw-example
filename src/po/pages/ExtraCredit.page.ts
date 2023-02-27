import { Page } from '@playwright/test';
import BasePage from './Base.page';
import QuizArea from '../components/general/quiz.area.component';

export default class ExtraCredit extends BasePage {
  readonly mainArea: QuizArea;

  constructor(page: Page, readonly url: string = '#/extra-credit') {
    super(page);
    this.url = url;
    this.mainArea = new QuizArea(this.page.locator('main#main'));
  }
}
