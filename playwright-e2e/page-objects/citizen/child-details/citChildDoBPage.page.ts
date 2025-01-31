import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITChildDoBPage extends BasePage {
  readonly childDetailsTitle: Locator;
  readonly childDoBHeading: Locator;

  readonly dayText: Locator;
  readonly monthText: Locator;
  readonly yearText: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  readonly errorDateSummary: Locator;
  readonly errorDaySummary: Locator;
  readonly errorMonthSummary: Locator;
  readonly errorYearSummary: Locator;
  readonly errorDayMonthSummary: Locator;
  readonly errorDayYearSummary: Locator;
  readonly errorMonthYearSummary: Locator;
  readonly realDateSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.childDetailsTitle = page.getByText("The child's details");
    this.childDoBHeading = page.getByRole('heading', { name: "What is the child's date of" });

    this.dayText = page.getByText('Day');
    this.monthText = page.getByText('Month', { exact: true });
    this.yearText = page.getByText('Year', { exact: true });

    this.dayLabel = page.getByRole('textbox', { name: 'Day' });
    this.monthLabel = page.getByRole('textbox', { name: 'Month' });
    this.yearLabel = page.getByRole('textbox', { name: 'Year' });

    this.errorDateSummary = page.getByRole('link', { name: 'Enter their date of birth' });
    this.errorDaySummary = page.getByRole('link', { name: 'Date of birth must include a day' });
    this.errorMonthSummary = page.getByRole('link', { name: 'Date of birth must include a month' });
    this.errorYearSummary = page.getByRole('link', { name: 'Date of birth must include a year' });
    this.errorDayMonthSummary = page.getByRole('link', { name: 'Date of birth must include a day and month' });
    this.errorDayYearSummary = page.getByRole('link', { name: 'Date of birth must include a day and year' });
    this.errorMonthYearSummary = page.getByRole('link', { name: 'Date of birth must include a month and year' });
    this.realDateSummary = page.getByRole('link', { name: 'Date of birth must be a real date' });
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
