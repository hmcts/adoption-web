import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherNationalityPage extends BasePage {
  readonly birthMotherNationalityHeading: Locator;

  readonly birthMotherNationalityBritishCheckbox: Locator;
  readonly birthMotherNationalityIrishCheckbox: Locator;
  readonly birthMotheNationalityDifferentCountryCheckbox: Locator;
  readonly birthMotherNationalityNotSureCheckbox: Locator;

  readonly birthMotherNationalityCountryLabel: Locator;
  readonly birthMotherNationalityCountryAddButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherNationalityHeading = page.getByRole('heading', { name: 'What is the nationality of' });

    this.birthMotherNationalityBritishCheckbox = page.getByLabel('British');
    this.birthMotherNationalityIrishCheckbox = page.getByLabel('Irish');
    this.birthMotheNationalityDifferentCountryCheckbox = page.getByLabel('Country name');
    this.birthMotherNationalityNotSureCheckbox = page.getByLabel('Not sure');

    this.birthMotherNationalityCountryLabel = page.getByLabel('Country name');
    this.birthMotherNationalityCountryAddButton = page.getByRole('button', { name: 'Add' });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkMotherNationalityBritishCheckbox(): Promise<void> {
    await this.birthMotherNationalityBritishCheckbox.check();
  }

  async chechMotherNationalityIrishCheckbox(): Promise<void> {
    await this.birthMotherNationalityIrishCheckbox.check();
  }

  async checkMotherNationalityDifferentCountryCheckbox(): Promise<void> {
    await this.birthMotheNationalityDifferentCountryCheckbox.check();
  }

  async checkMotherNationalityNotSureCheckbox(): Promise<void> {
    await this.birthMotherNationalityNotSureCheckbox.check();
  }
}
