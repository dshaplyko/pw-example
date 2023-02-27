import { Locator } from '@playwright/test';
import Component from '../basic/component';
import { getRandomNumber, Logger } from '../../../utils';
import ElementsCollection from '../basic/elements';

const logger = new Logger('Quiz');

export default class QuizArea extends Component {
  readonly area: Locator;

  readonly questionTitle: Locator;

  readonly nextButton: Locator;

  readonly previousButton: Locator;

  readonly options: ElementsCollection;

  readonly completeHeading: Locator;

  readonly extraCredits: Locator;

  readonly returnToDashboardLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.area = this.rootEl.locator("div.animated:not([style='display: none;']), div.main-view");
    this.questionTitle = this.rootEl.locator("h2.heading, div.animated:not([style='display: none;']) h2[id*='question-label']").first();
    this.nextButton = this.rootEl.locator('button.tab.right, button.tab-arrow-wrapper.arrow-outer.right');
    this.previousButton = this.rootEl.locator('button.tab.right, button.tab-arrow-wrapper.arrow-outer.left');
    this.options = new ElementsCollection(this.area.locator("label[id*='slide']"));
    this.completeHeading = this.rootEl.locator('h3.subheading');
    this.extraCredits = this.rootEl.locator('li.extra-credit__list__item');
    this.returnToDashboardLink = this.rootEl.locator('a.router-link-active');
  }

  async selectAndRememberRandomOption(): Promise<string> {
    const allOptionTitles: string[] = await this.options.getAllItemsText();
    const randomIndex = getRandomNumber(allOptionTitles.length - 1);
    logger.debug(`${allOptionTitles[randomIndex]}`);

    await this.options.clickItemByIndex(randomIndex);
    await this.nextButton.click({
      delay: 1000,
    });
    return allOptionTitles[randomIndex];
  }
}
