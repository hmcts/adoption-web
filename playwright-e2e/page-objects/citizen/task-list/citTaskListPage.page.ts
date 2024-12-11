import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITTaskListPage extends BasePage {
  readonly applyToAdoptAChildHeading: Locator;

  // first group: Add application details
  readonly addApplicationDetailsGroup: Locator;

  readonly numnberOfApplicantsLink: Locator;
  readonly numberOfApplicantsStatus: Locator;

  readonly dateChildMovedInLink: Locator;
  readonly dateChildMovedInStatus: Locator;

  readonly childDetailsGroup: Locator;
  readonly childDetailsLink: Locator;
  readonly childDetailsStatus: Locator;

  readonly adptionAgencyGroup: Locator;
  readonly adoptionAgencyLink: Locator;
  readonly adoptionAgencyStatus: Locator;

  readonly familyCourtGroup: Locator;
  readonly familyCourtLink: Locator;
  readonly familyCourtStatus: Locator;

  // second group: Add applicant's details
  readonly addApplicantsDetailsGroup: Locator;

  // first subgroup: First applicant
  readonly firstApplicantGroup: Locator;

  readonly firstApplicantPersonalDetailsGroup: Locator;
  readonly firstApplicantPersonalDetailsLink: Locator;
  readonly firstApplicantPersonalDetialsStatus: Locator;

  readonly firstApplicantContactDetailsGroup: Locator;
  readonly firstApplicantContactDetailsLink: Locator;
  readonly firstApplicantDetailsStatus: Locator;

  // second subgroup: Second applicant
  readonly secondApplicantGroup: Locator;

  readonly secondApplicantPersonalDetailsGroup: Locator;
  readonly secondApplicantPersonalDetailsLink: Locator;
  readonly secondApplicantPersonalDetialsStatus: Locator;

  readonly secondApplicantContactDetailsGroup: Locator;
  readonly secondApplicantContactDetailsLink: Locator;
  readonly secondApplicantDetailsStatus: Locator;

  // third group: Review and Submit
  readonly reviewAndSubmitGroup: Locator;

  readonly reviewPayAndSubmitLink: Locator;
  readonly reviewPayAndSubmitStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.applyToAdoptAChildHeading = page.getByRole('heading', { name: 'Apply to adopt a child placed' });

    this.addApplicantsDetailsGroup = page.getByRole('group', { name: 'Add application details' });

    this.numnberOfApplicantsLink = page.getByRole('link', {
      name: 'Number of applicants',
    });
    this.numberOfApplicantsStatus = page.locator('#applying-with-status');

    this.dateChildMovedInLink = page.getByRole('link', { name: 'Date child moved in with you' });
    this.dateChildMovedInStatus = page.locator('#date-child-moved-in-status');
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
}
