import { Locator, Page } from '@playwright/test';

import BasePage from './basePage.page.ts';

export class NationalityPage extends BasePage {
  readonly britishCheckbox: Locator;
  readonly irishCheckbox: Locator;
  readonly differentCountryCheckbox: Locator;
  readonly notSureCheckbox: Locator;

  readonly countryNameLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.britishCheckbox = page.getByLabel('British');
    this.irishCheckbox = page.getByLabel('Irish');
    this.differentCountryCheckbox = page.getByLabel('Citizen of a different country');
    this.notSureCheckbox = page.getByLabel('Not sure');

    this.countryNameLabel = page.getByLabel('Country name');
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

  async fillCounrtyNameLabel(country: string): Promise<void> {
    await this.countryNameLabel.fill(country);
  }
}
