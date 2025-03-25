import { type Locator, type Page } from '@playwright/test';

import { Config } from '../utils/urls';

export default class SignIn {
  readonly page: Page;
  readonly heading: Locator;
  readonly heading2: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signinButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign in or create an account' });
    this.heading2 = page.getByRole('heading', { name: 'Sign in', exact: true });
    this.email = page.getByLabel('Email address');
    this.password = page.getByText('Password', { exact: true });
    this.signinButton = page.getByRole('button', { name: 'Sign in' });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(Config.citizenFrontendBaseUrl, { waitUntil: 'load', timeout: 3000 });
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signinButton.click();
  }
}
