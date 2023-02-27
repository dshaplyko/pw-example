import { chromium, FullConfig } from '@playwright/test';
import App from './src/po';
import { Logger, getEnv, createPage } from './src/utils';

const env = getEnv();
const logger = new Logger('Global pre-hook');

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const engage = new App(await createPage(browser));

  try {
    logger.info(`Logging in as a test user for ${env.launch}`);
    await engage.loginPage.goto(env.url);
    await engage.loginPage.login();
    await engage.dashboardPage.waitForUrlToChange();
    logger.info('Test User is logged in');
    await engage.page.context().storageState({ path: storageState as string });
    await browser.close();
  } catch (e) {
    throw new Error(`Was not able to login using test user's creds, ${e}`);
  }
}

export default globalSetup;
