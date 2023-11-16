import { STORAGE_STATE } from '../../playwright.config';
import { test as setup } from '../po/index';

setup.describe('Home Page', () => {
  setup('should close cookie banner', async ({ homePage }) => {
    await homePage.goto();
    await homePage.cookie.closeBanner();
    await homePage.saveStorageState(STORAGE_STATE);
  });
});
