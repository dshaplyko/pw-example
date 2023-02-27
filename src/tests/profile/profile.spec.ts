import { expectElementToContainText, expectElementVisibility, expectToHaveCount, generateFakeUser } from '../../utils';
import { test } from '../../po';
import { profileClassesData } from '../../data';

const { firstName, lastName } = generateFakeUser();
const createdUserName = `${firstName} ${lastName}`;

test.describe('Profile Page', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.goto();
  });

  test('should open Profile Page @smoke @P-1', async ({ profilePage }) => {
    await profilePage.checkPageUrl();
    await expectElementVisibility(profilePage.profileDetails.rootEl);
    await expectElementVisibility(profilePage.healthClasses.rootEl);
    await expectElementVisibility(profilePage.financeClasses.rootEl);
    await expectElementVisibility(profilePage.mindsetClasses.rootEl);
    await expectElementVisibility(profilePage.fitnessDetails);
    await expectElementVisibility(profilePage.profileDetails.name);
    await expectElementVisibility(profilePage.profileDetails.email);
    await expectElementVisibility(profilePage.profileDetails.birthday);
    await expectElementVisibility(profilePage.profileDetails.editYourInfoButton);
    await expectElementVisibility(profilePage.profileDetails.customizeYourCharacterButton);
    await expectElementVisibility(profilePage.profileDetails.logoffButton);
    await expectElementVisibility(profilePage.viewCollapseClassesButton);
  });

  test('should edit a profile @criticalPath @P-2', async ({ profilePage }) => {
    const initialUserName = await profilePage.profileDetails.getName();

    await profilePage.profileDetails.editYourInfoButton.click();
    await expectElementVisibility(profilePage.editDetails.rootEl);

    await profilePage.editDetails.fillValue('name', createdUserName);
    await profilePage.editDetails.cancelButton.click();
    await expectElementToContainText(profilePage.profileDetails.name, initialUserName);
    await expectElementVisibility(profilePage.editDetails.rootEl, false);

    await profilePage.profileDetails.editYourInfoButton.click();
    await expectElementVisibility(profilePage.editDetails.rootEl);

    await profilePage.editDetails.fillValue('name', createdUserName);
    await profilePage.editDetails.saveButton.click();
    await expectElementToContainText(profilePage.profileDetails.name, createdUserName);
    await expectElementVisibility(profilePage.notificationBanner.rootEl);
    await expectElementToContainText(profilePage.notificationBanner.message, 'Your name has been updated');
  });

  test('should display empty list of completed classes @criticalPath @P-3', async ({ profilePage }) => {
    await profilePage.mockClassesHistory();
    await expectElementToContainText(profilePage.healthClasses.completedClassesLabel, 'Classes completed: 0');
    await expectElementToContainText(profilePage.financeClasses.completedClassesLabel, 'Classes completed: 0');
    await expectElementToContainText(profilePage.mindsetClasses.completedClassesLabel, 'Classes completed: 0');
    await expectElementVisibility(profilePage.healthClasses.emptyCard, false);
    await expectElementVisibility(profilePage.financeClasses.emptyCard, false);
    await expectElementVisibility(profilePage.mindsetClasses.emptyCard, false);

    await profilePage.viewCollapseClassesButton.click();
    await expectElementVisibility(profilePage.healthClasses.emptyCard);
    await expectElementVisibility(profilePage.financeClasses.emptyCard);
    await expectElementVisibility(profilePage.mindsetClasses.emptyCard);

    await profilePage.viewCollapseClassesButton.click();
    await expectElementVisibility(profilePage.healthClasses.emptyCard, false);
    await expectElementVisibility(profilePage.financeClasses.emptyCard, false);
    await expectElementVisibility(profilePage.mindsetClasses.emptyCard, false);
  });

  test('should navigate to classes after clicking link on an empty card @extended @P-4', async ({ profilePage }) => {
    await profilePage.mockClassesHistory();
    await profilePage.viewCollapseClassesButton.click();
    await profilePage.healthClasses.viewAvailableClassesLink.click();
    await profilePage.checkPageUrl('classes');
  });

  test('should display list of completed classes @criticalPath @P-5', async ({ profilePage }) => {
    await profilePage.mockClassesHistory(profileClassesData);
    await profilePage.viewCollapseClassesButton.click();
    await expectToHaveCount(profilePage.healthClasses.classes, await profilePage.healthClasses.getCompletedClassesCount());
    await expectToHaveCount(profilePage.financeClasses.classes, await profilePage.financeClasses.getCompletedClassesCount());
    await expectToHaveCount(profilePage.mindsetClasses.classes, await profilePage.mindsetClasses.getCompletedClassesCount());
  });

  test('should navigate to answers page after clicking View Results&Insigts link @criticalPath @P-6', async ({
    profilePage,
    answersPage,
  }) => {
    await profilePage.mockClassesHistory(profileClassesData);
    await profilePage.viewCollapseClassesButton.click();
    const initialProgress = await profilePage.financeClasses.getProgressText(0);

    await profilePage.financeClasses.clickResultsInsightsLink(0);
    await answersPage.checkPageUrl();
    await expectElementToContainText(answersPage.progress, initialProgress);
  });

  /**
   * //TODO: Please setup your device for tracking. Skipped for now.
   */
  test.skip('should display step tracking feature @criticalPath @P-7', async ({ profilePage }) => {
    await profilePage.fitnessTrackerPanel.verifyTrackerPanel();
  });
});
