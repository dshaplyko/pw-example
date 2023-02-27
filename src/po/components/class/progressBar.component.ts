import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class ProgressBar extends Component {
  readonly steps: Locator;

  readonly activeStep: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.steps = this.rootEl.locator('li.progress-item-box');
    this.activeStep = this.steps.locator('a.current');
  }

  async clickStepByIndex(index: number): Promise<void> {
    return this.steps.nth(index).click();
  }

  async clickEndProgress(): Promise<void> {
    return this.steps.last().click();
  }
}
