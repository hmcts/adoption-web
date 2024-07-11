import { type Locator, type Page } from '@playwright/test';
export default class DateChildMoved {
  readonly text1: Locator;
  readonly h1: Locator;
  readonly text2: Locator;
  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;

  constructor(page: Page) {
    this.text1 = page.getByText('Application details');
    this.h1 = page.getByRole('heading', { name: 'When did the child move in' });
    this.text2 = page.getByText('Enter the date when they');
    this.day = page.getByLabel('Day');
    this.month = page.getByLabel('Month');
    this.year = page.getByLabel('Year');
  }

  async dateChildMovedInToday(): Promise<void> {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const year = String(today.getFullYear()-1);

    await this.day.fill(day);
    await this.month.fill(month);
    await this.year.fill(year);
  }
}
