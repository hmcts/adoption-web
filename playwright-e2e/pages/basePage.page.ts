import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';
export default class BasePage {
  readonly page: Page;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;
  readonly britishCheckbox: Locator;
  readonly irishCheckbox: Locator;
  readonly differentCountryCheckbox: Locator;
  readonly countryNameLabel: Locator;
  readonly notSureCheckbox: Locator;
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
  readonly locationPicker: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });
    this.britishCheckbox = page.getByLabel('British');
    this.irishCheckbox = page.getByLabel('Irish');
    this.differentCountryCheckbox = page.getByLabel('Citizen of a different country');
    this.countryNameLabel = page.getByLabel('Country name');
    this.notSureCheckbox = page.getByLabel('Not sure');
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
    this.locationPicker = page.locator('#location-picker');
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async checkBritishCheckbox(): Promise<void> {
    await this.britishCheckbox.check();
  }

  async checkIrishCheckbox(): Promise<void> {
    await this.irishCheckbox.check();
  }

  async checkDifferentCountryCheckbox(): Promise<void> {
    await this.differentCountryCheckbox.check();
  }

  async fillCounrtyNameLabel(country: string): Promise<void> {
    await this.countryNameLabel.fill(country);
  }

  async checkNotSureCheckbox(): Promise<void> {
    await this.notSureCheckbox.check();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinue.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraft.click();
  }

  async postcodeFindAddress(postcode: string, selectAdd: string): Promise<void> {
    await this.postcode.fill(postcode);
    await this.findAddress.click();
    await this.selectAddress.selectOption(selectAdd);
  }

  async fillFirstLastName(firstName: string, lastName: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
  }

  async selectLocation(location: string): Promise<void> {
    await expect(this.locationPicker).toBeEditable();
    await this.locationPicker.fill(location);
    await expect(this.locationPicker).toHaveValue(location);
    await this.locationPicker.press('Enter');
  }
}
