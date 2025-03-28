import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

import BasePage from './basePage.page';

export default class ReviewSubmit extends BasePage {
  readonly h1: Locator;
  readonly applyWithSpouseText: Locator;
  readonly firstApplicantTruthStatement: Locator;
  readonly secondApplicantTruthStatment: Locator;
  readonly appOneName: Locator;
  readonly appTwoName: Locator;
  readonly confirmPay: Locator;
  readonly paySubmit: Locator;
  readonly cost: Locator;
  readonly cardDetailsH1: Locator;
  readonly cardNumber: Locator;
  readonly expMonth: Locator;
  readonly expYear: Locator;
  readonly cardName: Locator;
  readonly securityCode: Locator;
  readonly addressLineOne: Locator;
  readonly town: Locator;
  readonly country: Locator;
  readonly postcode: Locator;
  readonly appEmail: Locator;
  readonly confirmPaymentButton: Locator;
  readonly applyOnOwn: Locator;

  constructor(page: Page) {
    super(page);
    this.h1 = page.getByRole('heading', { name: 'Review your answers' });
    this.applyWithSpouseText = page.getByText("I'm applying with my spouse");
    this.applyOnOwn = page.getByText("I'm applying on my own");
    this.firstApplicantTruthStatement = page.getByLabel('I, the first applicant,');
    this.secondApplicantTruthStatment = page.getByLabel('I am authorised by the second');
    this.appOneName = page.getByLabel('Enter your full name');
    this.appTwoName = page.getByLabel("Enter the second applicant's");
    this.confirmPay = page.getByRole('button', { name: 'Confirm and pay' });
    this.paySubmit = page.getByRole('button', { name: 'Pay and submit application' });
    this.cost = page.locator('#card-details-wrap').getByText('£');
    this.cardDetailsH1 = page.getByRole('heading', { name: 'Enter card details' });
    this.cardNumber = page.getByLabel('Card number');
    this.expMonth = page.getByLabel('Month');
    this.expYear = page.getByLabel('Year');
    this.cardName = page.getByLabel('Name on card');
    this.securityCode = page.getByLabel('Card security code');
    this.addressLineOne = page.getByLabel('Address line 1');
    this.town = page.getByLabel('Town or city');
    this.country = page.getByLabel('Country or territory');
    this.postcode = page.getByLabel('Postcode');
    this.appEmail = page.getByLabel('Email');
    this.confirmPaymentButton = page.getByRole('button', { name: 'Confirm payment' });
  }

  async reviewAnswers(applicantNumber: string): Promise<void> {
    await expect(this.h1).toBeVisible();
    if (applicantNumber === 'alone') {
      await expect(this.applyOnOwn).toBeVisible();
    } else if (applicantNumber === 'spouseOrCivilPartner') {
      await expect(this.applyWithSpouseText).toBeVisible();
    }
  }
  async statementOfTruthOne(applicantOne: string): Promise<void> {
    await this.firstApplicantTruthStatement.check();
    await this.appOneName.fill(applicantOne);
    await this.confirmPay.click();
    await this.paySubmit.click();
    await expect(this.cardDetailsH1).toBeVisible();
    await expect(this.cost).toBeVisible();
  }

  async statementOfTruthTwo(applicantOne: string, applicantTwo: string): Promise<void> {
    await this.firstApplicantTruthStatement.check();
    await this.secondApplicantTruthStatment.check();
    await this.appOneName.fill(applicantOne);
    await this.appTwoName.fill(applicantTwo);
    await this.confirmPay.click();
    await this.paySubmit.click();
    await expect(this.cardDetailsH1).toBeVisible();
    await expect(this.cost).toBeVisible();
  }

  async fillCardDetails(name: string, email: string, postcode: string): Promise<void> {
    const today = new Date();
    await expect(this.cardDetailsH1).toBeVisible();
    await expect(this.cost).toBeVisible();
    await this.cardNumber.fill('4444333322221111');
    await this.expMonth.fill(`${today.getMonth() + 1}`);
    await this.expYear.fill(`${today.getFullYear() + 2}`);
    await this.cardName.fill(name);
    await this.securityCode.fill('123');
    await this.addressLineOne.fill('55 HART READE');
    await this.town.fill('POLEGATE');
    await this.postcode.fill(postcode);
    await this.appEmail.fill(email);
    await this.continueButton.click();
    await this.confirmPaymentButton.click();
  }
}
