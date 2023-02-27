import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Details extends Component {
  readonly name: Locator;

  readonly email: Locator;

  readonly birthday: Locator;

  readonly editYourInfoButton: Locator;

  readonly customizeYourCharacterButton: Locator;

  readonly logoffButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.rootEl.locator('h2.details-section__label');
    this.email = this.rootEl.locator('#details-email');
    this.birthday = this.rootEl.locator('#details-birthday');
    this.editYourInfoButton = this.rootEl.locator('button.details-edit-link');
    this.customizeYourCharacterButton = this.rootEl.locator('button.full-edit-link');
    this.logoffButton = this.rootEl.locator('button.full-logoff');
  }

  getName(): Promise<string> {
    return this.name.innerText();
  }
}
