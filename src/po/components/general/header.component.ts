import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class Header extends Component {
  readonly getMyQuoteButton: Locator;

  readonly signInButton: Locator;

  readonly logoutButton: Locator;

  readonly startApplicationButton: Locator;

  readonly rewardsLink: Locator;

  readonly profileLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.getMyQuoteButton = this.rootEl.locator("a[aria-label='Get my quote']");
    this.signInButton = this.rootEl.locator('[data-test=login-button]');
    this.logoutButton = this.rootEl.locator('[data-test=logout-button]');
    this.startApplicationButton = this.rootEl.locator("button[aria-label='Start application']");
    this.rewardsLink = this.rootEl.locator('a[href*=rewards]');
    this.profileLink = this.rootEl.locator('a[href*=profile]');
  }

  async getRewardsPoints(): Promise<string> {
    const pointsText = await this.rewardsLink.innerText();
    const re = /\d+/g;
    return pointsText.match(re)[0];
  }
}
