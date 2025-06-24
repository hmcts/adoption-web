import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAChildHasOtherSiblingsPage extends BasePage {
  readonly childHasOtherSiblingsHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.childHasOtherSiblingsHeading = page.getByRole('heading', { name: 'Does the child have any' });
  }
}
