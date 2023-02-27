import { Locator } from '@playwright/test';

interface IComponent {
  readonly rootEl: Locator;
}

export default class Component implements IComponent {
  readonly rootEl: Locator;

  constructor(readonly locator: Locator) {
    this.rootEl = locator;
  }

  async waitForDisplayed(): Promise<void> {
    return this.rootEl.waitFor();
  }

  async selectOption(option: string): Promise<string[]> {
    return this.rootEl.selectOption(option);
  }
}
