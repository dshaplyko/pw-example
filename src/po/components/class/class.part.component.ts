import { Locator } from '@playwright/test';
import Component from '../basic/component';

export default class ClassPart extends Component {
  readonly part: Locator;

  readonly title: Locator;

  readonly completeQuizButton: Locator;

  readonly checkMark: Locator;

  readonly readingMark: Locator;

  readonly readArticleLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.part = this.rootEl.locator('h2.part');
    this.title = this.rootEl.locator('div.title');
    this.completeQuizButton = this.rootEl.locator('a.specs-item');
    this.checkMark = this.rootEl.locator("a>svg[aria-labelledby='icon-check']");
    this.readingMark = this.rootEl.locator('div.specs-item.current');
    this.readArticleLink = this.rootEl.locator('a').filter({ hasText: 'Read article' });
  }

  nth(index: number): ClassPart {
    return new ClassPart(this.rootEl.nth(index));
  }
}
