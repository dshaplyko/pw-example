import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class NavBar extends Component {
  readonly taskCount: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.taskCount = this.rootEl.locator("a[href*='tasks']").locator('p.count');
  }

  async clickLink(type: 'mobile' | 'desktop', link: TMenuLinks): Promise<void> {
    const el = type === 'desktop' ? 'div.link-item>span.label' : 'li';
    return this.rootEl.locator(el, { hasText: link }).click();
  }

  async getTaskCountAsNumber(): Promise<number> {
    const count = await this.taskCount.innerText();
    return parseInt(count, 10);
  }
}
