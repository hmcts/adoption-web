import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class CITOtherAdoptionAgencyPage extends BasePage {
  readonly applicationDetailsTitle: Locator;

  readonly otherAdoptionAgencyTitle: Locator;

  readonly otherAdoptionAgencyText: Locator;

  readonly otherAdoptionAgencyGroup: Locator;
  readonly otherAdopptionAgencyYesRadioButton: Locator;
  readonly otherAdoptionAgencyNoRadioButton: Locator;

  readonly errorSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.getByText('Application details');
    this.otherAdoptionAgencyTitle = page.getByRole('heading', {
      name: 'Is there another adoption agency or local authority involved',
    });
    this.otherAdoptionAgencyText = page.getByText('This would be separate from your local authority.');

    this.otherAdoptionAgencyGroup = page.getByRole('group', {
      name: 'Is there another adoption agency or local authority involved',
    });
    this.otherAdopptionAgencyYesRadioButton = this.otherAdoptionAgencyGroup.getByRole('radio', { name: 'Yes' });
    this.otherAdoptionAgencyNoRadioButton = this.otherAdoptionAgencyGroup.getByRole('radio', { name: 'No' });

    this.errorSummary = page.getByRole('link', { name: 'Please answer the question' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.otherAdopptionAgencyYesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.otherAdoptionAgencyNoRadioButton.check();
  }
}
