import { test } from '../po/index';

test.describe('Home Page', () => {
  test('should click on the services link', async ({ homePage, servicesPage }) => {
    await homePage.goto();
    await homePage.header.shouldBeVisible();
    await homePage.header.servicesLink.click();
    await servicesPage.servicesTitle.shouldBeVisible();
  });

  test('should switch theme', async ({ homePage }) => {
    await homePage.goto();
    await homePage.shouldHaveTheme('dark');

    await homePage.header.themeSwitcher.click();
    await homePage.shouldHaveTheme('light');
  });
});
