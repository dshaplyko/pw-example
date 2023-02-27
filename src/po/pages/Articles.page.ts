import { Page, Locator } from '@playwright/test';
import { quizData, URLs, userData } from '../../data/index';
import { getNumbersFromString } from '../../utils/index';
import Cards from '../components/general/cards.component';
import BasePage from './Base.page';

export default class ArticlesPage extends BasePage {
  readonly title: Locator;

  readonly classFilter: Locator;

  readonly availableClasses: Cards;

  readonly completedClasses: Cards;

  readonly quickReads: Cards;

  constructor(page: Page, readonly url: string) {
    super(page);
    this.url = url;
    this.title = this.page.locator('div.classes-content>h1, h2#quickReads-title');
    this.classFilter = this.page.locator('ul.filter-list');
    this.availableClasses = new Cards(this.page.locator('div.classMap').first().locator('div.l-class-card'));
    this.completedClasses = new Cards(this.page.locator('div.classMap').nth(1).locator('div.l-class-card'));
    this.quickReads = new Cards(this.page.locator('div.article-card'));
  }

  getFilterOption(option: TClasses): Locator {
    return this.classFilter.locator('button').filter({ hasText: option });
  }

  async filterClassesBy(option: TClasses): Promise<void> {
    await this.goto();
    return this.getFilterOption(option).click();
  }

  async getFilterCount(option: TClasses): Promise<number> {
    const count = await this.getFilterOption(option).locator('div.count').innerText();
    return getNumbersFromString(count);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async mockQuizInitiation(data: typeof quizData): Promise<void> {
    await this.api.mockNetworkResponse(URLs.CLASS_PAYLOAD, data);
  }

  async mockQuizCompletion(): Promise<void> {
    const responseData = { ...quizData };
    responseData.userData = userData;
    await this.api.mockNetworkResponse(URLs.CLASS_QUIZ_RESULT, responseData);
  }

  async unMockQuizResults(): Promise<void> {
    await this.api.unroute(URLs.CLASS_PAYLOAD);
    return this.api.unroute(URLs.CLASS_QUIZ_RESULT);
  }
}
