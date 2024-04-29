import { type Locator, type Page, expect } from '@playwright/test';

export class Eligibility {
  readonly page: Page;
  readonly h1: Locator;
  readonly mainContent: Locator;
  readonly continueButton: Locator;
  readonly applyMoreThanOneChildNo: Locator;
  readonly applyMoreThanOneChildYes: Locator;
  readonly childUnder18No: Locator;
  readonly childUnder18Yes: Locator;
  readonly labelWarningYouCanOnly: Locator;
  readonly moreAboutAdoptionLink: Locator;
  readonly isChildMarriedOrCivilPartnershipYes: Locator;
  readonly isChildMarriedOrCivilPartnershipNo: Locator;
  readonly areYouAndApplicantOver21Yes: Locator;
  readonly areYouAndApplicantOver21No: Locator;
  readonly uKCountryOfResidenceYes: Locator;
  readonly uKCountryOfResidenceNo: Locator;
  readonly uKCountryOfResidence12MonthsYes: Locator;
  readonly uKCountryOfResidence12MonthsNo: Locator;
  readonly signInText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { name: 'Apply to adopt a child placed in your care' });
    this.mainContent = page.locator('#main-content');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.applyMoreThanOneChildNo = page.getByLabel('No');
    this.applyMoreThanOneChildYes = page.getByLabel('Yes');
    this.childUnder18No = page.getByLabel('No');
    this.childUnder18Yes = page.getByLabel('Yes');
    this.isChildMarriedOrCivilPartnershipYes = page.getByLabel('Yes');
    this.isChildMarriedOrCivilPartnershipNo = page.getByLabel('No');
    this.labelWarningYouCanOnly = page.getByText('You ');
    this.moreAboutAdoptionLink = page.getByRole('link', { name: 'More about adoption' });
    this.areYouAndApplicantOver21Yes = page.getByLabel('Yes');
    this.areYouAndApplicantOver21No = page.getByLabel('No');
    this.uKCountryOfResidenceYes = page.getByLabel('Yes');
    this.uKCountryOfResidenceNo = page.getByLabel('No');
    this.uKCountryOfResidence12MonthsYes = page.getByLabel('Yes');
    this.uKCountryOfResidence12MonthsNo = page.getByLabel('No');
    this.signInText = page.locator('#skiplinktarget');
  }

  async isEligible(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18Yes.check();
    await this.continueButton.click();
    await this.isChildMarriedOrCivilPartnershipNo.check();
    await this.continueButton.click();
    await this.areYouAndApplicantOver21Yes.check();
    await this.continueButton.click();
    await this.uKCountryOfResidenceYes.check();
    await this.continueButton.click();
    await this.uKCountryOfResidence12MonthsYes.check();
    await this.continueButton.click();
    await expect(this.signInText).toContainText('Sign in or create an account');
  }

  async isNotover18(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18No.check();
    await expect(this.labelWarningYouCanOnly).toContainText([
      'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.',
    ]);
    await expect(this.moreAboutAdoptionLink).toBeVisible();
    await this.continueButton.click();
    await expect(this.mainContent).toContainText([
      "Check you're eligible to adopt You cannot apply to adopt You cannot apply to adopt the child because they’re 18 or over. More about adoption",
    ]);
  }

  async isMarriedOrCivilPartnership(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18Yes.check();
    await this.continueButton.click();
    await this.isChildMarriedOrCivilPartnershipYes.check();
    await expect(this.labelWarningYouCanOnly).toContainText([
      "You can only apply to adopt a child if they've not been married or in a civil partnership.",
    ]);
    await expect(this.moreAboutAdoptionLink).toBeVisible();
    await this.continueButton.click();
    await expect(this.mainContent).toContainText([
      "Check you're eligible to adopt You cannot apply to adopt You cannot apply to adopt the child because they've been married or in a civil partnership. More about adoption",
    ]);
  }

  async youAndApplicantUnder21(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18Yes.check();
    await this.continueButton.click();
    await this.isChildMarriedOrCivilPartnershipNo.check();
    await this.continueButton.click();
    await this.areYouAndApplicantOver21No.check();
    await expect(this.labelWarningYouCanOnly).toContainText([
      'You must be 21 or over to adopt a child. This includes any other applicant.',
    ]);
    await expect(this.moreAboutAdoptionLink).toBeVisible();
    await this.continueButton.click();
    await expect(this.mainContent).toContainText([
      "Check you're eligible to adopt You cannot apply to adopt You cannot apply to adopt the child until you, and your partner if applicable, are 21. More about adoption",
    ]);
  }

  async notUKResident(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18Yes.check();
    await this.continueButton.click();
    await this.isChildMarriedOrCivilPartnershipNo.check();
    await this.continueButton.click();
    await this.areYouAndApplicantOver21Yes.check();
    await this.continueButton.click();
    await this.uKCountryOfResidenceNo.check();
    await expect(this.labelWarningYouCanOnly).toContainText([
      'You cannot apply to adopt a child unless you have a permanent home here.',
    ]);
    await expect(this.moreAboutAdoptionLink).toBeVisible();
    await this.continueButton.click();
    await expect(this.mainContent).toContainText(['You cannot apply to adopt']);
  }

  async notUKResident12Months(): Promise<void> {
    await this.continueButton.click();
    await this.applyMoreThanOneChildNo.check();
    await this.continueButton.click();
    await this.childUnder18Yes.check();
    await this.continueButton.click();
    await this.isChildMarriedOrCivilPartnershipNo.check();
    await this.continueButton.click();
    await this.areYouAndApplicantOver21Yes.check();
    await this.continueButton.click();
    await this.uKCountryOfResidenceYes.check();
    await this.continueButton.click();
    await this.uKCountryOfResidence12MonthsYes.check();
    await this.uKCountryOfResidence12MonthsNo.check();
    await expect(this.labelWarningYouCanOnly).toContainText([
      'You cannot apply to adopt a child unless you have a permanent home here.',
    ]);
    await this.continueButton.click();
    await expect(this.mainContent).toContainText(['You cannot apply to adopt']);
  }
}
