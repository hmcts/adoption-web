import { test as baseTest } from '@playwright/test';

import { PageFixtures } from '../fixtures/page-fixtures';
import { UtilsFixtures, utilsFixtures } from '../utils/utils.fixtures';

export type CustomFixtures = UtilsFixtures & PageFixtures;
export const test = baseTest.extend<CustomFixtures>({
  ...utilsFixtures,
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
