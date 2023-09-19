import test from '@playwright/test';
import { Component } from './component';

export class Button extends Component {
  get myType(): string {
    return 'button';
  }

  /**
   * hover the component
   * @returns {Promise<void>} - returns promise
   */
  async hover(): Promise<void> {
    await test.step(`Hovering the ${this.myType} with name "${this.componentName}"`, async () => {
      await this.rootLocator.hover();
    });
  }

  async doubleClick() {
    await test.step(`Double clicking ${this.myType} with name "${this.componentName}"`, async () => {
      await this.rootLocator.dblclick();
    });
  }
}
