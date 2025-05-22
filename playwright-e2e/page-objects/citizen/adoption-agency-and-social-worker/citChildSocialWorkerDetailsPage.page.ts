import { Locator, Page } from '@playwright/test';

import { SocialWorkerPage } from './socialWorkerPage.page';

export class CITChildSocialWorkerDetailsPage extends SocialWorkerPage {
  readonly childSocialWorkerTitle: Locator;
  readonly childSocialWorkerSubtitle: Locator;

  readonly nameOfChildSocialWorkerText: Locator;
  readonly nameOfChildSocialWorkerLabel: Locator;

  readonly childLocalAuthorityText: Locator;
  readonly childLocalAuthorityInputLabel: Locator;
  readonly childLocalAuthorityDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.childSocialWorkerTitle = page.getByRole('heading', { name: "Child's social worker details" });
    this.childSocialWorkerSubtitle = page.getByText(
      'You can get these details from your local authority or adoption agency.'
    );

    this.nameOfChildSocialWorkerText = page.getByText("Name of child's social worker");
    this.nameOfChildSocialWorkerLabel = page.getByRole('textbox', { name: "Name of child's social worker" });

    this.childLocalAuthorityText = page.getByText("Child's local authority");
    this.childLocalAuthorityInputLabel = page.locator('#location-picker');
    this.childLocalAuthorityDropdown = page.locator('.autocomplete__menu');
  }

  async fillNameOfChildSocialWorkerLabel(name: string): Promise<void> {
    await this.nameOfChildSocialWorkerLabel.fill(name);
  }
}
