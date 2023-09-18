import { test } from '../po/index';

test.describe('Home Page', () => {
  test('should click on the services link', async ({ homePage }) => {
    await homePage.goto();
    await homePage.header.shouldBeVisible();
    await homePage.header.servicesLink.click();
  });
});
