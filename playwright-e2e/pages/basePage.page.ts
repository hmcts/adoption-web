import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
export default class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAndContinue: Locator;
  readonly saveAsDraft: Locator;
  readonly continueWithYourApplication: Locator;
  readonly backLink: Locator;
  readonly postcode: Locator;
  readonly findAddress: Locator;
  readonly selectAddress: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraft = page.getByRole('button', { name: 'Save as draft' });
    this.continueWithYourApplication = page.getByRole('button', { name: 'Save as draft' });
    this.backLink = page.getByRole('link', { name: 'Back', exact: true });
    this.postcode = page.getByLabel('Postcode');
    this.findAddress = page.getByRole('button', { name: 'Find address' });
    this.selectAddress = page.getByLabel('Select an address');
    this.firstName = page.getByLabel('First names');
    this.lastName = page.getByLabel('Last names');
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinue.click();
  }

  async postcodeFindAddress(postcode: string, selectAdd: string){
    await this.postcode.fill(postcode);
    await this.findAddress.click();
    await this.selectAddress.selectOption(selectAdd);
  }

  async fillFirstLastName(){
    await this.firstName.fill(randomFirstName);
    await this.lastName.fill(randomLastName);
  }
}
