import { Link } from './basic/link';
import { Component, ComponentProps } from './basic/component';
import { Logger } from '../../utils';

const logger = new Logger('Cookie overlay');

export class Cookie extends Component {
  readonly acceptAllLink: Link;

  constructor({ name, locator }: ComponentProps) {
    super({ name, locator });
    this.acceptAllLink = new Link({
      name: 'Accept All',
      locator: this.rootLocator.locator('button#onetrust-accept-btn-handler'),
    });
  }

  async closeBanner(): Promise<void> {
    await this.shouldBeVisible();

    await this.acceptAllLink.click();
    await this.shouldBeVisible(false);
    logger.info('closed');
  }
}
