import {
  expectElementsCountToBe,
  expectElementToContainText,
  expectElementVisibility,
  expectToHaveCount,
  useMobile,
} from '../../utils/index';
import { classesFilterMap } from '../../data/index';
import { test } from '../../po/index';

test.describe('Classes Page', () => {
  test.describe.parallel('Desktop view', () => {
    test('should open classes page @smoke @C-1', async ({ classesPage }) => {
      await classesPage.goto();
      await classesPage.availableClasses.nth(0).waitForDisplayed();
      await expectElementToContainText(classesPage.title, 'Your library of classes');
      await expectElementVisibility(classesPage.classFilter);
      await expectElementVisibility(classesPage.getFilterOption('DISCOVER'));
      await expectElementVisibility(classesPage.getFilterOption('Finance'));
      await expectElementVisibility(classesPage.getFilterOption('Health & Fitness'));
      await expectElementVisibility(classesPage.getFilterOption('Mindset'));
      await expectElementsCountToBe(classesPage.availableClasses.rootEl, 4, 'MORE_OR_EQUAL');
    });

    for (const filter of classesFilterMap) {
      test(`should filter classes by ${filter} option @smoke @C-2`, async ({ classesPage }) => {
        await classesPage.filterClassesBy(filter as TClasses);
        const filterCount = await classesPage.getFilterCount(filter as TClasses);
        await expectToHaveCount(classesPage.availableClasses.rootEl, filterCount);
      });
    }
  });

  test.describe.parallel('Mobile view', () => {
    useMobile();
    test('should open classes page in mobile view @smoke @C-1', async ({ classesPage }) => {
      await classesPage.goto();
      await classesPage.availableClasses.nth(0).waitForDisplayed();
      await expectElementToContainText(classesPage.title, 'Your library of classes');
      await expectElementVisibility(classesPage.classFilter);
      await expectElementVisibility(classesPage.getFilterOption('DISCOVER'));
      await expectElementVisibility(classesPage.getFilterOption('Finance'));
      await expectElementVisibility(classesPage.getFilterOption('Health & Fitness'));
      await expectElementVisibility(classesPage.getFilterOption('Mindset'));
      await expectElementsCountToBe(classesPage.availableClasses.rootEl, 4, 'MORE_OR_EQUAL');
    });

    for (const filter of classesFilterMap) {
      test(`should filter classes by ${filter} option in mobile view @smoke @C-2`, async ({ classesPage }) => {
        await classesPage.filterClassesBy(filter as TClasses);
        const filterCount = await classesPage.getFilterCount(filter as TClasses);
        await expectToHaveCount(classesPage.availableClasses.rootEl, filterCount);
      });
    }
  });
});
