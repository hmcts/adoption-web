import { type Locator, type Page } from '@playwright/test';

export default class NumberOfApplicants {
  readonly heading: Locator;
  readonly h1: Locator;
  readonly applyOnOwnRadio: Locator;
  readonly withSpouseCivilRadio: Locator;
  readonly withNotSpouseCivilRadio: Locator;
  readonly briefOverview: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Application details');
    this.h1 = page.getByRole('heading', { name: 'Are you applying on your own, or with someone else?' });
    this.applyOnOwnRadio = page.getByLabel('I\'m applying on my own');
    this.withSpouseCivilRadio = page.getByLabel('I\'m applying with my spouse or civil partner');
    this.withNotSpouseCivilRadio = page.getByLabel('I\'m applying with someone who is not my spouse or civil partner');
    this.briefOverview = page.getByLabel('Give a brief overview of what your relationship is with the other applicant.');
  }

  async applyWithSpouseOrCivil(): Promise<void> {
    await this.withSpouseCivilRadio.click();
  }
}
