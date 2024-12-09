import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAChildSexAtBirthPage extends BasePage {
  readonly childSexAtBirthHeading: Locator;

  readonly maleRadioButton: Locator;
  readonly femaleRadioButton: Locator;
  readonly otherRadioButton: Locator;

  readonly otherSexLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.childSexAtBirthHeading = page.getByRole('heading', { name: "What was the child's sex at" });

    this.maleRadioButton = page.getByLabel('Male', { exact: true });
    this.femaleRadioButton = page.getByLabel('Female', { exact: true });
    this.otherRadioButton = page.getByLabel('Other', { exact: true });

    this.otherSexLabel = page.getByLabel("For example, if the child's");
  }

  async checkMaleRadioButton(): Promise<void> {
    await this.maleRadioButton.check();
  }

  async checkFemaleRadioButton(): Promise<void> {
    await this.femaleRadioButton.check();
  }

  async checkOtherRadioButton(): Promise<void> {
    await this.otherRadioButton.check();
  }

  async fillOtherSexLabel(): Promise<void> {
    await this.otherSexLabel.fill('intersex');
  }
}
