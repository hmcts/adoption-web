import { Locator, Page } from '@playwright/test';

export class LABirthMotherNamePage {
  readonly birthMotherFullNameHeading: Locator;

  readonly birthMotherFirstNameLabel: Locator;
  readonly birthMotherLastNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherFullNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.birthMotherFirstNameLabel = page.getByLabel('First names');
    this.birthMotherLastNameLabel = page.getByLabel('Last names');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthMotherNames(firstNames: string, lastNames: string): Promise<void> {
    await this.birthMotherFirstNameLabel.fill(firstNames);
    await this.birthMotherLastNameLabel.fill(lastNames);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthMotherAliveStatusPage {
  readonly birthMotherStillAliveHeading: Locator;

  readonly birthMotherAliveYesRadioButton: Locator;
  readonly birthMotherAliveNoRadioButton: Locator;
  readonly birthMotherAliveNotSureRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth mother" });

    this.birthMotherAliveYesRadioButton = page.getByLabel('Yes');
    this.birthMotherAliveNoRadioButton = page.getByLabel('No');
    this.birthMotherAliveNotSureRadioButton = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkBirthMotherAliveYesRadioButton(): Promise<void> {
    await this.birthMotherAliveYesRadioButton.check();
  }

  async checkBirthMotherAliveNoRadioButton(): Promise<void> {
    await this.birthMotherAliveNoRadioButton.check();
  }

  async checkBirthMotherAliveNotSureButton(): Promise<void> {
    await this.birthMotherAliveNotSureRadioButton.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthMotherNationalityPage {
  readonly birthMotherNationalityHeading: Locator;

  readonly birthMotherNationalityBritishCheckbox: Locator;
  readonly birthMotherNationalityIrishCheckbox: Locator;
  readonly birthMotheNationalityDifferentCountryCheckbox: Locator;
  readonly birthMotherNationalityNotSureCheckbox: Locator;

  readonly birthMotherNationalityCountryLabel: Locator;
  readonly birthMotherNationalityCountryAddButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherNationalityHeading = page.getByRole('heading', { name: 'What is the nationality of' });

    this.birthMotherNationalityBritishCheckbox = page.getByLabel('British');
    this.birthMotherNationalityIrishCheckbox = page.getByLabel('Irish');
    this.birthMotheNationalityDifferentCountryCheckbox = page.getByLabel('Country name');
    this.birthMotherNationalityNotSureCheckbox = page.getByLabel('Not sure');

    this.birthMotherNationalityCountryLabel = page.getByLabel('Country name');
    this.birthMotherNationalityCountryAddButton = page.getByRole('button', { name: 'Add' });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkMotherNationalityBirishCheckbox(): Promise<void> {
    await this.birthMotherNationalityBritishCheckbox.check();
  }

  async chechMotherNationalityIrishCheckbox(): Promise<void> {
    await this.birthMotherNationalityIrishCheckbox.check();
  }

  async checkMotherNationalityDifferentCountryCheckbox(): Promise<void> {
    await this.birthMotheNationalityDifferentCountryCheckbox.check();
  }

  async checkMotherNationalityNotSureCheckbox(): Promise<void> {
    await this.birthMotherNationalityNotSureCheckbox.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthMotherOccupationPage {
  readonly birthMotherOccupationHeading: Locator;

  readonly birthMotherOccupationLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherOccupationHeading = page.getByText('What is the occupation of the');

    this.birthMotherOccupationLabel = page.getByLabel('What is the occupation of the');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthMotherOccupationLabel(occupation: string): Promise<void> {
    await this.birthMotherOccupationLabel.fill(occupation);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthMotherLastKnownAddressBranchPage {
  readonly birthMotherLastKnownAddressHeader: Locator;

  readonly birthMotherLastKnownAddressYesRadioButton: Locator;
  readonly birthMotherLastKnownAddressNoRadioButton: Locator;

  readonly saveAndContinue: Locator;
  readonly saveAsDraft: Locator;

  constructor(page: Page) {
    this.birthMotherLastKnownAddressHeader = page.getByRole('heading', { name: "Do you have the birth mother'" });

    this.birthMotherLastKnownAddressYesRadioButton = page.getByLabel('Yes');
    this.birthMotherLastKnownAddressNoRadioButton = page.getByLabel('No');

    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraft = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkBirthMotherLastKnownAddressYesRadioButton(): Promise<void> {
    await this.birthMotherLastKnownAddressYesRadioButton.check();
  }

  async checkBirthMotherLastKnownAddressNoRadioButton(): Promise<void> {
    await this.birthMotherLastKnownAddressNoRadioButton.check();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinue.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraft.click();
  }
}

export class LABirthMotherLastKnownAddressPage {
  readonly birthMotherLastKnownAddressHeading: Locator;

  readonly postCodeLabel: Locator;
  readonly findAddressButton: Locator;

  readonly selectAnAddressLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherLastKnownAddressHeading = page.getByRole('heading', { name: "What is the birth mother's" });

    this.postCodeLabel = page.getByLabel('Postcode');
    this.findAddressButton = page.getByRole('button', { name: 'Find address' });

    this.selectAnAddressLabel = page.getByLabel('Select an address');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillPostCodeLabel(postcode: string): Promise<void> {
    await this.postCodeLabel.fill(postcode);
  }

  async clickFindAddressButton(): Promise<void> {
    await this.findAddressButton.click();
  }

  async selectAddressOption(option: string): Promise<void> {
    await this.selectAnAddressLabel.selectOption(option);
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthMotherLastDateConfirmedAddressPage {
  readonly birthMotherLastDatedConfirmedAddressPage: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherLastDatedConfirmedAddressPage = page.getByRole('heading', { name: 'When was the last date this' });

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

export class LABirthMotherDocumentsPage {
  readonly birthMotherDocumentHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthMotherDocumentHeading = page.getByRole('heading', { name: 'Should the birth mother be' });

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
