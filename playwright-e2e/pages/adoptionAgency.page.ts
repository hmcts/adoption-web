import { faker } from '@faker-js/faker';
import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

const randomFullName = faker.person.fullName();
const randomPhoneNumber = faker.helpers.fromRegExp(/[1-7]{11}/);
const randomSocialWorkerEmail = faker.internet.email({ firstName: `${randomFullName}`, provider: 'gov.uk' });
const randomAuthorityEmail = faker.internet.email({ firstName: 'Sandwell', lastName: 'Council', provider: 'gov.uk' });


// This is a test comment, Austen Stevens, 10/09/2024
export default class AdoptionAgency {
  readonly heading: Locator;
  readonly nameOfChildsSocialWorker: Locator;
  readonly phoneNumber: Locator;
  readonly emailAddress: Locator;
  readonly locationPicker: Locator;
  readonly localAuthorityEmail: Locator;
  readonly nameOfYourSocialWorker: Locator;
  readonly anotherAdoptionAgency: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: "Child's social worker details" });
    this.nameOfChildsSocialWorker = page.getByLabel("Name of child's social worker");
    this.phoneNumber = page.getByLabel('Phone number');
    this.emailAddress = page.getByLabel('Email address (if known)');
    this.locationPicker = page.locator('#location-picker');
    this.localAuthorityEmail = page.getByLabel('Local authority email address');
    this.nameOfYourSocialWorker = page.getByLabel('Name of your social worker');
    this.anotherAdoptionAgency = page.getByLabel('No', { exact: true });
  }

  async selectLocation(location: string): Promise<void> {
    await expect(this.locationPicker).toBeEditable();
    await this.locationPicker.pressSequentially(location, { delay: 10 });
    await this.locationPicker.press('Enter');
  }

  async childsChildSocialWorkerDetails(location: string): Promise<void> {
    await this.nameOfChildsSocialWorker.fill(randomFullName);
    await this.phoneNumber.fill(randomPhoneNumber);
    await this.emailAddress.fill(randomSocialWorkerEmail);
    await this.localAuthorityEmail.fill(randomAuthorityEmail);
    await this.selectLocation(location);
  }

  async childsYourSocialWorkerDetails(location: string): Promise<void> {
    await this.nameOfYourSocialWorker.fill(randomFullName);
    await this.phoneNumber.fill(randomPhoneNumber);
    await this.emailAddress.fill(randomSocialWorkerEmail);
    await this.localAuthorityEmail.fill(randomAuthorityEmail);
    await this.selectLocation(location);
  }

  async anotherAdoptionAgencyNo(): Promise<void> {
    await this.anotherAdoptionAgency.click();
  }
}
