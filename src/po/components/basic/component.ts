import { Locator, expect, test } from '@playwright/test';

export type ComponentProps = {
  name?: string;
  locator: Locator;
};
/**
 * Base class for all components
 */
export abstract class Component {
  readonly rootLocator: Locator;

  private name: string | undefined;

  constructor({ name, locator }: ComponentProps) {
    this.name = name;
    this.rootLocator = locator;
  }

  /**
   * @returns {string} - returns type of the component
   */
  get myType(): string {
    return 'Component';
  }

  /**
   * @returns {string} - returns name of the component
   */
  get componentName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  /**
   * Returns an error message for the given action.
   * The message includes the type of component, component name, root locator, and the action being performed.
   * @param action The action being performed.
   * @returns The error message.
   */
  getErrorMessage(action: string): string {
    return `The ${this.myType} with name "${this.componentName}" and locator ${this.rootLocator} ${action}`;
  }

  /**
   * Checks if the component is visible or not on the page.
   * @param visibility - A boolean indicating if the component should be visible.
   * @returns {Promise<void>} - returns promise
   */
  async shouldBeVisible(visibility = true): Promise<void> {
    const messageMap = {
      true: 'visible',
      false: 'not visible',
    };

    await test.step(`${this.myType} "${this.componentName}" should be ${messageMap[String(visibility)]} on the page`, async () => {
      await expect(this.rootLocator, { message: this.getErrorMessage('is not visible') }).toBeVisible({
        visible: visibility,
      });
    });
  }

  async shouldHaveText(text: string): Promise<void> {
    await test.step(`${this.myType} "${this.componentName}" should have text "${text}"`, async () => {
      await expect(this.rootLocator, { message: this.getErrorMessage(`does not have text "${text}"`) }).toContainText(text);
    });
  }

  /**
   * clicks on the component
   * @returns {Promise<void>} - returns promise
   */
  async click(): Promise<void> {
    await test.step(`Clicking the ${this.myType} with name "${this.componentName}"`, async () => {
      await this.rootLocator.click();
    });
  }
}
