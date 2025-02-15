import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITDateChildMovedInPage extends BasePage {
  readonly applicationDetailsTitle: Locator;
  readonly childMoveInHeading: Locator;

  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;

  readonly applicationTooltip: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;
  readonly findACourtLink: Locator;

  readonly errorDateSummary: Locator;
  readonly errorDaySummary: Locator;
  readonly errorMonthSummary: Locator;
  readonly errorMonthAndYearSummary: Locator;
  readonly errorYearSummary: Locator;
  readonly errorRealDateSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.getByText('Application details');
    this.childMoveInHeading = page.getByRole('heading', { name: 'When did the child move in' });

    this.day = page.getByLabel('Day');
    this.month = page.getByLabel('Month');
    this.year = page.getByLabel('Year');

    this.applicationTooltip = page.getByText('Warning You can begin your');

    this.contactUsForHelpDropdownLink = page.getByText('Contact us for help');
    this.contactACourtHeading = page.getByRole('heading', { name: 'Contact a court that deals' });
    this.findACourtLink = page.getByRole('link', { name: 'Find a Court or Tribunal' });

    this.errorDateSummary = page.getByRole('link', { name: 'Enter the date the child' });
    this.errorDaySummary = page.getByRole('link', { name: 'Enter the day the child moved' });
    this.errorMonthSummary = page.getByRole('link', { name: 'Enter the month the child' });
    this.errorMonthAndYearSummary = page.getByRole('link', { name: 'Enter the month and year the' });
    this.errorYearSummary = page.getByRole('link', { name: 'Enter the year the child' });
    this.errorRealDateSummary = page.getByRole('link', { name: 'Must be a real date' });
  }

  async fillDayLabel(day: string): Promise<void> {
    await this.day.fill(day);
  }

  async fillMonthLabel(month: string): Promise<void> {
    await this.month.fill(month);
  }

  async fillYearLabel(year: string): Promise<void> {
    await this.year.fill(year);
  }

  async clickContactUsForHelpDropDownLink(): Promise<void> {
    await this.contactACourtHeading.click();
  }
}
