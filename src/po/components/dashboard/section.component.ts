import { Locator } from '@playwright/test';
import Cards from '../general/cards.component';
import Component from '../basic/component';

export default class Section extends Component {
  readonly title: Locator;

  readonly viewAllButton: Locator;

  readonly cards: Cards;

  readonly emptyCard: Locator;

  readonly goalName: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootEl.locator('h2');
    this.viewAllButton = this.rootEl.locator("#view-all-link, a[class*='list-link'], a.classes-link");
    this.cards = new Cards(this.rootEl.locator('li>div.l-class-card, li>div.l-article-card, div.class-preview-container'));
    this.emptyCard = this.rootEl.locator('div#empty');
    this.goalName = this.rootEl.locator('h3.goal-name');
  }
}
