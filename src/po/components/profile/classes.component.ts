import { Locator } from '@playwright/test';
import { getNumbersFromString } from '../../../utils';
import Component from '../basic/component';

export default class CardClasses extends Component {
  readonly heading: Locator;

  readonly completedClassesLabel: Locator;

  readonly classes: Locator;

  readonly emptyCard: Locator;

  readonly viewAvailableClassesLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.heading = this.rootEl.locator('div.class-heading');
    this.completedClassesLabel = this.heading.locator('div.class-count');
    this.classes = this.rootEl.locator('li.class-item');
    this.emptyCard = this.rootEl.locator('div.class-item');
    this.viewAvailableClassesLink = this.emptyCard.locator("a[href*='classes']");
  }

  private getClassProgress(index: number): Locator {
    return this.classes.nth(index).locator('p.text-weight-bold');
  }

  async getCompletedClassesCount(): Promise<number> {
    await this.completedClassesLabel.waitFor();
    const count = await this.completedClassesLabel.innerText();
    return getNumbersFromString(count);
  }

  async clickResultsInsightsLink(index: number): Promise<void> {
    return this.classes.nth(index).locator("a[href*='answers']").click();
  }

  getProgressText(index: number): Promise<string> {
    return this.getClassProgress(index).innerText();
  }
}
