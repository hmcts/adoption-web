import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthMotherLastKnownAddressBranchPage extends BasePage {
  readonly birthMotherLastKnownAddressHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherLastKnownAddressHeader = page.getByRole('heading', { name: "Do you have the birth mother'" });
  }
}
