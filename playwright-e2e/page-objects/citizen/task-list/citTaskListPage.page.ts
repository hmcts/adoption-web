import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITTaskListPage extends BasePage {
  readonly applyToAdoptAChildHeading: Locator;

  // first group: Add application details
  readonly addApplicationDetailsHeading: Locator;

  readonly numnberOfApplicantsLink: Locator;
  readonly numberOfApplicantsStatus: Locator;

  readonly dateChildMovedInLink: Locator;
  readonly dateChildMovedInStatus: Locator;

  readonly childDetailsLink: Locator;
  readonly childDetailsStatus: Locator;

  readonly adoptionAgencyLink: Locator;
  readonly adoptionAgencyStatus: Locator;

  readonly familyCourtLink: Locator;
  readonly familyCourtStatus: Locator;

  // second group: Add applicant's details
  readonly addApplicantsDetailHeading: Locator;

  // first subgroup: First applicant

  readonly firstApplicantSubheading: Locator;

  readonly firstApplicantPersonalDetailsLink: Locator;
  readonly firstApplicantPersonalDetailsStatus: Locator;

  readonly firstApplicantContactDetailsLink: Locator;
  readonly firstApplicantContactDetailsStatus: Locator;

  // second subgroup: Second applicant

  readonly secondApplicantSubheading: Locator;

  readonly secondApplicantPersonalDetailsLink: Locator;
  readonly secondApplicantPersonalDetailsStatus: Locator;

  readonly secondApplicantContactDetailsLink: Locator;
  readonly secondApplicantContactDetailsStatus: Locator;

  // third group: Review and Submit

  readonly reviewAndSubmitSubHeading: Locator;

  readonly reviewPayAndSubmitLink: Locator;
  readonly reviewPayAndSubmitStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.applyToAdoptAChildHeading = page.getByRole('heading', { name: 'Apply to adopt a child placed' });

    this.addApplicationDetailsHeading = page.getByRole('heading', { name: 'Add application details' });

    this.numnberOfApplicantsLink = page.getByRole('link', {
      name: 'Number of applicants',
    });
    this.numberOfApplicantsStatus = page.locator('#applying-with-status');

    this.dateChildMovedInLink = page.getByRole('link', { name: 'Date child moved in with you' });
    this.dateChildMovedInStatus = page.locator('#date-child-moved-in-status');

    this.childDetailsLink = page.getByRole('link', { name: "Child's details" });
    this.childDetailsStatus = page.locator('#adoption-certificate-details-status');

    this.adoptionAgencyLink = page.getByRole('link', { name: 'Adoption agency and social' });
    this.adoptionAgencyStatus = page.locator('#adoption-agency-status');

    this.familyCourtLink = page.getByRole('link', { name: 'The family court details' });
    this.familyCourtStatus = page.locator('#find-family-court-status');

    this.addApplicantsDetailHeading = page.getByRole('heading', { name: "Add applicant's details" });

    this.firstApplicantSubheading = page.getByText('First applicant', { exact: true });

    this.firstApplicantPersonalDetailsLink =
      page.getByRole('link', { name: 'Your personal details' }) ||
      page.getByRole('link', { name: 'Your personal details  First' });
    this.firstApplicantPersonalDetailsStatus = page.locator('#applicant1-personal-details-status');

    this.firstApplicantContactDetailsLink =
      page.getByRole('link', { name: 'Your contact details' }) ||
      page.getByRole('link', { name: 'Your contact details  First' });
    this.firstApplicantContactDetailsStatus = page.locator('#applicant1-contact-details-status');

    this.secondApplicantSubheading = page.getByText('Second applicant', { exact: true });

    this.secondApplicantPersonalDetailsLink = page.getByRole('link', { name: 'Your personal details  Second' });
    this.secondApplicantPersonalDetailsStatus = page.locator('#applicant2-personal-details-status');

    this.secondApplicantContactDetailsLink = page.getByRole('link', { name: 'Your contact details  Second' });
    this.secondApplicantContactDetailsStatus = page.locator('#applicant2-contact-details-status');

    this.reviewAndSubmitSubHeading = page.getByRole('heading', { name: 'Review and submit' });
    this.reviewPayAndSubmitLink = page.getByText('Review, pay and submit your');
    this.reviewPayAndSubmitStatus = page.locator('#review-pay-and-submit-status');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://adoption-web.aat.platform.hmcts.net/task-list', { waitUntil: 'load', timeout: 300 });
  }

  async clickNumberOfApplicantsLink(): Promise<void> {
    await this.numnberOfApplicantsLink.click();
  }

  async clickDateChildMovedInLink(): Promise<void> {
    await this.dateChildMovedInLink.click();
  }

  async clickChildDetailsLink(): Promise<void> {
    await this.childDetailsLink.click();
  }

  async clickAdoptionAgencyLink(): Promise<void> {
    await this.adoptionAgencyLink.click();
  }

  async clickFamilyCourtLink(): Promise<void> {
    await this.familyCourtLink.click();
  }

  async clickFirstApplicantPersonalDetailsLink(): Promise<void> {
    await this.firstApplicantPersonalDetailsLink.click();
  }

  async clickFirstAppicantContactDetailsLink(): Promise<void> {
    await this.firstApplicantContactDetailsLink.click();
  }

  async clickSecondApplicantPersonalDetailsLink(): Promise<void> {
    await this.secondApplicantPersonalDetailsLink.click();
  }

  async clickSecondApplicantContactDetailsLink(): Promise<void> {
    await this.secondApplicantContactDetailsLink.click();
  }

  async clickReviewPayANdSubmitLink(): Promise<void> {
    await this.reviewPayAndSubmitLink.click();
  }
}
