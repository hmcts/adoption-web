import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAOtherPersonResponsibilityPage extends BasePage {
  readonly otherPersonResponsibilityHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.otherPersonResponsibilityHeading = page.getByRole('heading', { name: 'Is there another person who' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}
