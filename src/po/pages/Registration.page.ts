import { Locator, Page } from '@playwright/test';
import { SELF_REGISTER_LINK } from '../../data';
import BasePage from './Base.page';

export default class RegistrationPage extends BasePage {
  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly continueButton: Locator;

  constructor(page: Page, readonly url: string = '/') {
    super(page);
    this.url = url;
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.continueButton = this.page.locator("input[value='Continue']");
  }

  private async openSelfRegister(): Promise<void> {
    await this.goto(SELF_REGISTER_LINK);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/registration/);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async registerUser(email: string, password: string): Promise<void> {
    await this.openSelfRegister();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}
