import { Locator, Page } from '@playwright/test';

import { SocialWorkerPage } from './socialWorkerPage.page';

export class CITChildSocialWorkerDetailsPage extends SocialWorkerPage {
  readonly childSocialWorkerTitle: Locator;

  readonly nameOfChildSocialWorkerText: Locator;
  readonly nameOfChildSocialWorkerLabel: Locator;

  readonly childLocalAuthorityText: Locator;

  readonly errorNameOfChildSocialWorkerSummary: Locator;
  readonly errorNoOptionalChildEmailSummary: Locator;
  readonly errorNoChildEmailSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.childSocialWorkerTitle = page.getByRole('heading', { name: "Child's social worker details" });

    this.nameOfChildSocialWorkerText = page.getByText("Name of child's social worker");
    this.nameOfChildSocialWorkerLabel = page.getByRole('textbox', { name: "Name of child's social worker" });

    this.childLocalAuthorityText = page.getByText("Child's local authority");

    this.errorNameOfChildSocialWorkerSummary = page.getByRole('link', { name: 'Enter name of child’s social worker' });
    this.errorNoOptionalChildEmailSummary = page.locator('a[href="childSocialWorkerEmail"]');
    this.errorNoChildEmailSummary = page.locator('a[href="#childLocalAuthorityEmail"]');
  }

  async fillNameOfChildSocialWorkerLabel(name: string): Promise<void> {
    await this.nameOfChildSocialWorkerLabel.fill(name);
  }
}
