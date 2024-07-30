import { defineConfig } from '@playwright/test';

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
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: './reports/html',
        open: 'never',
      },
    ],
  ],
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
