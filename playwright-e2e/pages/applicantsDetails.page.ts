import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const jobTitle = faker.person.jobTitle();

export default class AddApplicants {
  readonly otherNamesNo: Locator;
  
  readonly occupationFirst: Locator;
  readonly occupationSecond: Locator;

  constructor(page: Page) {
    this.otherNamesNo = page.getByLabel('No', { exact: true });
    
    this.occupationFirst = page.locator('#applicant1Occupation');
    this.occupationSecond = page.locator('#applicant2Occupation');
  }

  async otherNamesSelectNo(): Promise<void> {
    await this.otherNamesNo.click();
  }

  async sameCourtYes(): Promise<void> {
    // await this.hearingInSameCourt.click();
  }

  

  async addOccupationFirst(): Promise<void> {
    await this.occupationFirst.fill(jobTitle);
  }
  async addOccupationSecond(){
    await this.occupationSecond.fill(jobTitle);
  }
}
