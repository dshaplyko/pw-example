import { Page, Locator } from '@playwright/test';
import { getNumbersFromString } from '../../utils';
import ClassPart from '../components/class/class.part.component';
import InterestModal from '../components/class/interest.modal.component';
import ProgressBar from '../components/class/progressBar.component';
import QuizArea from '../components/general/quiz.area.component';
import BasePage from './Base.page';

export default class Article extends BasePage {
  readonly title: Locator;

  readonly category: Locator;

  readonly points: Locator;

  readonly addToTasksButton: Locator;

  readonly removeFromTasksButton: Locator;

  readonly notInterestedButton: Locator;

  readonly description: Locator;

  readonly completetionTime: Locator;

  readonly content: Locator;

  readonly startQuizButton: Locator;

  readonly viewResultsButton: Locator;

  readonly progressLabel: Locator;

  readonly stepLabel: Locator;

  readonly nextPart: Locator;

  readonly nextPartTitle: Locator;

  readonly answersSummary: Locator;

  readonly earnedPoints: Locator;

  readonly correctAnswers: Locator;

  readonly readTime: Locator;

  readonly references: Locator;

  readonly classParts: ClassPart;

  readonly currentClass: ClassPart;

  readonly interestModal: InterestModal;

  readonly quizArea: QuizArea;

  readonly progressBar: ProgressBar;

  constructor(page: Page, readonly url: string) {
    super(page);
    this.url = url;
    this.title = this.page.locator('h1.title, h1.header');
    this.category = this.page.locator('div.label--category>.label__text');
    this.points = this.page.locator('span:has(>abbr.abbr--points)');
    this.addToTasksButton = this.page.locator('button').filter({ hasText: 'Add to tasks' });
    this.removeFromTasksButton = this.page.locator('button').filter({ hasText: 'Remove from tasks' });
    this.notInterestedButton = this.page.locator('button.interest');
    this.description = this.page.locator('p.description, .qr-block-container').first();
    this.completetionTime = this.page.locator('div.time');
    this.content = this.page.locator('div.classContainer');
    this.startQuizButton = this.page.locator('button.action-button');
    this.viewResultsButton = this.page.locator('button').filter({ hasText: 'View Results' });
    this.progressLabel = this.page.locator('div.title-label');
    this.stepLabel = this.page.locator('div.title-text');
    this.nextPart = this.page.locator('div.next-part__body');
    this.nextPartTitle = this.nextPart.locator('.next-part__label');
    this.earnedPoints = this.page.locator('span.part-stat__value');
    this.answersSummary = this.page.locator('div.answers-insights-wrapper');
    this.correctAnswers = this.answersSummary.locator('.answers-insights-correct').filter({ hasText: 'Correct!' });
    this.readTime = this.page.locator('div.read-time');
    this.references = this.page.locator('.segment-references');
    this.classParts = new ClassPart(this.page.locator('div.class-parts-container'));
    this.currentClass = new ClassPart(this.page.locator('div.class-parts-container.current'));
    this.interestModal = new InterestModal(this.page.locator('div.dialog-class-feedback').nth(1));
    this.quizArea = new QuizArea(this.page.locator('div.question-set'));
    this.progressBar = new ProgressBar(this.page.locator('ol.progress-list'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async getCurrentProgressStep(): Promise<string> {
    const currentProgress = await this.progressLabel.innerText();
    return currentProgress.match(/\d/)[0];
  }

  async getEarnedPoints(): Promise<number> {
    return getNumbersFromString(await this.earnedPoints.innerText());
  }

  getNextPartText(): Promise<string> {
    return this.nextPartTitle.innerText();
  }
}
