import { test as baseTest } from '@playwright/test';

import { PageFixtures, pageFixtures } from '../fixtures/page-fixtures.ts';
import { UtilsFixtures, utilsFixtures } from '../utils/utils.fixtures.ts';

export type CustomFixtures = UtilsFixtures & PageFixtures;
export const test = baseTest.extend<CustomFixtures>({
  ...pageFixtures,
  ...utilsFixtures,
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
