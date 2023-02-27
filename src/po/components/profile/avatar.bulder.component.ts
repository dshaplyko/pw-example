import { Locator } from '@playwright/test';
import Component from '../basic/component';
import ElementsCollection from '../basic/elements';

export default class AvatarBuilder extends Component {
  readonly discardAndExitButton: Locator;

  readonly saveAndExistButton: Locator;

  readonly categories: ElementsCollection;

  readonly options: ElementsCollection;

  readonly colors: ElementsCollection;

  constructor(locator: Locator) {
    super(locator);
    this.discardAndExitButton = this.rootEl.locator('button.close-lg');
    this.saveAndExistButton = this.rootEl.locator('button.avatar-builder__sidebar-btn');
    this.categories = new ElementsCollection(this.rootEl.locator('button.tablist-tab'));
    this.options = new ElementsCollection(this.rootEl.locator("div.avatar[role='option']"));
    this.colors = new ElementsCollection(this.rootEl.locator('div.swatch:not(.selected)'));
  }

  async selectAndRememberRandomOption(): Promise<string> {
    if (await this.colors.rootEl.first().isVisible()) await this.colors.selectAndRememberRandomItem();
    return this.options.selectAndRememberRandomItem();
  }
}
