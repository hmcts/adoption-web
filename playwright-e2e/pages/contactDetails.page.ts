import { type Locator, type Page } from '@playwright/test';

export default class ContactDetails {
  readonly h1: Locator;
  readonly email: Locator;
  readonly phoneNumber: Locator;
  readonly englishLang: Locator;

  constructor(page: Page) {
    this.h1 = page.getByRole('heading', { name: 'Extra support during your case' });
    this.email = page.getByLabel('Email address');
    this.phoneNumber = page.getByLabel('UK phone number');
    this.englishLang = page.getByLabel('English');
  }

  async fillContactDetails(fillEmail: string, fillPhoneNumber: string): Promise<void> {
    await this.email.fill(fillEmail); //
    await this.phoneNumber.fill(fillPhoneNumber); //
  }
}
