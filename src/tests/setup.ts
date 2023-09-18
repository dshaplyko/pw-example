import { STORAGE_STATE } from '../../playwright.config';
import { test as setup } from '../po/index';

setup.describe('Home Page', () => {
  setup('should close cookie banner', async ({ homePage }) => {
    await homePage.goto();
    await homePage.cookie.shouldBeVisible();

    await homePage.cookie.acceptAllLink.click();
    await homePage.cookie.shouldBeVisible(false);
    await homePage.saveStorageState(STORAGE_STATE);
  });
});
