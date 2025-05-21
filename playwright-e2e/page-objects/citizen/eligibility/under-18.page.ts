import { Locator, Page } from "@playwright/test";

export class under18Page extends BasePage {
  readonly under18Title: Locator;

  readonly childUnder18GroupGroup: Locator;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  constructor(page: Page) {
    super(page);

    this.under18Title = page.getByText('Eligibility to apply to adopt');
    this.childUnder18GroupGroup = page.getByRole('group', {
      name: 'Will the child be under 18 years old on the date you submit your application?',
    });

    this.yesRadioButton = this.childUnder18GroupGroup.getByRole('radio', { name: 'Yes' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }
}
