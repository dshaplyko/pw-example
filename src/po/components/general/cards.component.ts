import { Locator } from '@playwright/test';
import { getNumbersFromString, getRandomNumber, Logger } from '../../../utils';
import ElementsCollection from '../basic/elements';

const logger = new Logger('Cards');
const locators = {
  progress: 'div.progress-bar-label',
  buttonAddToTask: 'button.class-preview__add-btn, button.add-button',
  addedState: '.added-state',
  closeButton: 'button.close-btn',
};

export default class Cards extends ElementsCollection {
  readonly titles: ElementsCollection;

  readonly progressBars: ElementsCollection;

  constructor(locator: Locator) {
    super(locator);
    this.titles = new ElementsCollection(this.rootEl.locator('h3.class-title, a.spotlight'));
    this.progressBars = new ElementsCollection(this.rootEl.locator(locators.progress));
  }

  private checkIfProgressed(index: number): Promise<boolean> {
    return this.getItemByIndex(index).locator(locators.progress).isVisible();
  }

  private async findNonProgressedCard(): Promise<number> {
    const count = await this.getItemsNumber();
    let index: number;
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < count; i++) {
      if (!(await this.checkIfProgressed(i))) {
        index = i;
        break;
      }
    }
    return index;
  }

  async getProgresses(): Promise<number[]> {
    const progresses = await this.progressBars.getAllItemsText();
    return progresses.map(item => getNumbersFromString(item));
  }

  async addCardToTaskByText(text: string): Promise<void> {
    return this.rootEl.filter({ hasText: text }).first().locator(locators.buttonAddToTask).click();
  }

  async addCardToTaskByIndex(index: number): Promise<void> {
    return this.getItemByIndex(index).locator(locators.buttonAddToTask).click();
  }

  async removeByIndex(index: number): Promise<void> {
    return this.getItemByIndex(index).locator(locators.closeButton).click();
  }

  async checkIfAdded(card: number | string): Promise<boolean> {
    if (typeof card === 'number') {
      return this.getItemByIndex(card).locator(locators.addedState).isVisible();
    }
    return this.rootEl.filter({ hasText: card }).first().locator(locators.addedState).isVisible();
  }

  async selectAndRememberRandomCard(): Promise<string> {
    const allCardTitles: string[] = await this.titles.getAllItemsText();
    const randomIndex = getRandomNumber(allCardTitles.length - 1);
    logger.info(`Selected card is '${allCardTitles[randomIndex]}'`);

    await this.clickItemByIndex(randomIndex);
    return allCardTitles[randomIndex];
  }

  async selectAndRememberNonProgressedCard(): Promise<string> {
    const index = await this.findNonProgressedCard();
    const chosenTitle = await this.titles.getItemTextByIndex(index);
    logger.info(`Selected card is '${chosenTitle}'`);

    await this.clickItemByIndex(index);
    return chosenTitle;
  }
}
