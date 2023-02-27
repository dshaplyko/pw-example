import { Page, Locator, expect } from '@playwright/test';
import { expectArraySorted, expectElementVisibility, getRandomNumber, Logger } from '../../utils';
import { URLs } from '../../data';
import Component from '../components/basic/component';
import Cards from '../components/general/cards.component';
import BasePage from './Base.page';

const logger = new Logger('Tasks');

export default class TasksPage extends BasePage {
  readonly editTasksButton: Locator;

  readonly cards: Cards;

  readonly title: Locator;

  readonly sorting: Component;

  readonly emptyCard: Locator;

  readonly classesLink: Locator;

  constructor(page: Page, readonly url: string = '#/tasks') {
    super(page);
    this.url = url;
    this.editTasksButton = this.page.locator('button.task-edit-mode');
    this.cards = new Cards(this.page.locator('li.l-card-wrapper'));
    this.title = this.page.locator('h2.task-title');
    this.sorting = new Component(this.page.locator('select#sort'));
    this.emptyCard = this.page.locator('div.l-empty-card');
    this.classesLink = this.emptyCard.locator('a');
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async removeCard(index: number): Promise<void> {
    await this.editTasksButton.click();
    await this.cards.removeByIndex(index);
  }

  private async mockTasksResponse(mock: 'empty' | 'sorting'): Promise<void> {
    await this.page.route(URLs.TASKS, async route => {
      const response = await route.fetch();
      let json = await response.json();
      if (mock === 'empty') {
        json = json.records.map((record: TRecord) => ({
          ...record,
          status: 'cancelled',
          payload: null,
        }));
      } else {
        for (const record of json.records) {
          logger.info(`tasks response: ${JSON.stringify(json.records)}`);
          record.progress = getRandomNumber(100);
        }
      }

      return route.fulfill({ response, json });
    });
    await this.page.waitForResponse(URLs.TASKS, {
      timeout: 5000,
    });
  }

  mockEmptyTasksList(): Promise<void> {
    return this.mockTasksResponse('empty');
  }

  async prepareTasksForSorting(): Promise<void> {
    return this.mockTasksResponse('sorting');
  }

  async verifyTasksSorting(): Promise<void> {
    return expect(async () => {
      await this.goto();
      await this.prepareTasksForSorting();
      await this.sorting.selectOption('Highest percentage complete');
      expectArraySorted(await this.cards.getProgresses(), 'descending');

      await this.sorting.selectOption('Lowest percentage complete');
      expectArraySorted(await this.cards.getProgresses(), 'ascending');
    }).toPass();
  }

  async verifyEmptyTasksPage(): Promise<void> {
    return expect(async () => {
      await this.goto();
      await this.mockEmptyTasksList();
      await expectElementVisibility(this.emptyCard);

      await this.classesLink.click();
      await this.checkPageUrl('class');
    }).toPass();
  }
}
