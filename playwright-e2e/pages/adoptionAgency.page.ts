import { faker } from '@faker-js/faker';
import { type Locator, type Page } from '@playwright/test';

import BasePage from './basePage.page';

const randomFullName = faker.person.fullName();
const randomPhoneNumber = faker.helpers.fromRegExp(/[1-7]{11}/);
const randomSocialWorkerEmail = faker.internet.email({ firstName: `${randomFullName}`, provider: 'gov.uk' });
const randomAuthorityEmail = faker.internet.email({ firstName: 'Sandwell', lastName: 'Council', provider: 'gov.uk' });

export default class AdoptionAgency extends BasePage {
  readonly heading: Locator;
  readonly nameOfChildsSocialWorker: Locator;
  readonly phoneNumber: Locator;
  readonly emailAddress: Locator;
  readonly localAuthorityEmail: Locator;
  readonly nameOfYourSocialWorker: Locator;
  readonly anotherAdoptionAgency: Locator;

  public constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: "Child's social worker details" });
    this.nameOfChildsSocialWorker = page.getByLabel("Name of child's social worker");
    this.phoneNumber = page.getByLabel('Phone number');
    this.emailAddress = page.getByLabel('Email address (if known)');
    this.localAuthorityEmail = page.getByLabel('Local authority email address');
    this.nameOfYourSocialWorker = page.getByLabel('Name of your social worker');
    this.anotherAdoptionAgency = page.getByLabel('No', { exact: true });
  }

  async childsChildSocialWorkerDetails(location): Promise<void> {
    await this.nameOfChildsSocialWorker.fill(randomFullName);
    await this.phoneNumber.fill(randomPhoneNumber);
    await this.emailAddress.fill(randomSocialWorkerEmail);
    await this.localAuthorityEmail.fill(randomAuthorityEmail);
    await this.selectLocation(location);
  }

  async childsYourSocialWorkerDetails(location): Promise<void> {
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
