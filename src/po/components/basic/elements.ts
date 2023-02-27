import { Locator } from '@playwright/test';
import { getRandomNumber, Logger } from '../../../utils';
import Component from './component';

const logger = new Logger('Collection');

export default class ElementsCollection extends Component {
  getItemByIndex(index: number): Locator {
    return this.rootEl.nth(index);
  }

  async getItemsNumber(): Promise<number> {
    await this.rootEl.first().waitFor();
    return this.rootEl.count();
  }

  getItemTextByIndex(index: number): Promise<string> {
    return this.rootEl.nth(index).innerText();
  }

  async clickItemByIndex(index: number): Promise<void> {
    return this.getItemByIndex(index).click();
  }

  async clickItemByText(text: string): Promise<void> {
    return this.rootEl.filter({ hasText: text }).first().click();
  }

  async getAllItemsText(): Promise<string[]> {
    await this.rootEl.first().waitFor();
    return this.rootEl.allInnerTexts();
  }

  async selectAndRememberRandomItem(): Promise<string> {
    const allCategories = await this.getAllItemsText();
    const randomIndex = getRandomNumber(allCategories.length - 1);
    logger.info(`Selected item is '${allCategories[randomIndex]}'`);
    await this.clickItemByIndex(randomIndex);

    return allCategories[randomIndex];
  }

  nth(index: number): Component {
    return new Component(this.rootEl.nth(index));
  }
}
