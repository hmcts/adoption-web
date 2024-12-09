import { Locator, Page } from '@playwright/test';

import BasePage from '../../pages/basePage.page';

export class LAStatementOfTruthPage extends BasePage {
  readonly statementOfTruthHeading: Locator;

  readonly fullNameLabel: Locator;
  readonly jobTitleLabel: Locator;
  readonly localAuthortityRepresentationLabel: Locator;

  readonly truthStatementCheckbox: Locator;

  readonly confirmButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.statementOfTruthHeading = page.getByRole('heading', { name: 'Statement of truth' });

    this.fullNameLabel = page.getByLabel('Your full name');
    this.jobTitleLabel = page.getByLabel('Your job title');
    this.localAuthortityRepresentationLabel = page.getByLabel('Name of the local authority');

    this.truthStatementCheckbox = page.getByLabel('I confirm that this statement');

    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillFullNameLabel(name: string): Promise<void> {
    await this.fullNameLabel.fill(name);
  }

  async fillJobTItleLabel(title: string): Promise<void> {
    await this.jobTitleLabel.fill(title);
  }

  async fillLocalAuthorityRepresentationLabel(authority: string): Promise<void> {
    await this.localAuthortityRepresentationLabel.fill(authority);
  }

  async checkTruthStatementCheckbox(): Promise<void> {
    await this.truthStatementCheckbox.check();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }
}
