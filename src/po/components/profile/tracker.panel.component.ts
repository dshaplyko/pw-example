import { Locator } from '@playwright/test';
import { currentDay, currentMonthName, expectElementToContainText, expectElementVisibility, stringBuilder } from '../../../utils';
import Component from '../basic/component';

export default class TrackerPanel extends Component {
  readonly month: Locator;

  readonly points: Locator;

  readonly streak: Locator;

  readonly noStepsMessage: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.month = this.rootEl.locator('h6.calendar-month');
    this.points = this.rootEl.locator('div.points-display');
    this.streak = this.rootEl.locator('.streak');
    this.noStepsMessage = this.rootEl.locator('.fitness-tracker-calendar-display.noSteps');
  }

  async verifyTrackerPanel(): Promise<void> {
    await expectElementVisibility(this.rootEl);

    if (currentDay === 1) {
      await expectElementVisibility(this.noStepsMessage);
    } else {
      await expectElementToContainText(this.month, currentMonthName);
      await expectElementToContainText(this.points, stringBuilder('points'));
      await expectElementToContainText(this.streak, stringBuilder('streak'));
    }
  }
}
