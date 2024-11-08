import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAChildHasOtherSiblingsPage extends BasePage {
  readonly childHasOtherSiblingsHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;
  readonly notSureRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.childHasOtherSiblingsHeading = page.getByRole('heading', { name: 'Does the child have any' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });
    this.notSureRadioButton = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}
