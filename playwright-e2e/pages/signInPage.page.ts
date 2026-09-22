import { type Locator, type Page ,expect} from '@playwright/test';

import { urlConfig } from '../utils/urls';

export default class SignIn {
  readonly page: Page;
  readonly heading: Locator;
  readonly heading2: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signinButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign in or create an account' });
    this.heading2 = page.getByRole('heading', { name: 'Sign in', exact: true });
    this.email = page.getByRole('textbox', { name: 'Enter your email address',exact: true });
    this.password = page.getByRole('textbox', { name: 'Enter your password' ,exact: true});
    this.signinButton = page.getByRole('button', { name: 'Sign in' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(urlConfig.citizenFrontendBaseUrl, { waitUntil: 'load', timeout: 6000 });
  }

  async signIn(email: string, password: string): Promise<void> {
    await expect(
      this.page.getByText( 'You may already have an account if you have used an HMCTS service before.')
    ).toBeVisible();
    await this.signinButton.click();
    await this.email.fill(email);
    await this.continueButton.click();
    await this.password.fill(password);
    await this.continueButton.click();
    await expect(this.page.getByText('Sign out',{exact:true})).toBeVisible();

  }
}
