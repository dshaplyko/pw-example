import { test } from '../po/index';

test.describe('Services Page', () => {
  test('should open services page', async ({ servicesPage }) => {
    await servicesPage.goto();
    await servicesPage.header.servicesLink.shouldBeActive();
  });
});
