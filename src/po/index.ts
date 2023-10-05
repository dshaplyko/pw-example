import { test as baseTest } from '@playwright/test';
import HomePage from './pages/Home.page';
import ServicesPage from './pages/Services.page';
import SearchResults from './pages/SearchResults.page';

export const test = baseTest.extend<{
  homePage: HomePage;
  servicesPage: ServicesPage;
  searchResultsPage: SearchResults;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  servicesPage: async ({ page }, use) => {
    await use(new ServicesPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResults(page));
  },
});
