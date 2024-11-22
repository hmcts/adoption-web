import { Locator, Page } from '@playwright/test';

export class CTZSubmittedPage {
  referenceNumber!: string;

  readonly signOutLink: Locator;

  constructor(page: Page) {
    this.signOutLink = page.getByRole('link', { name: 'Sign out' });
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
}
