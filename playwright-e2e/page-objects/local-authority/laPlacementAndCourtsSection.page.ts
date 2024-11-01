import { Locator, Page } from '@playwright/test';

export class LAPlacementOrderNumberPage {
  readonly placementOrderNumberPage: Locator;

  readonly orderNumberLabel: Locator;

  readonly saveAndConintueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.placementOrderNumberPage = page.getByText('What is the serial or case');

    this.orderNumberLabel = page.getByLabel('What is the serial or case');

    this.saveAndConintueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillOrderNumberLabel(order: string): Promise<void> {
    await this.orderNumberLabel.fill(order);
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndConintueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LAPlacementDateOfOrderPage {
  readonly placementDateOfOrderPage: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.placementDateOfOrderPage = page.getByRole('heading', { name: 'What date is on the placement' });

    this.dayLabel = page.getByLabel('Day');
    this.monthLabel = page.getByLabel('Month');
    this.yearLabel = page.getByLabel('Year');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillDayLabel(day: string): Promise<void> {
    await this.dayLabel.fill(day);
  }

  async fillMonthLabel(month: string): Promise<void> {
    await this.monthLabel.fill(month);
  }

  async fillYearLabel(year: string): Promise<void> {
    await this.yearLabel.fill(year);
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LAPlacementOrdersInPlacePage {
  readonly placementOrdersInPlaceHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.placementOrdersInPlaceHeading = page.getByRole('heading', { name: 'Orders already in place' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
