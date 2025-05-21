import { Locator, Page } from "@playwright/test";

export class under18Page extends BasePage {
  readonly under21Title: Locator;

  readonly applicantOver21Group: Locator;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  constructor(page: Page) {
    super(page);

    this.under21Title = page.getByText('Eligibility to apply to adopt');
    this.applicantOver21Group = page.getByRole('group', {
      name: 'Are you, and the other applicant if relevant, both aged 21 or over?',
    });

    this.yesRadioButton = this.applicantOver21Group.getByRole('radio', { name: 'Yes' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }
}