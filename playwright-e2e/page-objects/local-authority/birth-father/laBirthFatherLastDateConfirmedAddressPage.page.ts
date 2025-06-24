import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherLastDateConfirmedAddressPage extends BasePage {
  readonly birthFatherLastDateConfirmedAddressHeading: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherLastDateConfirmedAddressHeading = page.getByRole('heading', {
      name: 'When was the last date this',
    });

    this.dayLabel = page.getByLabel('Day');
    this.monthLabel = page.getByLabel('Month');
    this.yearLabel = page.getByLabel('Year');
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
