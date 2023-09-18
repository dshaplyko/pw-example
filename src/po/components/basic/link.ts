import { expect, test } from '@playwright/test';
import { Component } from './component';

export class Link extends Component {
  get myType(): string {
    return 'link';
  }

  /**
   * @returns {Promise<void>} - returns promise
   */
  async shouldBeActive(isActive = true): Promise<void> {
    await test.step(`${this.myType} "${this.componentName}" should be active=${isActive} on the page`, async () => {
      const assert = isActive
        ? expect(this.rootLocator, { message: this.getErrorMessage('is not active') })
        : expect(this.rootLocator, { message: this.getErrorMessage('is active') }).not;
      await assert.toHaveAttribute('class', /active/);
    });
  }
}
