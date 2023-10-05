import { test } from '@playwright/test';
import { Component } from './component';

export class Input extends Component {
  get myType(): string {
    return 'Input';
  }

  async typeText(text: string): Promise<void> {
    await test.step(`${this.myType} "${this.componentName}" should be filled in with "${text}" text`, async () => {
      await this.rootLocator.fill(text);
    });
  }
}
