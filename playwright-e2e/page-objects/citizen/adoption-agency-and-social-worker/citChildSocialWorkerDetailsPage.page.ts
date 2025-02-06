import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITChildSocialWorkerDetailsPage extends BasePage {
  readonly applicationDetailsTitle: Locator;
  readonly childSocialWorkerTitle: Locator;

  readonly nameOfChildSocialWorkerText: Locator;
  readonly nameOfChildSocialWorkerLabel: Locator;

  readonly phoneNumberText: Locator;
  readonly phoneNumberLabel: Locator;

  readonly emailAddressText: Locator;
  readonly emailAddressLabel: Locator;

  readonly childLocalAuthorityText: Locator;
  readonly childLocalAuthorityLabel: Locator;

  readonly localAuthorityEmailText: Locator;
  readonly localAuthorityEmailLabel: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;
  readonly findACourtLink: Locator;

  readonly errorNameOfChildSocialWorkerSummary: Locator;
  readonly errorEnterUKPhoneNumberSummary: Locator;
  readonly errorNoOptionalEmailSummary: Locator;
  readonly errorNoEmailSummary: Locator;
  readonly errorEnterLocalAuthoritySummary: Locator;

  constructor(page: Page) {
    super(page);

    this.errorNoOptionalEmailSummary = page.getByRole('link', { name: /childSocialWorkerEmail/i });
    this.errorNoEmailSummary = page.getByRole('link', { name: /childLocalAuthorityEmail/i });
  }
}