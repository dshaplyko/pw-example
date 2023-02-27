import { Locator } from '@playwright/test';
import ElementsCollection from '../basic/elements';
import Modal from '../general/modal.component';

export default class InterestModal extends Modal {
  readonly title: Locator;

  readonly cancelButton: Locator;

  readonly submitButton: Locator;

  readonly options: ElementsCollection;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootEl.locator('h2#question-label-0');
    this.cancelButton = this.rootEl.locator('button').filter({ hasText: 'Cancel' });
    this.submitButton = this.rootEl.locator('button').filter({ hasText: 'Submit' });
    this.options = new ElementsCollection(this.rootEl.locator("label[id*='slide']"));
  }
}
