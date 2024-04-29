import { mergeExpects, mergeTests } from '@playwright/test';

import { expect as a11yExpect, test as a11yTest } from '../utils/axe-test';

export const test = mergeTests(a11yTest);
export const expect = mergeExpects(a11yExpect);
