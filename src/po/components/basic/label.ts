import { Component } from './component';

/**
 * Represents a label component.
 * @extends Component
 */
export class Label extends Component {
  /**
   * Returns the type of the label component.
   * @returns {string} The type of the label component.
   */
  get myType(): string {
    return 'label';
  }
}
