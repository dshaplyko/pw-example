import { Locator, expect, test } from '@playwright/test';

export type ComponentProps = {
  name?: string;
  locator: Locator;
};

/**
 * Base class for all components
 */
export class Component {
  readonly rootLocator: Locator;

  private name: string | undefined;

  constructor({ name, locator }: ComponentProps) {
    /**
     * Locator of the root element of the component
     * @type {Locator}
     */
    this.rootLocator = locator;

    /**
     * Name of the component
     * @type {string | undefined}
     */
    this.name = name;
  }

  /**
   * Type of the component
   * @returns {string} - returns type of the component
   */
  get myType(): string {
    return 'Component';
  }

  /**
   * Name of the component
   * @returns {string} - returns name of the component
   * @throws {Error} - if name is not provided
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
   * @param {string} action - The action being performed.
   * @returns {string} - The error message.
   */
  getErrorMessage(action: string): string {
    return `The ${this.myType} with name "${this.componentName}" and locator ${this.rootLocator} ${action}`;
  }

  /**
   * Checks if the component is visible or not on the page.
   * @param {boolean} visibility - A boolean indicating if the component should be visible.
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

  /**
   * Checks if the component has the given text.
   * @param {string} text - The text to check for.
   * @returns {Promise<void>} - returns promise
   */
  async shouldHaveText(text: string): Promise<void> {
    await test.step(`${this.myType} "${this.componentName}" should have text "${text}"`, async () => {
      await expect(this.rootLocator, { message: this.getErrorMessage(`does not have text "${text}"`) }).toContainText(text);
    });
  }

  /**
   * Checks if the component has the given class.
   * @param {string | RegExp} text - The class name or regular expression to check for.
   * @returns {Promise<void>} - returns promise
   */
  async shouldHaveClass(text: string | RegExp): Promise<void> {
    await test.step(`${this.myType} "${this.componentName}" should have class "${text}"`, async () => {
      await expect(this.rootLocator, { message: this.getErrorMessage(`does not have class "${text}"`) }).toHaveClass(text);
    });
  }

  /**
   * Clicks on the component.
   * @returns {Promise<void>} - returns promise
   */
  async click(): Promise<void> {
    await test.step(`Clicking the ${this.myType} with name "${this.componentName}"`, async () => {
      await this.rootLocator.click();
    });
  }
}
