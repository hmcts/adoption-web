import { Locator, Page } from '@playwright/test';

export class CITSubmittedPage {
  referenceNumber!: string;

  readonly signOutLink: Locator;

  readonly menuDropdownLink: Locator;

  constructor(page: Page) {
    this.signOutLink = page.getByRole('link', { name: 'Sign out' });
    this.menuDropdownLink = page.getByText('Menu');
  }

  async initialiseReferenceNumber(page: Page): Promise<void> {
    this.referenceNumber = await this.getReferenceNumber(page);
  }

  async getReferenceNumber(page: Page): Promise<string> {
    const element = await page.locator('.govuk-panel.govuk-panel--confirmation .govuk-panel__body strong').first();
    const referenceNum: string | null = await element.textContent();
    return referenceNum ? referenceNum.replace(/-/g, '') : '';
  }

  async clickSignOutLink(): Promise<void> {
    await this.signOutLink.click();
  }

  async clickMenuDropdownLink(): Promise<void> {
    await this.menuDropdownLink.click();
  }
}
