import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAChildNationalityPage extends BasePage {
  readonly childNationalityHeading: Locator;

  readonly britishCheckbox: Locator;
  readonly irishCheckbox: Locator;
  readonly differentCountryCheckbox: Locator;
  readonly notSureCheckbox: Locator;

  readonly countryNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.childNationalityHeading = page.getByRole('heading', { name: 'What is their nationality?' });

    this.britishCheckbox = page.getByLabel('British');
    this.irishCheckbox = page.getByLabel('Irish');
    this.differentCountryCheckbox = page.getByLabel('Citizen of a different country');
    this.notSureCheckbox = page.getByLabel('Not sure');

    this.countryNameLabel = page.getByLabel('Country name');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}
