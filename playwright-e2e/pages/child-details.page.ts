import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();

export default class ChildDetails {
  readonly text1: Locator;
  readonly h1: Locator;
  readonly text2: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;

  constructor(page: Page) {
    this.text1 = page.getByText('The child\'s details');
    this.h1 = page.getByRole('heading', { name: 'What is the child\'s full name?' });
    this.text2 = page.getByText('Enter the child\'s full name,');
    this.firstName = page.getByLabel('First names');
    this.lastName = page.getByLabel('Last names');
    this.day = page.getByLabel('Day');
    this.month = page.getByLabel('Month');
    this.year = page.getByLabel('Year');
  }
  
  async childsName(): Promise<void> {
    await this.firstName.fill(randomFirstName);
    await this.lastName.fill(randomLastName);
  }
  async childsDob(): Promise<void> {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear());

    await this.day.fill(day);
    await this.month.fill(month);
    await this.year.fill(year);
  }
}
