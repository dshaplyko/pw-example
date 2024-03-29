import { ReporterDescription, defineConfig } from '@playwright/test';
import { RP_CI, RP_LOCAL } from './reportConfig';

export const STORAGE_STATE = './src/data/states/state.json';

export default defineConfig({
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  maxFailures: process.env.CI ? 40 : 0,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 4,
  reporter: process.env.CI ? (RP_CI as ReporterDescription[]) : (RP_LOCAL as ReporterDescription[]),
  outputDir: './reports/result',
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup.ts',
    },
    {
      name: 'e2e',
      dependencies: ['setup'],
      testMatch: '**/*.spec.ts',
      use: {
        storageState: STORAGE_STATE,
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
          omitBackground: true,
        },
        trace: 'on-first-retry',
      },
    },
  ],
  use: {
    baseURL: 'https://www.epam.com',
    actionTimeout: 0,
    viewport: {
      width: 1600,
      height: 720,
    },
  },
});
