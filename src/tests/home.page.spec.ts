import { test } from '../po/index';

test.describe('Home Page', () => {
  test('should click on the services link', async ({ homePage }) => {
    await homePage.goto();
    await homePage.header.shouldBeVisible();
    await homePage.header.servicesLink.click();
  });

  test('should close cookie banner', async ({ homePage }) => {
    await homePage.goto();
    await homePage.cookie.shouldBeVisible();

    await homePage.cookie.acceptAllLink.click();
    await homePage.cookie.shouldBeVisible(false);
  });
});
