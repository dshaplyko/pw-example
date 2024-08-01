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
    const messageMap = {
      true: 'active',
      false: 'not active',
    };

    await test.step(`${this.myType} "${this.componentName}" should be ${messageMap[String(isActive)]} on the page`, async () => {
      const asrt = expect(this.rootLocator, { message: this.getErrorMessage(messageMap[String(isActive)]) });
      const assert = isActive ? asrt : asrt.not;
      await assert.toHaveAttribute('class', /active/);
    });
  }
}
