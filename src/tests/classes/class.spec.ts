import { expectElementToContainText, expectElementVisibility, expectElementsCountToBe } from '../../utils/index';
import { test } from '../../po/index';

const chosenCategory = 'Mindset' as TClasses;

test.describe('Class Page', () => {
  test.beforeEach(async ({ classesPage }) => {
    await classesPage.filterClassesBy(chosenCategory);
  });

  test('should open Class page (not added to tasks) @smoke @C-4', async ({ classesPage, classPage }) => {
    const selectedClass = await classesPage.availableClasses.selectAndRememberNonProgressedCard();

    await classPage.checkPageUrl();
    await expectElementVisibility(classPage.points);
    await expectElementVisibility(classPage.addToTasksButton);
    await expectElementVisibility(classPage.notInterestedButton);
    await expectElementVisibility(classPage.description);
    await expectElementVisibility(classPage.completetionTime);
    await expectElementVisibility(classPage.content);
    await expectElementVisibility(classPage.currentClass.rootEl);
    await expectElementToContainText(classPage.title, selectedClass);
    await expectElementToContainText(classPage.category, chosenCategory.split(' ')[0]);
    await expectElementsCountToBe(classPage.classParts.rootEl, 1, 'MORE_OR_EQUAL');
  });

  test('should be able to click Not Interested @criticalPath @C-8', async ({ classesPage, classPage }) => {
    await classesPage.availableClasses.clickItemByIndex(2);
    await classPage.notInterestedButton.click();
    await expectElementVisibility(classPage.interestModal.rootEl);
    await expectElementToContainText(classPage.interestModal.title, "We're sorry you didn't love this class. What was the problem?");

    await classPage.interestModal.cancelButton.click();
    await expectElementVisibility(classPage.interestModal.rootEl, false);

    await classPage.notInterestedButton.click();
    await classPage.interestModal.options.selectAndRememberRandomItem();
    await classPage.interestModal.submitButton.click();
    await expectElementVisibility(classPage.interestModal.rootEl, false);
    await expectElementVisibility(classPage.modal.rootEl);
    await expectElementToContainText(classPage.modal.message, 'Your feedback helps us improve our classes.');

    await classPage.modal.okButton.click();
    await expectElementVisibility(classPage.modal.rootEl, false);
  });
});
