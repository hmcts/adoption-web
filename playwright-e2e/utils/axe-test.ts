import axeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

type AxeFixture = {
  makeAxeBuilder: () => axeBuilder;
};

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new axeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);

    await use(makeAxeBuilder);
  },
});
export { expect } from '@playwright/test';
