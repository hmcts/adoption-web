import { type Locator, type Page } from '@playwright/test';
export default class Tasklist {
  readonly heading: Locator;
  readonly heading1: Locator;
  readonly heading2: Locator;
  readonly heading3: Locator;
  readonly numberOfApplicants: Locator;
  readonly dateChildMovedIn: Locator;
  readonly childsDetails: Locator;
  readonly adoptionAgency: Locator;
  readonly familyCourtDetails: Locator;
  readonly firstApplicantPersonalDetails: Locator;
  readonly firstApplicantContactDetails: Locator;
  readonly secondApplicantPersonalDetails: Locator;
  readonly secondApplicantContactDetails: Locator;
  readonly reviewAndSubmit: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Apply to adopt a child placed in your care' });
    this.heading1 = page.getByRole('heading', { name: 'Add application details' });
    this.heading2 = page.getByRole('heading', { name: "Add applicant's details" });
    this.heading3 = page.getByRole('heading', { name: 'Review and submit' });
    this.numberOfApplicants = page.getByRole('link', { name: 'Number of applicants' });
    this.dateChildMovedIn = page.getByRole('link', { name: 'Date child moved in with you' });
    this.childsDetails = page.getByRole('link', { name: "Child's details" });
    this.adoptionAgency = page.getByRole('link', { name: 'Adoption agency and social' });
    this.familyCourtDetails = page.getByRole('link', { name: 'The family court details' });
    this.firstApplicantPersonalDetails = page.getByRole('link', { name: 'Your personal details  First' });
    this.firstApplicantContactDetails = page.getByRole('link', { name: 'Your contact details  First' });
    this.secondApplicantPersonalDetails = page.getByRole('link', { name: 'Your personal details  Second' });
    this.secondApplicantContactDetails = page.getByRole('link', { name: 'Your contact details  Second' });
    this.reviewAndSubmit = page.getByRole('link', { name: 'Review, pay and submit your' });
  }
}
