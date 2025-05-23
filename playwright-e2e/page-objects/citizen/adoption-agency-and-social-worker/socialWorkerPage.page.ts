import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class SocialWorkerPage extends BasePage {
  readonly applicationDetailsTitle: Locator;

  readonly phoneNumberText: Locator;
  readonly phoneNumberLabel: Locator;

  readonly emailAddressText: Locator;
  readonly emailAddressLabel: Locator;
  readonly emailAddressHint: Locator;

  readonly localAuthorityInputLabel: Locator;
  readonly localAuthorityDropdown: Locator;

  readonly localAuthorityEmailText: Locator;
  readonly localAuthorityEmailLabel: Locator;
  readonly localAuthorityEmailHint: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;
  readonly findACourtLink: Locator;

  readonly errorNameOfChildSocialWorkerSummary: Locator;
  readonly errorEnterUKPhoneNumberSummary: Locator;
  readonly errorEmailFormatOptionalEmailSummary: Locator;
  readonly errorNoEmailSummary: Locator;
  readonly errorEnterLocalAuthoritySummary: Locator;
  readonly errorNonGovernmentEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.getByText('Application details');

    this.phoneNumberText = page.getByText('Phone number');
    this.phoneNumberLabel = page.getByRole('textbox', { name: 'Phone number' });

    this.emailAddressText = page.getByText('Email address (if known)');
    this.emailAddressLabel = page.getByRole('textbox', { name: 'Email address (if known)' });
    this.emailAddressHint = page.getByText('The email address should be an official government email');

    this.localAuthorityInputLabel = page.locator('#location-picker');
    this.localAuthorityDropdown = page.locator('.autocomplete__menu');

    this.localAuthorityEmailText = page.getByText('Local authority email address');
    this.localAuthorityEmailLabel = page.getByRole('textbox', { name: 'Local authority email address' });
    this.localAuthorityEmailHint = page.getByText('This will be used to send a notification to the local authority');

    this.contactUsForHelpDropdownLink = page.getByText('Contact us for help');
    this.contactACourtHeading = page.getByRole('heading', { name: 'Contact a court that deals' });
    this.findACourtLink = page.getByRole('link', { name: 'Find a Court or Tribunal' });

    this.errorNameOfChildSocialWorkerSummary = page.getByRole('link', { name: 'Enter name of child’s social worker' });
    this.errorEnterUKPhoneNumberSummary = page.getByRole('link', { name: 'Enter a UK telephone number' });
    this.errorEmailFormatOptionalEmailSummary = page.locator('a[href="#childSocialWorkerEmail"]');
    this.errorNoEmailSummary = page.locator('a[href="#childLocalAuthorityEmail"]');
    this.errorEnterLocalAuthoritySummary = page.getByRole('link', { name: 'Enter name of local authority' });
    this.errorNonGovernmentEmail = page.getByRole('link', {
      name: 'The email address provided is not an approved email address',
    });
  }

  async fillPhoneNumberLabel(number: string): Promise<void> {
    await this.phoneNumberLabel.fill(number);
  }

  async fillEmailAddressLabel(email: string): Promise<void> {
    await this.emailAddressLabel.fill(email);
  }

  async selectLocalAuthority(authorityName: string): Promise<void> {
    await this.localAuthorityInputLabel.pressSequentially(authorityName);
    await this.localAuthorityDropdown.waitFor();
    await this.page.locator(`.autocomplete__option >> text=${authorityName}`).click();
  }

  async fillLocalAuthorityEmailLabel(email: string): Promise<void> {
    await this.localAuthorityEmailLabel.fill(email);
  }
}
