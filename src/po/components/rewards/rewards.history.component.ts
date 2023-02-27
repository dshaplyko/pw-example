import { Locator } from '@playwright/test';
import Modal from '../general/modal.component';

export default class RewardsHistory extends Modal {
  readonly rewardItems: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.rewardItems = this.rootEl.locator('.reward-row-items');
  }
}
