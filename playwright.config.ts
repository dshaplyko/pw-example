import type { PlaywrightTestConfig, ReporterDescription } from '@playwright/test';
import { getEnv } from './src/utils';
import { RP_CI, RP_LOCAL } from './reportConfig';

const env = getEnv();
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  testDir: './src/tests',
  timeout: 70 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: process.env.CI ? (RP_CI as ReporterDescription[]) : (RP_LOCAL as ReporterDescription[]),
  outputDir: './reports/result',
  use: {
    baseURL: env.url,
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
      omitBackground: true,
    },
    video: 'retain-on-failure',
    storageState: './src/data/states/state.json',
  },
};

export default config;
