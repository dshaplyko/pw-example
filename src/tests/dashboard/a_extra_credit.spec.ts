import { expectElementToContainText, expectElementVisibility, expectToHaveCount, generateFakeUser } from '../../utils/index';
import { test } from '../../po/index';
import { EXTRA_CREDIT, profileResponseData } from '../../data/index';

const { firstName, lastName } = generateFakeUser();

test.describe('Dashboard Page: Extra Credit', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.mockProfileData(profileResponseData);
    await profilePage.goto();
    await profilePage.profileDetails.editYourInfoButton.click();
    await profilePage.editDetails.fillValue('name', `${firstName} ${lastName}`);
    await profilePage.editDetails.saveButton.click();
    await profilePage.navBar.clickLink('desktop', 'Dashboard');
  });

  test('should view all available extra credits @criticalPath @D-13', async ({ dashboardPage, extraCreditPage }) => {
    await dashboardPage.profile.viewAllExtraCreditButton.click();
    await extraCreditPage.checkPageUrl();
    await expectToHaveCount(extraCreditPage.mainArea.extraCredits, 3);
  });

  test('should go through extra credit flow @criticalPath @D-12', async ({ dashboardPage, extraCreditPage }) => {
    test.setTimeout(120000);
    await dashboardPage.profile.startExtraCreditButton.click();
    await expectElementVisibility(extraCreditPage.mainArea.rootEl);
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[0]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[1]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[2]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.REMARKS[0]);

    await extraCreditPage.mainArea.nextButton.click();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[3]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[4]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.REMARKS[1]);

    await extraCreditPage.mainArea.nextButton.click();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[5]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[6]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[7]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.REMARKS[2]);

    await extraCreditPage.mainArea.nextButton.click();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[8]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.questionTitle, EXTRA_CREDIT.STEPS[9]);

    await extraCreditPage.mainArea.selectAndRememberRandomOption();
    await expectElementToContainText(extraCreditPage.mainArea.completeHeading, EXTRA_CREDIT.COMPLETE);
    await expectToHaveCount(extraCreditPage.mainArea.extraCredits, 3);

    await extraCreditPage.mainArea.returnToDashboardLink.click();
    await dashboardPage.checkPageUrl();
  });
});
