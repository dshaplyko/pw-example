import { expectElementToContainText, expectElementVisibility, useMobile } from '../../utils';
import { test } from '../../po';
import { dashboardLiksMap, dashboardNavBarLinksMap, dashboardSideBarLinksMap } from '../../data';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test.describe('Mobile view', () => {
    useMobile();

    test('should open dashboard page in mobile view @smoke @D-1', async ({ dashboardPage }) => {
      await expectElementVisibility(dashboardPage.mobileNavBar.rootEl);
      await expectElementVisibility(dashboardPage.mobileHeader.rootEl);
      await expectElementVisibility(dashboardPage.mobileHeader.profileLink);
      await expectElementVisibility(dashboardPage.mobileHeader.rewardsLink);
      await expectElementVisibility(dashboardPage.profile.rootEl);
      await expectElementVisibility(dashboardPage.yourTasks.rootEl);
      await expectElementVisibility(dashboardPage.yourGoals.rootEl);
      await expectElementVisibility(dashboardPage.quickReads.rootEl);
    });

    for (const { link, url } of dashboardNavBarLinksMap) {
      test(`should redirect to ${url} mobile page after clicking ${link} link @criticalPath @D-9`, async ({ dashboardPage }) => {
        await dashboardPage.mobileNavBar.clickLink('mobile', link);
        await dashboardPage.checkPageUrl(url);
      });
    }
  });

  test.describe.parallel('Desktop', () => {
    for (const { id, section, pageUrl } of dashboardLiksMap) {
      test(`should redirect to ${pageUrl} after clicking View All link @criticalPath ${id}`, async ({ dashboardPage }) => {
        await dashboardPage[section].viewAllButton.click();
        await dashboardPage.checkPageUrl(pageUrl);
      });
    }

    test('should display dashboard page @smoke @D-1', async ({ dashboardPage }) => {
      await expectElementVisibility(dashboardPage.navBar.rootEl);
      await expectElementVisibility(dashboardPage.header.rootEl);
      await expectElementVisibility(dashboardPage.profile.rootEl);
      await expectElementVisibility(dashboardPage.yourTasks.rootEl);
      await expectElementVisibility(dashboardPage.yourGoals.rootEl);
      await expectElementVisibility(dashboardPage.quickReads.rootEl);
    });

    test('should display empty tasks list @criticalPath @D-2', async ({ dashboardPage }) => {
      await dashboardPage.mockEmptyTasksList();
      await expectElementVisibility(dashboardPage.yourTasks.emptyCard);
    });

    test('should open Class page after selecting a task @criticalPath @D-4', async ({ dashboardPage, classPage }) => {
      const selectedTask = await dashboardPage.yourTasks.cards.selectAndRememberRandomCard();
      await classPage.checkPageUrl();
      await expectElementToContainText(classPage.title, selectedTask);
    });

    test('should open Quick Read page after selecting a quick read @smoke @D-8', async ({ dashboardPage, quickReadPage }) => {
      const selectedTask = await dashboardPage.quickReads.cards.selectAndRememberRandomCard();
      await quickReadPage.checkPageUrl();
      await expectElementToContainText(quickReadPage.title, selectedTask);
    });

    for (const { link, url } of dashboardSideBarLinksMap) {
      test(`should redirect to ${url} page after clicking ${link} link @criticalPath @D-9`, async ({ dashboardPage }) => {
        await dashboardPage.navBar.clickLink('desktop', link);
        await dashboardPage.checkPageUrl(url);
      });
    }

    test('should navigate to Rewards page @smoke @D-10', async ({ dashboardPage, rewardsPage }) => {
      await dashboardPage.goto();
      const rewardsPoints = await dashboardPage.header.getRewardsPoints();

      await dashboardPage.header.rewardsLink.click();
      await rewardsPage.checkPageUrl();
      await expectElementToContainText(rewardsPage.rewardsTitle, rewardsPoints);
    });

    test('should navigate to Profile page @smoke @D-11', async ({ dashboardPage, profilePage }) => {
      await dashboardPage.goto();
      await dashboardPage.header.profileLink.click();
      await profilePage.checkPageUrl();
    });
  });
});
