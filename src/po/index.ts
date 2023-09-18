import { test as baseTest } from '@playwright/test';
import HomePage from './pages/Home.page';

export const test = baseTest.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.cookie.shouldBeVisible();

    await homePage.cookie.acceptAllLink.click();
    await homePage.cookie.shouldBeVisible(false);
    await use(new HomePage(page));
  },
});
