import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

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
  readonly dayField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;
  readonly locationPickerA: Locator;

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
    this.dayField = page.getByLabel('Day');
    this.monthField = page.getByLabel('Month');
    this.yearField = page.getByLabel('Year');
    this.locationPickerA = page.locator('#location-picker');
  }

  async postcodeFindAddress(postcode: string, selectAdd: string) {
    await this.postcode.fill(postcode);
    await this.findAddress.click();
    await this.selectAddress.selectOption(selectAdd);
  }

  async fillFirstLastName(firstName, lastName) {
    await this.firstName.click(); //reduce flakiness of filling out name
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
  }

  async enterDate(amendYear): Promise<void> {
    const today = new Date();
    const dayString = `${today.getDate()}`;
    const monthString = `${today.getMonth()}`;
    const yearString = `${today.getFullYear() + amendYear}`;

    await this.dayField.fill(dayString);
    await this.monthField.fill(monthString);
    await this.yearField.fill(yearString);
  }

  async selectLocation(location) {
    await expect(this.locationPickerA).toBeEditable();
    await this.locationPickerA.pressSequentially(location, { delay: 10 });
    await expect(this.locationPickerA).toHaveValue(location);
    await this.locationPickerA.press('Enter');
  }
}
