import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITApplyingWithPage extends BasePage {
  readonly applicationDetailsTitle: Locator;
  readonly applicationWithHeading: Locator;

  readonly applyingWithGroup: Locator;

  readonly applyingOnMyOwnRadioButton: Locator;
  readonly applyingWithCivilPartnerRadioButton: Locator;
  readonly applyingWithPartnerNotSpouseRadioButton: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.getByText('Application details');
    this.applicationWithHeading = page.getByRole('heading', { name: 'Are you applying on your own' });

    this.applyingWithGroup = page.getByRole('group', { name: 'Are you applying on your own, or with someone else?' });

    this.applyingOnMyOwnRadioButton = this.applyingWithGroup.getByLabel("I'm applying on my own");
    this.applyingWithCivilPartnerRadioButton = this.applyingWithGroup.getByLabel("I'm applying with my spouse");
    this.applyingWithPartnerNotSpouseRadioButton = this.applyingWithGroup.getByLabel("I'm applying with someone who");

    this.contactUsForHelpDropdownLink = page.locator('summary') || page.getByText('Contact us for help');
    this.contactACourtHeading = page.getByRole('heading', { name: 'Contact a court that deals' });
  }

  async checkApplyingOnMyOwnRadioButton(): Promise<void> {
    await this.applyingOnMyOwnRadioButton.check();
  }

  async checkApplyingWithCivilPartnerRadioButton(): Promise<void> {
    await this.applyingWithCivilPartnerRadioButton.check();
  }

  async checkApplyingWithPartnerNotSpouseRadioButton(): Promise<void> {
    await this.applyingWithPartnerNotSpouseRadioButton.check();
  }

  async clickContactUsForHelpDropDownLink(): Promise<void> {
    await this.contactACourtHeading.click();
  }
}
