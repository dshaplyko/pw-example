import { Page, Locator, test } from '@playwright/test';
import BasePage from './Base.page';
import QuizArea from '../components/general/quiz.area.component';
import Modal from '../components/general/modal.component';
import ElementsCollection from '../components/basic/elements';
import { Logger } from '../../utils';

const logger = new Logger('Onboarding Flow');

export default class OnboardingPage extends BasePage {
  readonly continueButton: Locator;

  readonly quizArea: QuizArea;

  readonly onboardingModal: Modal;

  readonly goals: ElementsCollection;

  readonly onboardingContent: Locator;

  readonly onboardingHeading: Locator;

  readonly firstNameInput: Locator;

  readonly lastNameInput: Locator;

  readonly months: ElementsCollection;

  readonly days: ElementsCollection;

  readonly genders: ElementsCollection;

  readonly year: Locator;

  constructor(page: Page, readonly url: string = '#/onboard') {
    super(page);
    this.url = url;
    this.continueButton = this.page.locator('button', { hasText: 'Continue' });
    this.quizArea = new QuizArea(this.page.locator('div.question-set'));
    this.onboardingModal = new Modal(this.page.locator('div.onboarding-modal-content'));
    this.goals = new ElementsCollection(this.page.locator('div.item'));
    this.onboardingContent = this.page.locator('div.onboarding-content');
    this.onboardingHeading = this.page.locator('h1.onboarding-subtitle, div.title-h5');
    this.firstNameInput = this.page.locator('input#edit-firstName');
    this.lastNameInput = this.page.locator('input#edit-lastName');
    this.months = new ElementsCollection(this.page.locator("div[aria-label='SELECT MONTH']>div"));
    this.days = new ElementsCollection(this.page.locator("div[aria-label='SELECT DAY']>div"));
    this.year = this.page.locator("label[for='input-year']~input");
    this.genders = new ElementsCollection(this.page.locator('div.gender-selector>label'));
  }

  async clickContinue(): Promise<void> {
    return this.continueButton.click({
      delay: 1000,
    });
  }

  async selectGoal(): Promise<string> {
    const chosenGoal = await this.goals.selectAndRememberRandomItem();
    await this.clickContinue();
    return chosenGoal;
  }

  async checkIfOnboardingNeeded(): Promise<void> {
    if (await this.onboardingContent.isHidden()) {
      logger.info('onboarding already happened, skiping it');
      test.skip();
    } else {
      logger.info('going through onboarding process...');
    }
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
