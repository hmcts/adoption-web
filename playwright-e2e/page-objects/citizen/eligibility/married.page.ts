import { Locator, Page } from "@playwright/test";

export class MarriedPage extends BasePage {
  readonly childMarriedTitle: Locator;

  readonly childMarriedGroup: Locator;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly childMarriedDescription: Locator;

  constructor(page: Page) {
    super(page);

    this.childMarriedTitle = page.getByText('Eligibility to apply to adopt');
    this.childMarriedGroup = page.getByRole('group', {
      name: 'Is the child married or in a civil partnership?',
    });

    this.yesRadioButton = this.childMarriedGroup.getByRole('radio', { name: 'Yes' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }
}