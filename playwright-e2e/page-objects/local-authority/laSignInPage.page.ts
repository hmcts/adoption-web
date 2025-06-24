import { type Locator, type Page } from '@playwright/test';

import BasePage from '../../pages/basePage.page';

export class LASignInPage extends BasePage {
  readonly applicationDetailsHeading: Locator;
  readonly courtCaseReferenceNumberHeading: Locator;
  readonly childNameOnApplicationHeading: Locator;
  readonly childDateOfBirthHeading: Locator;

  readonly courtCaseReferenceNumber: Locator;
  readonly childNameOnApplication: Locator;
  readonly childDateOfBirthDay: Locator;
  readonly childDateOfBirthMonth: Locator;
  readonly childDateOfBirthYear: Locator;

  readonly saveAndContinueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.applicationDetailsHeading = page.getByRole('heading', { name: 'Application details' });
    this.courtCaseReferenceNumberHeading = page.getByRole('heading', { name: 'Court case reference number' });
    this.childNameOnApplicationHeading = page.getByRole('heading', { name: 'Child named on the application' });
    this.childDateOfBirthHeading = page.getByRole('heading', { name: "Child's date of birth" });

    this.courtCaseReferenceNumber = page.getByLabel('Court case reference number');
    this.childNameOnApplication = page.getByLabel('Child named on the application');
    this.childDateOfBirthDay = page.getByLabel('Day');
    this.childDateOfBirthMonth = page.getByLabel('Month');
    this.childDateOfBirthYear = page.getByLabel('Year');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://adoption-web.aat.platform.hmcts.net/la-portal/kba-case-ref');
  }

  async startLAJourney(caseRefNo: string, childFullName: string): Promise<void> {
    const today = new Date();
    const day = String(today.getDate());
    const month = String(today.getMonth() + 1);
    const year = String(today.getFullYear() - 5);

    await this.courtCaseReferenceNumber.fill(caseRefNo);
    await this.childNameOnApplication.fill(childFullName);
    await this.childDateOfBirthDay.fill(day);
    await this.childDateOfBirthMonth.fill(month);
    await this.childDateOfBirthYear.fill(year);

    await super.clickSaveAndContinue();
  }
}
