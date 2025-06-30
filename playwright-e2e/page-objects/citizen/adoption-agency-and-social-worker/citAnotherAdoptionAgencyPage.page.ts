import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITAnotherAdoptionAgencyPage extends BasePage {
  readonly applicationDetailsTitle: Locator;

  readonly anotherAdoptionAgencyHeading: Locator;
  readonly anotherAdoptionAgencyDescription: Locator;

  readonly radioButtonGroup: Locator;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly errorAnswerQuestionSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.locator('span.govuk-caption-l');

    this.anotherAdoptionAgencyHeading = page.locator('h1.govuk-heading-l');
    this.anotherAdoptionAgencyDescription = page.locator('#hasAnotherAdopAgencyOrLA-hint');

    this.radioButtonGroup = page.locator('');
    this.yesRadioButton = page.locator('');
    this.noRadioButton = page.locator('');

    this.errorAnswerQuestionSummary = page.locator('');
  }
}
