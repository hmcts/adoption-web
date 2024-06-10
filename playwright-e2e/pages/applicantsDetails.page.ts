import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

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
    const dayString = `${today.getDate()}`;
    const monthString = `${today.getMonth()}`;
    const yearString = `${today.getFullYear() - 21}`;

    await this.dayField.fill(dayString);
    await this.monthField.fill(monthString);
    await this.yearField.fill(yearString);
  }

  async addOccupationFirst(): Promise<void> {
    await this.occupationFirst.fill(jobTitle);
  }
  async addOccupationSecond(){
    await this.occupationSecond.fill(jobTitle);
  }
}
