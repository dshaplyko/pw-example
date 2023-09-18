import { Link } from './basic/link';
import { Component, ComponentProps } from './basic/component';

export class Header extends Component {
  readonly servicesLink: Link = new Link({
    name: 'Services',
    locator: this.rootLocator.locator('.top-navigation__item-link[href="/services"]'),
  });

  constructor({ name, locator }: ComponentProps) {
    super({ name, locator });
  }
}
