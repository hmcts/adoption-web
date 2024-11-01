import { Locator, Page } from '@playwright/test';

export class LABirthFatherOnCertficatePage {
  readonly birthFatherBirthCertificateHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherBirthCertificateHeading = page.getByRole('heading', { name: "Is the birth father's name on" });

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

export class LABirthFatherNamePage {
  readonly birthFatherNameHeading: Locator;

  readonly firstNameLabel: Locator;
  readonly lastNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.firstNameLabel = page.getByLabel('First names');
    this.lastNameLabel = page.getByLabel('Last names');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillFirstNameLabel(firstName: string): Promise<void> {
    await this.firstNameLabel.fill(firstName);
  }

  async fillLastNameLabel(lastName: string): Promise<void> {
    await this.lastNameLabel.fill(lastName);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherStillAliveStatusPage {
  readonly birthFatherStillAliveHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;
  readonly notSureRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth father" });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });
    this.notSureRadioButton = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async checkNotSureRadioButton(): Promise<void> {
    await this.notSureRadioButton.check();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherParentalResponsibilityPage {
  readonly birthFatherParentalResponsibilityHeader: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndConinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherParentalResponsibilityHeader = page.getByRole('heading', { name: 'Does the birth father have' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No');

    this.saveAndConinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndConinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherParentalResponsibilityGrantedPage {
  readonly birthFatherParentalResponsibilityHeader: Locator;

  readonly birthCertificateCheckbox: Locator;
  readonly courtOrderCheckbox: Locator;
  readonly parentalResponsibilityOrderCheckbox: Locator;
  readonly parentalResponsibilityAgreementCheckbox: Locator;
  readonly otherCheckbox: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherParentalResponsibilityHeader = page.getByRole('heading', { name: 'How was parental' });

    this.birthCertificateCheckbox = page.getByLabel('Birth certificate');
    this.courtOrderCheckbox = page.getByLabel('Court order');
    this.parentalResponsibilityOrderCheckbox = page.getByLabel('Parental responsibility order');
    this.parentalResponsibilityAgreementCheckbox = page.getByLabel('Parental responsibility agreement');
    this.otherCheckbox = page.getByLabel('Other');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkBirthCertificateCheckbox(): Promise<void> {
    await this.birthCertificateCheckbox.check();
  }

  async checkCourtOrderCheckbox(): Promise<void> {
    await this.courtOrderCheckbox.check();
  }

  async checkParentalResponsibilityOrderCheckbox(): Promise<void> {
    await this.parentalResponsibilityOrderCheckbox.check();
  }

  async checkParentalResponsibilityAgreementCheckbox(): Promise<void> {
    await this.parentalResponsibilityAgreementCheckbox.check();
  }

  async checkOtherCheckbox(): Promise<void> {
    await this.otherCheckbox.check();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherNationalityPage {
  readonly laBirthFatherNationalityHeader: Locator;

  readonly britishCheckbox: Locator;
  readonly irishCheckbox: Locator;
  readonly differentCountryCheckbox: Locator;
  readonly notSureCheckbox: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.laBirthFatherNationalityHeader = page.getByRole('heading', { name: 'What is the nationality of' });

    this.britishCheckbox = page.getByLabel('British');
    this.irishCheckbox = page.getByLabel('Irish');
    this.differentCountryCheckbox = page.getByLabel('Citizen of a different country');
    this.notSureCheckbox = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkBritishCheckbox(): Promise<void> {
    await this.britishCheckbox.check();
  }

  async checkIrishCheckbox(): Promise<void> {
    await this.irishCheckbox.check();
  }

  async checkDifferentCountryCheckbox(): Promise<void> {
    await this.differentCountryCheckbox.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherOccupationPage {
  readonly laBirthFatherOccupationHeader: Locator;

  readonly laBirthFatherOccuptationLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.laBirthFatherOccupationHeader = page.getByRole('heading', { name: 'What is the occupation of the' });

    this.laBirthFatherOccuptationLabel = page.locator('#birthFatherOccupation');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthFatherOccupationLabel(occuptation: string): Promise<void> {
    await this.laBirthFatherOccuptationLabel.fill(occuptation);
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }
}

export class LABirthFatherLastKnownAddressBranchPage {
  readonly birthFatherLastKnownAddressHeader: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherLastKnownAddressHeader = page.getByRole('heading', { name: 'Do you have the birth father’' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}

export class LABirthFatherLastKnownAddressPage {
  readonly birthFatherLastKnownAddressHeading: Locator;

  readonly postCodeLabel: Locator;
  readonly findAddressButton: Locator;

  readonly selectAnAddressLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherLastKnownAddressHeading = page.getByRole('heading', { name: "What is the birth father's" });

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

export class LABirthFatherLastDateConfirmedAddressPage {
  readonly birthFatherLastDateConfirmedAddressHeading: Locator;

  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherLastDateConfirmedAddressHeading = page.getByRole('heading', {
      name: 'When was the last date this',
    });

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

export class LABirthFatherDocumentsPage {
  readonly birthFatherDocumentHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.birthFatherDocumentHeading = page.getByRole('heading', { name: 'Should the birth father be' });

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
