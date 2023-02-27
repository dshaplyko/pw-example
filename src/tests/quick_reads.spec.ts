import { expectElementsCountToBe, expectElementToContainText, expectElementVisibility } from '../utils';
import { test } from '../po';

test.describe.parallel('Quick Reads Page', () => {
  test.beforeEach(async ({ quickReadsPage }) => {
    await quickReadsPage.goto();
  });

  test('should open quick reads page @smoke @Q-1', async ({ quickReadsPage }) => {
    await quickReadsPage.quickReads.nth(0).waitForDisplayed();
    await expectElementToContainText(quickReadsPage.title, 'your available quick reads');
    await expectElementsCountToBe(quickReadsPage.quickReads.rootEl, 4, 'MORE_OR_EQUAL');
  });

  test('should open a quick read @smoke @Q-2', async ({ quickReadsPage, quickReadPage }) => {
    const chosenQuickRead = await quickReadsPage.quickReads.selectAndRememberRandomCard();
    await quickReadPage.checkPageUrl();
    await expectElementToContainText(quickReadPage.title, chosenQuickRead);
    await expectElementVisibility(quickReadPage.description);
    await expectElementVisibility(quickReadPage.readTime);
  });
});
