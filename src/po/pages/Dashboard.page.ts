import { Page } from '@playwright/test';
import { URLs } from '../../data';
import Profile from '../components/dashboard/profile.component';
import Section from '../components/dashboard/section.component';
import BasePage from './Base.page';

export default class DashboardPage extends BasePage {
  readonly profile: Profile;

  readonly yourTasks: Section;

  readonly yourGoals: Section;

  readonly quickReads: Section;

  constructor(page: Page, readonly url: string = '/') {
    super(page);
    this.url = url;
    this.profile = new Profile(this.page.locator('section.vp-widget'));
    this.yourTasks = new Section(this.page.locator('section.task-list'));
    this.yourGoals = new Section(this.page.locator('div.classesRecommended'));
    this.quickReads = new Section(this.page.locator('section.quick-read'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  mockEmptyTasksList(): Promise<void> {
    return this.page.route(URLs.DASHBOARD_TASKS, async route => {
      const response = await route.fetch();
      let json = await response.json();
      json = json.map((record: TRecord) => ({
        ...record,
        status: 'canceled',
      }));
      return route.fulfill({ response, json });
    });
  }
}
