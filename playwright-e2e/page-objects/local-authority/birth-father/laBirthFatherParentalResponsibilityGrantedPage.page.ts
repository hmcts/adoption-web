import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherParentalResponsibilityGrantedPage extends BasePage {
  readonly birthFatherParentalResponsibilityHeader: Locator;

  readonly birthCertificateCheckbox: Locator;
  readonly courtOrderCheckbox: Locator;
  readonly parentalResponsibilityOrderCheckbox: Locator;
  readonly parentalResponsibilityAgreementCheckbox: Locator;
  readonly otherCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherParentalResponsibilityHeader = page.getByRole('heading', { name: 'How was parental' });

    this.birthCertificateCheckbox = page.getByLabel('Birth certificate');
    this.courtOrderCheckbox = page.getByLabel('Court order');
    this.parentalResponsibilityOrderCheckbox = page.getByLabel('Parental responsibility order');
    this.parentalResponsibilityAgreementCheckbox = page.getByLabel('Parental responsibility agreement');
    this.otherCheckbox = page.getByLabel('Other');
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
}
