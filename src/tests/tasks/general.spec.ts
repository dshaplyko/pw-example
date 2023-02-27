import { expectElementsCountToBe, expectElementToContainText, expectElementVisibility } from '../../utils';
import { test } from '../../po';

test.describe.parallel('Tasks Page', () => {
  test('should open tasks page @smoke @T-1', async ({ tasksPage }) => {
    await tasksPage.goto();
    await expectElementToContainText(tasksPage.title, 'your available tasks');
    await expectElementsCountToBe(tasksPage.cards.rootEl, 1, 'MORE_OR_EQUAL');
    await expectElementToContainText(tasksPage.editTasksButton, 'edit tasks');
    await expectElementVisibility(tasksPage.editTasksButton);
    await expectElementVisibility(tasksPage.sorting.rootEl);
  });

  test('should sort tasks @criticalPath @T-3', async ({ tasksPage }) => {
    await tasksPage.verifyTasksSorting();
  });

  test('should open empty tasks page @criticalPath @T-2', async ({ tasksPage }) => {
    await tasksPage.verifyEmptyTasksPage();
  });
});
