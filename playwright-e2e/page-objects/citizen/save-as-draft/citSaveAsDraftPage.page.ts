import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class CITSaveAsDraftPage extends BasePage {
  readonly applicationSavedTitle: Locator;

  readonly continueWithApplicationButton: Locator;
  readonly signOutButton: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;
  readonly findACourtLink: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationSavedTitle = page.getByRole('heading', { name: 'Your application has been saved' });

    this.continueWithApplicationButton = page.getByRole('button', { name: 'Continue with your application' });
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });

    this.contactUsForHelpDropdownLink = page.getByText('Contact us for help');
    this.contactACourtHeading = page.getByRole('heading', { name: 'Contact a court that deals' });
    this.findACourtLink = page.getByRole('link', { name: 'Find a Court or Tribunal' });
  }

  async clickContinueWithYourApplicationButton(): Promise<void> {
    await this.continueWithApplicationButton.click();
  }

  async clickSignOutButton(): Promise<void> {
    await this.signOutButton.click();
  }
}
