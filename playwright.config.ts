import { CommonConfig, ProjectsConfig } from '@hmcts/playwright-common';
import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright-e2e/tests',
  snapshotDir: './playwright-e2e/snapshots',
  ...CommonConfig.recommended,
  expect: { timeout: 180000 },
  timeout: 180000,
  workers: process.env.CI ? 5 : undefined,

  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      ...ProjectsConfig.chrome,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.chromium,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.edge,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.firefox,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.webkit,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.tabletChrome,
      dependencies: ['setup'],
    },
    {
      ...ProjectsConfig.tabletWebkit,
      dependencies: ['setup'],
    },
  ],
});