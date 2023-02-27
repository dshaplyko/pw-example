import { Locator, Page } from '@playwright/test';
import BasePage from './Base.page';
import { getEnv } from '../../utils';

const env = getEnv();

export default class LoginPage extends BasePage {
  readonly userNameInput: Locator;

  readonly passwordInput: Locator;

  readonly submitButton: Locator;

  constructor(page: Page, readonly url: string = '/') {
    super(page);
    this.url = url;
    this.userNameInput = this.page.locator('#username');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.locator('#kc-login');
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async login(input: TCreds = env.user): Promise<void> {
    await this.userNameInput.fill(input.email);
    await this.passwordInput.fill(input.password);
    await this.submitButton.click();
  }
}
