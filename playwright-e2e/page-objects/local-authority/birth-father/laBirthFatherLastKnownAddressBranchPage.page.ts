import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherLastKnownAddressBranchPage extends BasePage {
  readonly birthFatherLastKnownAddressHeader: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherLastKnownAddressHeader = page.getByRole('heading', { name: 'Do you have the birth father’' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}