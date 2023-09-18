import { Link } from './basic/link';
import { Component, ComponentProps } from './basic/component';

export class Cookie extends Component {
  readonly acceptAllLink: Link;

  constructor({ name, locator }: ComponentProps) {
    super({ name, locator });
    this.acceptAllLink = new Link({
      name: 'Accept All',
      locator: this.rootLocator.locator('button#onetrust-accept-btn-handler'),
    });
  }
}
