import { Locator, Page } from '@playwright/test';
import { profileClassesData, profileResponseData, URLs } from '../../data';
import AvatarBuilder from '../components/profile/avatar.bulder.component';
import CardClasses from '../components/profile/classes.component';
import Details from '../components/profile/details.component';
import Editor from '../components/profile/editor.component';
import TrackerPanel from '../components/profile/tracker.panel.component';
import BasePage from './Base.page';

export default class ProfilePage extends BasePage {
  readonly profileDetails: Details;

  readonly fitnessDetails: Locator;

  readonly viewCollapseClassesButton: Locator;

  readonly healthClasses: CardClasses;

  readonly financeClasses: CardClasses;

  readonly mindsetClasses: CardClasses;

  readonly editDetails: Editor;

  readonly avatarBuilder: AvatarBuilder;

  readonly fitnessTrackerPanel: TrackerPanel;

  constructor(page: Page, readonly url: string = '#/profile') {
    super(page);
    this.url = url;
    this.profileDetails = new Details(this.page.locator('div.details-section'));
    this.fitnessDetails = this.page.locator('div.tracker-panel');
    this.viewCollapseClassesButton = this.page.locator('button').filter({ hasText: 'completed classes' });
    this.healthClasses = new CardClasses(this.page.locator('div#history-health'));
    this.financeClasses = new CardClasses(this.page.locator('div#history-finance'));
    this.mindsetClasses = new CardClasses(this.page.locator('div#history-mindset'));
    this.editDetails = new Editor(this.page.locator('div.details-editor'));
    this.avatarBuilder = new AvatarBuilder(this.page.locator('div.avatar-builder'));
    this.fitnessTrackerPanel = new TrackerPanel(this.page.locator('div.fitness-tracker-panel'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async mockClassesHistory(body: typeof profileClassesData = []): Promise<void> {
    await this.api.mockNetworkResponse(URLs.PROFILE_CLASSES, body);
    await this.goto();
  }

  async mockProfileData(body: typeof profileResponseData): Promise<void> {
    await this.api.mockNetworkResponse(URLs.PROFILE, body);
    return this.goto();
  }
}
