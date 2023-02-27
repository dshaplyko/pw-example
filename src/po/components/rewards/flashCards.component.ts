import { Locator } from '@playwright/test';
import { getNumbersFromString } from '../../../utils';
import ElementsCollection from '../basic/elements';

export default class FlashCards extends ElementsCollection {
  readonly redeemButton: Locator;

  readonly pointsValue: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.redeemButton = this.rootEl.locator('button.redemption-button');
    this.pointsValue = this.rootEl.locator('.point-cost');
  }

  nth(index: number): FlashCards {
    return new FlashCards(this.rootEl.nth(index));
  }

  async getPointsValue(): Promise<number> {
    return getNumbersFromString(await this.pointsValue.innerText());
  }
}
