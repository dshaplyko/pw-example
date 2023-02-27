import { test } from '@playwright/test';
import { expectElementToContainText, expectElementVisibility, useState, createPage, expectToHaveCount } from '../../utils';
import App from '../../po';
import { quizData, DEV_USER_QUIZ } from '../../data';

let engage: App;
const { questions } = quizData.payload.parts.part1.quiz;

test.describe('Class Page: Quiz', () => {
  useState('clean');

  test.beforeAll(async ({ browser }) => {
    engage = new App(await createPage(browser));
    await engage.loginPage.goto();
    await engage.loginPage.login(DEV_USER_QUIZ);
  });

  test.beforeEach(async () => {
    await engage.classesPage.unMockQuizResults();
    await engage.classesPage.goto();
  });

  test.afterAll(async () => {
    await engage.page.close();
  });

  test('should go through Quiz @criticalPath @C-9', async () => {
    test.setTimeout(60000);
    await engage.classesPage.mockQuizInitiation(quizData);
    await engage.classesPage.availableClasses.clickItemByIndex(0);
    await engage.classPage.startQuizButton.click();
    await expectElementVisibility(engage.classPage.quizArea.rootEl);
    await expectElementToContainText(engage.classPage.quizArea.questionTitle, questions.question1.question);

    await engage.classPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(engage.classPage.quizArea.questionTitle, questions.question2.question);

    await engage.classPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(engage.classPage.quizArea.questionTitle, questions.question3.question);

    await engage.classPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(engage.classPage.quizArea.questionTitle, questions.question4.question);

    await engage.classPage.quizArea.selectAndRememberRandomOption();
    await expectElementToContainText(engage.classPage.quizArea.questionTitle, questions.question5.question);

    await engage.classesPage.mockQuizCompletion();
    await engage.classPage.quizArea.selectAndRememberRandomOption();
    await expectElementVisibility(engage.classPage.notificationBanner.rootEl);
    await expectElementToContainText(engage.classPage.notificationBanner.message, 'pts earned');
  });

  test.describe('Class Result Page', () => {
    const selectedClass = 'Big Plans, Small Steps: The Science of Reaching Your Goals';

    test.beforeEach(async () => {
      await engage.classesPage.availableClasses.clickItemByText(selectedClass);
    });

    test('should open class page (task in progress) @criticalPath @C-13', async () => {
      const currentProgress = await engage.classPage.getCurrentProgressStep();

      await expectElementVisibility(engage.classPage.progressLabel);
      await expectElementVisibility(engage.classPage.stepLabel);
      await expectElementVisibility(engage.classPage.progressBar.rootEl);
      await expectElementVisibility(engage.classPage.startQuizButton);
      await expectElementToContainText(engage.classPage.progressBar.activeStep, currentProgress);
      await expectElementToContainText(engage.classPage.currentClass.part, currentProgress);
      await expectElementVisibility(engage.classPage.classParts.nth(0).checkMark);
      await expectElementVisibility(engage.classPage.classParts.nth(0).readArticleLink);
      await expectElementVisibility(engage.classPage.classParts.nth(1).readingMark);

      await engage.classPage.classParts.nth(0).readArticleLink.click();
      await expectElementVisibility(engage.classPage.description);
      await expectElementToContainText(engage.classPage.title, selectedClass);
      await expectElementVisibility(engage.classPage.viewResultsButton);
      await expectElementVisibility(engage.classPage.progressBar.rootEl, false);
      await expectElementVisibility(engage.classPage.classParts.nth(0).checkMark);
      await expectElementVisibility(engage.classPage.classParts.nth(0).readingMark);
      await expectElementVisibility(engage.classPage.classParts.nth(1).readArticleLink);

      await engage.classPage.classParts.nth(1).readArticleLink.click();
      await expectElementVisibility(engage.classPage.description, false);
      await expectElementVisibility(engage.classPage.progressBar.rootEl);
      await expectElementVisibility(engage.classPage.classParts.nth(0).checkMark);
      await expectElementVisibility(engage.classPage.classParts.nth(0).readArticleLink);
      await expectElementVisibility(engage.classPage.classParts.nth(1).readingMark);
    });

    test('should open class result page @criticalPath @C-10', async () => {
      await engage.classPage.classParts.nth(0).readArticleLink.click();
      await engage.classPage.viewResultsButton.click();
      await expectElementVisibility(engage.classPage.nextPart);
      await expectElementVisibility(engage.classPage.earnedPoints);
      await expectElementVisibility(engage.classPage.answersSummary);
      await expectToHaveCount(engage.classPage.correctAnswers, await engage.classPage.getEarnedPoints());

      const nextPartTitle = await engage.classPage.getNextPartText();
      await engage.classPage.nextPart.click();
      await expectElementToContainText(engage.classPage.stepLabel, nextPartTitle);
    });
  });
});
