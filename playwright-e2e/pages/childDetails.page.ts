import { type Locator, type Page } from '@playwright/test';

export default class ChildDetails {
  readonly text1: Locator;
  readonly h1: Locator;
  readonly text2: Locator;

  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;

  constructor(page: Page) {
    this.text1 = page.getByText("The child's details");
    this.h1 = page.getByRole('heading', { name: "What is the child's full name?" });
    this.text2 = page.getByText("Enter the child's full name,");

    this.day = page.getByLabel('Day');
    this.month = page.getByLabel('Month');
    this.year = page.getByLabel('Year');
  }

  async childsDob(): Promise<void> {
    const today = new Date();
    const day = String(today.getDate());
    const month = String(today.getMonth() + 1); //getMonth() uses zero-based index so + 1 is needed to convert it to correct month for inputting in test
    const year = String(today.getFullYear() - 5);

    await this.day.fill(day);
    await this.month.fill(month);
    await this.year.fill(year);
  }
}
