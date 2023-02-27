import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Editor extends Component {
  readonly name: Locator;

  readonly email: Locator;

  readonly birthday: Locator;

  readonly saveButton: Locator;

  readonly cancelButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.rootEl.locator('#profile-edit-name');
    this.email = this.rootEl.locator('#profile-edit-email');
    this.birthday = this.rootEl.locator('#profile-edit-birthday');
    this.saveButton = this.rootEl.locator('button.details-edit-link');
    this.saveButton = this.rootEl.locator('button').filter({ hasText: 'Save' });
    this.cancelButton = this.rootEl.locator('button').filter({ hasText: 'Cancel' });
  }

  async fillValue(field: 'name' | 'email' | 'birthday', value: string): Promise<void> {
    await this[field].fill(value);
    await this[field].press('Enter');
  }
}
