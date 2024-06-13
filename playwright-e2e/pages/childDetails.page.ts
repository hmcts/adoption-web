import { type Locator, type Page } from '@playwright/test';


export default class ChildDetails {
  readonly text1: Locator;
  readonly h1: Locator;
  readonly text2: Locator;

  constructor(page: Page) {
    this.text1 = page.getByText('The child\'s details');
    this.h1 = page.getByRole('heading', { name: 'What is the child\'s full name?' });
    this.text2 = page.getByText('Enter the child\'s full name,');
  }
}
