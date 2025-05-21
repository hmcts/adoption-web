import { Locator, Page } from "@playwright/test";

export class multipleChildrenPage extends BasePage {
  readonly multipleChildrenTitle: Locator;

  readonly adoptMoreThanOneChildGroup: Locator;
  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  constructor(page: Page) {
    super(page);

    this.multipleChildrenTitle = page.getByText('Application details');
    this.adoptMoreThanOneChildGroup = page.getByRole('group', {
      name: 'Are you applying to adopt more than one child?',
    });

    this.yesRadioButton = this.adoptMoreThanOneChildGroup.getByRole('radio', { name: 'Yes' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }
}
