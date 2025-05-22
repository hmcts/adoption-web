import { Locator, Page } from '@playwright/test';

import { SocialWorkerPage } from './socialWorkerPage.page';

export class CITAdultSocialWorkerDetailsPage extends SocialWorkerPage {
  readonly adultSocialWorkerTitle: Locator;

  readonly nameOfAdultSocialWorkerText: Locator;
  readonly nameOfAdultSocialWorkerLabel: Locator;

  readonly adultLocalAuthorityText: Locator;

  readonly errorNameOfAdultSocialWorkerSummary: Locator;
  readonly errorNoOptionalAdultEmailSummary: Locator;
  readonly errorNoAdultEmailSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.adultSocialWorkerTitle = page.getByRole('heading', { name: 'Your social worker details' });

    this.nameOfAdultSocialWorkerText = page.getByText('Name of your social worker');
    this.nameOfAdultSocialWorkerLabel = page.getByRole('textbox', { name: 'Name of your social worker' });

    this.adultLocalAuthorityText = page.getByText('Name of local authority');

    this.errorNameOfAdultSocialWorkerSummary = page.getByRole('link', { name: 'Enter a name' }).first();
    this.errorNoOptionalAdultEmailSummary = page.locator('a[href="#applicantSocialWorkerEmail"]');
    this.errorNoAdultEmailSummary = page.locator('a[href="#applicantLocalAuthorityEmail"]');
  }

  async fillNameOfAdultSocialWorkerLabel(name: string): Promise<void> {
    await this.nameOfAdultSocialWorkerLabel.fill(name);
  }
}
