import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Modal extends Component {
  readonly title: Locator;

  readonly message: Locator;

  readonly okButton: Locator;

  readonly closeButton: Locator;

  readonly claimButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootEl.locator('h1.q-dialog__title, .header-copy, div.onboarding-modal-title');
    this.message = this.rootEl.locator('div.q-dialog__message, .copy-text');
    this.okButton = this.rootEl.locator('button').filter({ hasText: 'OK' });
    this.closeButton = this.rootEl.locator('button.close-button');
    this.claimButton = this.rootEl.locator('button.claim-btn');
  }
}
