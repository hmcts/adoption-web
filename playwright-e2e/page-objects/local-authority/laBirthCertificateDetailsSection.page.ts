import { Locator, Page } from '@playwright/test';

export class LAChildSexAtBirthPage {
  readonly childSexAtBirthHeading: Locator;

  readonly maleRadioButton: Locator;
  readonly femaleRadioButton: Locator;
  readonly otherRadioButton: Locator;

  readonly otherSexLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.childSexAtBirthHeading = page.getByRole('heading', { name: "What was the child's sex at" });

    this.maleRadioButton = page.getByLabel('Male', { exact: true });
    this.femaleRadioButton = page.getByLabel('Female', { exact: true });
    this.otherRadioButton = page.getByLabel('Other', { exact: true });

    this.otherSexLabel = page.getByLabel("For example, if the child's");

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkMaleRadioButton(): Promise<void> {
    await this.maleRadioButton.check();
  }

  async checkFemaleRadioButton(): Promise<void> {
    await this.femaleRadioButton.check();
  }

  async checkOtherRadioButton(): Promise<void> {
    await this.otherRadioButton.check();
  }

  async fillOtherSexLabel(): Promise<void> {
    await this.otherSexLabel.fill('intersex');
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LAChildNationalityPage {
  readonly childNationalityHeading: Locator;

  readonly britishCheckbox: Locator;
  readonly irishCheckbox: Locator;
  readonly differentCountryCheckbox: Locator;
  readonly notSureCheckbox: Locator;

  readonly countryNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.childNationalityHeading = page.getByRole('heading', { name: 'What is their nationality?' });

    this.britishCheckbox = page.getByLabel('British');
    this.irishCheckbox = page.getByLabel('Irish');
    this.differentCountryCheckbox = page.getByLabel('Citizen of a different country');
    this.notSureCheckbox = page.getByLabel('Not sure');

    this.countryNameLabel = page.getByLabel('Country name');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
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

  async checkNotSureCheckbox(): Promise<void> {
    await this.notSureCheckbox.check();
  }

  async fillCountryNameLabel(): Promise<void> {
    await this.countryNameLabel.fill('N/A');
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
