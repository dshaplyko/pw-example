import { expectElementsCountToBe, expectElementToContainText, expectElementVisibility } from '../utils/index';
import { test } from '../po/index';
import { URLs } from '../data/index';

test.describe('Rewards Page', () => {
  test.beforeEach(async ({ rewardsPage }) => {
    await rewardsPage.goto();
  });

  test('should open Rewards Page @smoke @R-1', async ({ rewardsPage }) => {
    await expectElementVisibility(rewardsPage.newFlashCardsInfo);
    await expectElementToContainText(rewardsPage.rewardHeader, 'limited availability rewards');
    await expectElementsCountToBe(rewardsPage.flashCards.rootEl, 1, 'MORE_OR_EQUAL');
  });

  test('should open Rewards Page @criticalPath @stg @R-1', async ({ rewardsPage }) => {
    await expectElementVisibility(rewardsPage.viewRewardHistory);
    await expectElementVisibility(rewardsPage.newFlashCardsInfo);
    await expectElementToContainText(rewardsPage.rewardHeader, 'limited availability rewards');
    await expectElementsCountToBe(rewardsPage.flashCards.rootEl, 1, 'MORE_OR_EQUAL');

    await rewardsPage.viewRewardHistory.click();
    await expectElementVisibility(rewardsPage.rewardsHistory.rootEl);
    await expectElementToContainText(rewardsPage.rewardsHistory.title, 'reward history');
    await expectElementsCountToBe(rewardsPage.rewardsHistory.rewardItems, 1, 'MORE_OR_EQUAL');

    await rewardsPage.rewardsHistory.closeButton.click();
    await expectElementVisibility(rewardsPage.rewardsHistory.rootEl, false);
  });

  test('should hide View History button @extended @R-4', async ({ rewardsPage }) => {
    await rewardsPage.api.mockNetworkResponse(URLs.CLAIM, []);
    await rewardsPage.goto();
    await expectElementVisibility(rewardsPage.viewRewardHistory, false);
  });

  /**
   * //TODO: This test requires cookie update process.env.COOKIE:
   * 1. Go to https://internal.lifeio-staging.net/admin
   * 2. Open any of Requests
   * 3. Copy Cookie value
   * 4a. Paste it inside .env file (for local execution)
   * 4b. Store it as a Secret on https://github.com/lvhdev/lifeio-web-e2e/settings/secrets/actions (to be able to execute it on CI)
   */
  test('should redeem a card @stg @R-2 @R-3', async ({ rewardsPage }) => {
    await rewardsPage.activateFlashCards();
    await rewardsPage.addPoints(50);
    await rewardsPage.goto();
    const initialPoints = await rewardsPage.getPoints();
    const cardCost = await rewardsPage.flashCards.nth(0).getPointsValue();

    await rewardsPage.flashCards.nth(0).redeemButton.click();
    await expectElementVisibility(rewardsPage.redeemModal.rootEl);
    await expectElementToContainText(rewardsPage.redeemModal.message, `${cardCost} pts`);

    await rewardsPage.redeemModal.confirmButton.click();
    await rewardsPage.redeemModal.chooseRewardButton.waitFor();
    await rewardsPage.redeemModal.closeButton.click();

    await expectElementToContainText(rewardsPage.rewardsTitle, initialPoints - cardCost);
    await expectElementToContainText(rewardsPage.flashCards.nth(0).redeemButton, 'All rewards claimed');
  });
});
