import { expectElementsCountToBe, expectElementToContainText, expectElementVisibility, expectToHaveCount } from '../../utils';
import { test } from '../../po';

const chosenCategory = 'Mindset' as TClasses;
const testClass = 'The Power of Purpose: How to Find Yours';

test.describe.serial('Class adding to tasks', () => {
  test.describe('Adding From Classes', () => {
    let initialTaskCount: number;

    test.beforeEach(async ({ classesPage }) => {
      await classesPage.goto();
      initialTaskCount = await classesPage.navBar.getTaskCountAsNumber();
    });

    test('should add/remove a class from Class Page to tasks @criticalPath @C-5 @C-7', async ({ classesPage, classPage }) => {
      await classesPage.filterClassesBy(chosenCategory);

      if (!(await classesPage.availableClasses.checkIfAdded(testClass))) {
        await classesPage.availableClasses.clickItemByText(testClass);
        await classPage.description.waitFor();
        await classPage.addToTasksButton.click();
        initialTaskCount += 1;
        await expectElementVisibility(classPage.notificationBanner.rootEl);
        await expectElementVisibility(classPage.removeFromTasksButton);
        await expectElementToContainText(classPage.notificationBanner.message, 'This class has been added to your tasks');
        await expectElementToContainText(classPage.navBar.taskCount, initialTaskCount);
      }

      await classPage.removeFromTasksButton.click();
      initialTaskCount -= 1;
      await expectElementVisibility(classPage.notificationBanner.rootEl);
      await expectElementVisibility(classPage.addToTasksButton);
      await expectElementToContainText(classPage.notificationBanner.message, 'This class has been removed from your tasks');
      await expectElementToContainText(classPage.navBar.taskCount, initialTaskCount);
    });

    test('should add/remove a class from Classes Page to tasks @smoke @C-3', async ({ classesPage, tasksPage }) => {
      const testClass = 'Saving 101: Get On Track to Reach Your Goals';

      if (!(await classesPage.availableClasses.checkIfAdded(testClass))) {
        await classesPage.availableClasses.addCardToTaskByText(testClass);
        initialTaskCount += 1;
        await expectElementVisibility(classesPage.notificationBanner.rootEl);
        await expectElementToContainText(classesPage.notificationBanner.message, 'This class has been added to your tasks');
        await expectElementToContainText(classesPage.navBar.taskCount, initialTaskCount);
      }

      await tasksPage.goto();
      await expectElementToContainText(tasksPage.cards.titles.getItemByIndex(0), testClass);
      await expectToHaveCount(tasksPage.cards.rootEl, initialTaskCount);

      await tasksPage.removeCard(0);
      initialTaskCount -= 1;
      await expectElementVisibility(tasksPage.notificationBanner.rootEl);
      await expectElementToContainText(tasksPage.notificationBanner.message, 'This class has been removed from your tasks');
      await expectElementToContainText(tasksPage.navBar.taskCount, initialTaskCount);
    });
  });

  test.describe('Adding From the Dashboard', () => {
    test('should add/remove a class to tasks list @criticalPath @D-6', async ({ dashboardPage, tasksPage }) => {
      await dashboardPage.goto();
      let initialCardNumber = await dashboardPage.yourTasks.cards.getItemsNumber();

      if ((await dashboardPage.yourTasks.cards.getItemsNumber()) < 3) {
        await dashboardPage.yourGoals.cards.addCardToTaskByIndex(2);
        initialCardNumber += 1;
        await expectElementVisibility(dashboardPage.notificationBanner.rootEl);
        await expectElementToContainText(dashboardPage.notificationBanner.message, 'This class has been added to your tasks');
      }
      await expectElementToContainText(dashboardPage.navBar.taskCount, initialCardNumber);

      await dashboardPage.navBar.clickLink('desktop', 'Tasks');
      await tasksPage.removeCard(0);
      initialCardNumber -= 1;
      await expectElementVisibility(tasksPage.notificationBanner.rootEl);
      await expectElementToContainText(tasksPage.notificationBanner.message, 'This class has been removed from your tasks');
      await expectElementToContainText(tasksPage.navBar.taskCount, initialCardNumber);

      await tasksPage.navBar.clickLink('desktop', 'Dashboard');
      await expectToHaveCount(dashboardPage.yourTasks.cards.rootEl, initialCardNumber);
    });
  });

  test.describe('Class Page', () => {
    let testClass: string;

    test.beforeEach(async ({ classesPage }) => {
      await classesPage.filterClassesBy(chosenCategory);
    });

    test.afterEach(async ({ classesPage, classPage }) => {
      await classesPage.filterClassesBy(chosenCategory);
      await classesPage.availableClasses.clickItemByText(testClass);
      await classPage.description.waitFor();
      await classPage.removeFromTasksButton.click();
    });

    test('should open Class page (added to tasks) @smoke @C-7', async ({ classesPage, classPage }) => {
      testClass = await classesPage.availableClasses.selectAndRememberNonProgressedCard();

      await classPage.description.waitFor();
      await classPage.addToTasksButton.click();
      await expectElementVisibility(classPage.points);
      await expectElementVisibility(classPage.removeFromTasksButton);
      await expectElementVisibility(classPage.notInterestedButton);
      await expectElementVisibility(classPage.description);
      await expectElementVisibility(classPage.completetionTime);
      await expectElementVisibility(classPage.content);
      await expectElementVisibility(classPage.currentClass.rootEl);
      await expectElementToContainText(classPage.title, testClass);
      await expectElementToContainText(classPage.category, chosenCategory);
      await expectElementsCountToBe(classPage.classParts.rootEl, 1, 'MORE_OR_EQUAL');
    });
  });
});
