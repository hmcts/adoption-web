import { mergeExpects, mergeTests } from '@playwright/test';

import { expect as a11yExpect, test as a11yTest } from '../utils/axe-test';

import { test as create } from './create-fixture';

export const test = mergeTests(create, a11yTest);
export const expect = mergeExpects(a11yExpect);
