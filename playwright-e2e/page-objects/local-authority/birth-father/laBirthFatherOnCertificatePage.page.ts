import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherOnCertficatePage extends BasePage {
  readonly birthFatherBirthCertificateHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherBirthCertificateHeading = page.getByRole('heading', { name: "Is the birth father's name on" });
  }
}
