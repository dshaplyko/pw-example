import { test } from '../po/index';

const searchTerm = 'cloud';

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

  test('should search for a term', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();
    await homePage.header.searchButton.click();
    await homePage.searchPanel.shouldBeVisible();

    await homePage.searchPanel.searchFor(searchTerm);
    await searchResultsPage.shouldHaveUrl(`q=${searchTerm}`);
    await searchResultsPage.shouldHaveProperResultsLabel(searchTerm);
  });
});
