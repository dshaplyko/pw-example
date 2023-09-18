import { ReporterDescription, defineConfig } from '@playwright/test';
import { RP_CI, RP_LOCAL } from './reportConfig';

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
  use: {
    baseURL: 'https://www.epam.com',
    actionTimeout: 0,
    viewport: {
      width: 1600,
      height: 720,
    },
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
      omitBackground: true,
    },
    trace: 'on-first-retry',
  },
});
