import { expect, Page } from '@playwright/test';
import Header from '../components/general/header.component';
import Api from '../api/api';
import NavBar from '../components/general/navBar.component';
import Notification from '../components/general/notification.component';
import Modal from '../components/general/modal.component';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

export default abstract class BasePage implements IPage {
  readonly api: Api;

  readonly header: Header;

  readonly url: string;

  readonly navBar: NavBar;

  readonly notificationBanner: Notification;

  readonly modal: Modal;

  readonly mobileNavBar: NavBar;

  readonly mobileHeader: Header;

  constructor(readonly page: Page) {
    this.api = new Api(this.page);
    this.page = page;
    this.header = new Header(this.page.locator('div.header-content'));
    this.navBar = new NavBar(this.page.locator('div.sidebar-scroll-container'));
    this.notificationBanner = new Notification(this.page.locator('.lNotify-wrapper:not(.notifyhidden)'));
    this.modal = new Modal(this.page.locator("div[role='dialog']"));
    this.mobileNavBar = new NavBar(this.page.locator('nav.footer'));
    this.mobileHeader = new Header(this.page.locator('div.mobile-header-content'));
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'load',
    });
  }

  async waitForPageToLoad(): Promise<void> {
    return this.header.rootEl.waitFor();
  }

  async checkPageUrl(url = this.url): Promise<void> {
    return expect(this.page).toHaveURL(new RegExp(url));
  }

  async pause(): Promise<void> {
    return this.page.pause();
  }

  async waitForUrlToChange(url: string | RegExp = /onboard|#\//): Promise<void> {
    return this.page.waitForURL(url);
  }
}
