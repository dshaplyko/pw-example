import { ONBOARDING } from '../data/index';
import { expectElementToContainText, expectElementVisibility, generateFakeUser, useState, waitSeveralSec } from '../utils/index';
import { test } from '../po/index';

const points = 50;
const { firstName, lastName, email } = generateFakeUser();
const fullName = `${firstName} ${lastName}`;
const year = '1992';

test.describe('Onboarding', () => {
  useState('clean');
  test('should go through onboarding @stg @O-1', async ({ registrationPage, onboardingPage, dashboardPage, profilePage }) => {
    await registrationPage.registerUser(email, 'TestPassword123');
    await onboardingPage.checkPageUrl();

    await onboardingPage.firstNameInput.fill(firstName);
    await onboardingPage.lastNameInput.fill(lastName);
    await onboardingPage.months.selectAndRememberRandomItem();

    const day = await onboardingPage.days.selectAndRememberRandomItem();
    await onboardingPage.year.fill(year);
    await onboardingPage.genders.selectAndRememberRandomItem();
    await onboardingPage.clickContinue();
    await waitSeveralSec(3000);
    await expectElementToContainText(onboardingPage.onboardingHeading, ONBOARDING.STEPS[0]);

    await onboardingPage.clickContinue();
    await expectElementToContainText(onboardingPage.onboardingHeading, ONBOARDING.STEPS[1]);

    const selectedGoal = await onboardingPage.selectGoal();
    await expectElementVisibility(onboardingPage.quizArea.rootEl);
    await expectElementToContainText(onboardingPage.quizArea.questionTitle, ONBOARDING.STEPS[2]);

    await onboardingPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(onboardingPage.quizArea.questionTitle, ONBOARDING.STEPS[3]);

    await onboardingPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(onboardingPage.quizArea.questionTitle, ONBOARDING.STEPS[4]);

    await onboardingPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(onboardingPage.quizArea.questionTitle, ONBOARDING.STEPS[5]);

    await onboardingPage.quizArea.selectAndRememberRandomOption();
    await expectElementVisibility(onboardingPage.onboardingModal.rootEl);
    await expectElementToContainText(onboardingPage.onboardingModal.title, `You just earned +${points}pts for joining!`);

    await onboardingPage.onboardingModal.claimButton.click();
    await expectElementVisibility(onboardingPage.onboardingModal.rootEl, false);
    await expectElementToContainText(dashboardPage.header.rewardsLink, points);
    await expectElementVisibility(dashboardPage.yourGoals.rootEl);
    await expectElementToContainText(dashboardPage.yourGoals.goalName, selectedGoal);

    await onboardingPage.header.profileLink.click();
    await expectElementToContainText(profilePage.profileDetails.name, fullName, true, true);
    await expectElementToContainText(profilePage.profileDetails.email, email, true, true);
    await expectElementToContainText(profilePage.profileDetails.birthday, day);
    await expectElementToContainText(profilePage.profileDetails.birthday, year);
  });
});
