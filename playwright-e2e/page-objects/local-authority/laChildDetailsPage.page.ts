import { Locator, Page } from '@playwright/test';

export class LAChildDetailsPage {
  readonly childDetailsHeading: Locator;

  readonly birthCertificateDetailsLink: Locator;
  readonly birthMotherDetailsLink: Locator;
  readonly birthFatherDetailsLink: Locator;
  readonly otherPersonDetailsLink: Locator;
  readonly placementAndCourtOrderLinks: Locator;
  readonly siblingCourtOrderDetailsLink: Locator;
  readonly uploadDocumentLink: Locator;

  readonly reviewAndSubmitButton: Locator;

  constructor(page: Page) {
    this.childDetailsHeading = page.locator('.govuk-heading-x1').first();
    this.birthCertificateDetailsLink = page.getByRole('link', { name: 'Birth certificate details' });
    this.birthMotherDetailsLink = page.getByRole('link', { name: 'Birth mother details' });
    this.birthFatherDetailsLink = page.getByRole('link', { name: 'Birth father details' });
    this.otherPersonDetailsLink = page.getByRole('link', { name: 'Other person with parental' });
    this.placementAndCourtOrderLinks = page.getByRole('link', { name: 'Placement and court orders' });
    this.siblingCourtOrderDetailsLink = page.getByRole('link', { name: 'Sibling court order details' });
    this.uploadDocumentLink = page.getByRole('link', { name: 'Upload documents' });

    this.reviewAndSubmitButton = page.getByRole('button', { name: 'Review and submit' });
  }

  async clickBirthCertificateDetailsSection(): Promise<void> {
    await this.birthCertificateDetailsLink.click();
  }

  async clickBirthMotherDetailsLink(): Promise<void> {
    await this.birthMotherDetailsLink.click();
  }

  async clickBirthFatherDetailsLink(): Promise<void> {
    await this.birthFatherDetailsLink.click();
  }

  async clickOtherPersonLink(): Promise<void> {
    await this.otherPersonDetailsLink.click();
  }

  async clickPlacementAndOrderLink(): Promise<void> {
    await this.placementAndCourtOrderLinks.click();
  }

  async clickSiblingCourtOrderDetailsLink(): Promise<void> {
    await this.siblingCourtOrderDetailsLink.click();
  }

  async clickUploadDocumentLink(): Promise<void> {
    await this.uploadDocumentLink.click();
  }

  async clickReviewAndSubmitButton(): Promise<void> {
    await this.reviewAndSubmitButton.click();
  }
}
