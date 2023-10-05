import { Link } from './basic/link';
import { Component, ComponentProps } from './basic/component';
import { Button } from './basic/button';

export class Header extends Component {
  readonly servicesLink: Link;

  readonly themeSwitcher: Button;

  readonly searchButton: Button;

  constructor({ name, locator }: ComponentProps) {
    super({ name, locator });
    this.servicesLink = new Link({
      name: 'Services',
      locator: this.rootLocator.locator('.top-navigation__item-link[href="/services"]'),
    });
    this.themeSwitcher = new Button({ name: 'Theme Switcher', locator: this.rootLocator.locator('a.desktop-logo~section>div>div.switch') });
    this.searchButton = new Button({ name: 'Search Button', locator: this.rootLocator.locator('div.header-search-ui') });
  }
}
