import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherLastDateConfirmedAddressPage extends BasePage {
  readonly birthFatherLastDateConfirmedAddressHeading: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherLastDateConfirmedAddressHeading = page.getByRole('heading', {
      name: 'When was the last date this',
    });

    this.dayLabel = page.getByLabel('Day');
    this.monthLabel = page.getByLabel('Month');
    this.yearLabel = page.getByLabel('Year');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
  async fillDayLabel(day: string): Promise<void> {
    await this.dayLabel.fill(day);
  }

  async fillMonthLabel(month: string): Promise<void> {
    await this.monthLabel.fill(month);
  }

  async fillYearLabel(year: string): Promise<void> {
    await this.yearLabel.fill(year);
  }
}
