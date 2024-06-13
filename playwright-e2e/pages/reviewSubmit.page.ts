import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class ReviewSubmit {
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
  
    constructor(page: Page) {
        this.h1 = page.getByRole('heading', { name: 'Review your answers' });
        this.applyWithSpouseText = page.getByText('I\'m applying with my spouse');
        this.firstApplicantTruthStatement = page.getByLabel('I, the first applicant,');
        this.secondApplicantTruthStatment = page.getByLabel('I am authorised by the second');
        this.appOneName = page.getByLabel('Enter your full name');
        this.appTwoName = page.getByLabel('Enter the second applicant\'s');
        this.confirmPay = page.getByRole('button', { name: 'Confirm and pay' });
        this.paySubmit = page.getByRole('button', { name: 'Pay and submit application' })
        this.cost = page.locator('#card-details-wrap').getByText('£201.00');
        this.cardDetailsH1 = page.getByRole('heading', { name: 'Enter card details' });
    }

    async reviewAnswers(){
        await expect(this.h1).toBeVisible();
        // await expect(this.applyWithSpouseText).toBeVisible();
    }

    async statementOfTruth(applicantOne, applicantTwo){
        await this.firstApplicantTruthStatement.check();
        await this.secondApplicantTruthStatment.check();
        await this.appOneName.fill(applicantOne);
        await this.appTwoName.fill(applicantTwo);
        await this.confirmPay.click();
        await this.paySubmit.click();
        await expect(this.cardDetailsH1).toBeVisible();
        await expect(this.cost).toBeVisible();
    }
}