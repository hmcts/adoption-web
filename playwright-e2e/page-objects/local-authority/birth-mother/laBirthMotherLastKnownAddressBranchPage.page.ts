import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherLastKnownAddressBranchPage extends BasePage {
  readonly birthMotherLastKnownAddressHeader: Locator;

  readonly birthMotherLastKnownAddressYesRadioButton: Locator;
  readonly birthMotherLastKnownAddressNoRadioButton: Locator;

  readonly saveAndContinue: Locator;
  readonly saveAsDraft: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherLastKnownAddressHeader = page.getByRole('heading', { name: "Do you have the birth mother'" });

    this.birthMotherLastKnownAddressYesRadioButton = page.getByLabel('Yes');
    this.birthMotherLastKnownAddressNoRadioButton = page.getByLabel('No');

    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraft = page.getByRole('button', { name: 'Save as draft' });
  }
}
