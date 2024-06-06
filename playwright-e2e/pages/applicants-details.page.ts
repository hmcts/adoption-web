import { type Locator, type Page } from '@playwright/test';

export default class AddApplicants {
  readonly otherNamesNo: Locator;
  readonly dayField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;

  constructor(page: Page) {
    this.otherNamesNo = page.getByLabel('No', { exact: true });
    this.dayField = page.getByLabel('Day');
    this.monthField = page.getByLabel('Month');
    this.yearField = page.getByLabel('Year');
  }

  async otherNamesSelectNo(): Promise<void> {
    await this.otherNamesNo.click();
  }

  async sameCourtYes(): Promise<void> {
    // await this.hearingInSameCourt.click();
  }

  async dob(): Promise<void> {
    const today = new Date();

    const dayString = `${today.getDate()}`;
    const monthString = `${today.getMonth()}`;
    const yearString = `${today.getFullYear() - 21}`;

    await this.dayField.fill(dayString);
    await this.monthField.fill(monthString);
    await this.yearField.fill(yearString);
  }
}
