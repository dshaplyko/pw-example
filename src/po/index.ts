import { test as baseTest, Page } from '@playwright/test';
import LoginPage from './pages/Login.page';
import DashboardPage from './pages/Dashboard.page';
import ArticlePage from './pages/Article.page';
import TasksPage from './pages/Tasks.page';
import RewardsPage from './pages/Rewards.page';
import ProfilePage from './pages/Profile.page';
import AnswersPage from './pages/Answers.page';
import ExtraCredit from './pages/ExtraCredit.page';
import ArticlesPage from './pages/Articles.page';
import OnboardingPage from './pages/Onboarding.page';
import RegistrationPage from './pages/Registration.page';

export default class App {
  constructor(readonly page: Page) {
    this.page = page;
  }

  get loginPage() {
    return new LoginPage(this.page);
  }

  get dashboardPage() {
    return new DashboardPage(this.page);
  }

  get classPage() {
    return new ArticlePage(this.page, '#/classes');
  }

  get quickReadPage() {
    return new ArticlePage(this.page, '#/quick-read');
  }

  get tasksPage() {
    return new TasksPage(this.page);
  }

  get rewardsPage() {
    return new RewardsPage(this.page);
  }

  get profilePage() {
    return new ProfilePage(this.page);
  }

  get answersPage() {
    return new AnswersPage(this.page);
  }

  get extraCreditPage() {
    return new ExtraCredit(this.page);
  }

  get classesPage() {
    return new ArticlesPage(this.page, '#/classes');
  }

  get quickReadsPage() {
    return new ArticlesPage(this.page, '#/quick-reads');
  }

  get onboardingPage() {
    return new OnboardingPage(this.page);
  }

  get registrationPage() {
    return new RegistrationPage(this.page);
  }
}

export const test = baseTest.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  classPage: ArticlePage;
  quickReadPage: ArticlePage;
  tasksPage: TasksPage;
  rewardsPage: RewardsPage;
  profilePage: ProfilePage;
  answersPage: AnswersPage;
  extraCreditPage: ExtraCredit;
  classesPage: ArticlesPage;
  quickReadsPage: ArticlesPage;
  onboardingPage: OnboardingPage;
  registrationPage: RegistrationPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  classPage: async ({ page }, use) => {
    await use(new ArticlePage(page, '#/class'));
  },
  quickReadPage: async ({ page }, use) => {
    await use(new ArticlePage(page, '#/quick-read'));
  },
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  rewardsPage: async ({ page }, use) => {
    await use(new RewardsPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  answersPage: async ({ page }, use) => {
    await use(new AnswersPage(page));
  },
  extraCreditPage: async ({ page }, use) => {
    await use(new ExtraCredit(page));
  },
  classesPage: async ({ page }, use) => {
    await use(new ArticlesPage(page, '#/classes'));
  },
  quickReadsPage: async ({ page }, use) => {
    await use(new ArticlesPage(page, '#/quick-reads'));
  },
  onboardingPage: async ({ page }, use) => {
    await use(new OnboardingPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});
