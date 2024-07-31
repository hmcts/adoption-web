import { faker } from '@faker-js/faker';
import { type Locator, type Page } from '@playwright/test';

const jobTitle = faker.person.jobTitle();

export default class AddApplicants {
  readonly otherNamesNo: Locator;
  readonly dayField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;
  readonly occupationFirst: Locator;
  readonly occupationSecond: Locator;

  constructor(page: Page) {
    this.otherNamesNo = page.getByLabel('No', { exact: true });
    this.dayField = page.getByLabel('Day');
    this.monthField = page.getByLabel('Month');
    this.yearField = page.getByLabel('Year');
    this.occupationFirst = page.locator('#applicant1Occupation');
    this.occupationSecond = page.locator('#applicant2Occupation');
  }

  async otherNamesSelectNo(): Promise<void> {
    await this.otherNamesNo.click();
  }

  async sameCourtYes(): Promise<void> {
    // await this.hearingInSameCourt.click();
  }

  async dob(): Promise<void> {
    const today = new Date();
    const dayString = String(today.getDate());
    const monthString = String(today.getMonth() + 1); //getMonth() uses zero-based index so + 1 is needed to convert it to correct month for inputting in test
    const yearString = String(today.getFullYear() - 21);

    await this.dayField.fill(dayString);
    await this.monthField.fill(monthString);
    await this.yearField.fill(yearString);
  }

  async addOccupationFirst(): Promise<void> {
    await this.occupationFirst.fill(jobTitle);
  }
  async addOccupationSecond(): Promise<void> {
    await this.occupationSecond.fill(jobTitle);
  }
}
