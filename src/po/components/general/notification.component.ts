import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Notification extends Component {
  readonly message: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.message = this.rootEl.locator('.message').last();
  }
}
