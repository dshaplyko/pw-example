import { Component, ComponentProps } from './basic/component';
import { Button } from './basic/button';
import { Input } from './basic/input';

export class SearchPanel extends Component {
  readonly searchInput: Input;

  readonly findButton: Button;

  constructor({ name, locator }: ComponentProps) {
    super({ name, locator });
    this.searchInput = new Input({ name: 'Search Input', locator: this.rootLocator.locator('input#new_form_search') });
    this.findButton = new Button({ name: 'Find Button', locator: this.rootLocator.locator('span.bth-text-layer') });
  }

  async searchFor(text: string): Promise<void> {
    await this.searchInput.typeText(text);
    await this.findButton.click();
  }
}
