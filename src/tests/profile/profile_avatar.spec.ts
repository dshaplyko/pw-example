import { expectElementToContainText, expectElementVisibility } from '../../utils/index';
import { test } from '../../po/index';

test.describe.serial('Profile Page: Avatar Configuration', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.goto();
  });

  test('should customize character @smoke @CH-1', async ({ profilePage }) => {
    await profilePage.profileDetails.customizeYourCharacterButton.click();
    await expectElementVisibility(profilePage.avatarBuilder.rootEl);

    await profilePage.avatarBuilder.categories.selectAndRememberRandomItem();
    await profilePage.avatarBuilder.selectAndRememberRandomOption();
    await profilePage.avatarBuilder.saveAndExistButton.click();
    await expectElementVisibility(profilePage.notificationBanner.rootEl);
    await expectElementToContainText(profilePage.notificationBanner.message, 'Your changes have been saved');
  });

  test('should discard profile changes @extended @CH-2', async ({ profilePage }) => {
    await profilePage.profileDetails.customizeYourCharacterButton.click();
    await expectElementVisibility(profilePage.avatarBuilder.rootEl);

    await profilePage.avatarBuilder.categories.selectAndRememberRandomItem();
    await profilePage.avatarBuilder.selectAndRememberRandomOption();
    await profilePage.avatarBuilder.discardAndExitButton.click();
    await expectElementVisibility(profilePage.notificationBanner.rootEl, false);
    await expectElementVisibility(profilePage.profileDetails.rootEl);
  });
});
