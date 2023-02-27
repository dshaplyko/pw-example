import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Profile extends Component {
  readonly startExtraCreditButton: Locator;

  readonly viewAllExtraCreditButton: Locator;

  readonly rewardsTitle: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.startExtraCreditButton = this.rootEl.locator('a').filter({ hasText: 'Start extra credit' });
    this.viewAllExtraCreditButton = this.rootEl.locator('a').filter({ hasText: 'View all available Extra Credit' });
    this.rewardsTitle = this.rootEl.locator('p.rewards-cta__subtitle');
  }
}
