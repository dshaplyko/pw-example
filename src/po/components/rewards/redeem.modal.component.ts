import { Locator } from '@playwright/test';
import Modal from '../general/modal.component';

export default class RedeemModal extends Modal {
  readonly confirmButton: Locator;

  readonly chooseRewardButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.confirmButton = this.rootEl.locator('button.confirm-button');
    this.chooseRewardButton = this.rootEl.locator('a').filter({ hasText: 'Choose a reward' });
  }
}
