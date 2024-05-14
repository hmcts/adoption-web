import { type Page, type Locator, expect } from "@playwright/test";

export class BasePage {
  readonly nextStep: Locator;
  readonly goButton: Locator;
  readonly page: Page;
  readonly continueButton: Locator;
  readonly signOut: Locator;
  readonly checkYourAnswersHeader: Locator;
  readonly saveAndContinue: Locator;
  readonly submit: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.nextStep = page.getByLabel("Next step");
    this.goButton = page.getByRole('button', { name: 'Go', exact: true });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.signOut = page.getByText('Sign out');
    this.checkYourAnswersHeader = page.getByRole('heading', { name: 'Check your answers' });
    this.saveAndContinue = page.getByRole("button", { name: "Save and Continue"});
    this.submit = page.getByRole('button', { name: 'Submit' });
  }

  async gotoNextStep(eventName: string) {
    await this.nextStep.selectOption(eventName);
    await this.goButton.dblclick();
    await this.page.waitForTimeout(20000);
    if (await  this.goButton.isVisible()) {
       await this.goButton.click();
    }
  }

  async checkYourAnsAndSubmit(){
    await this.checkYourAnswersHeader.isVisible();
    await this.saveAndContinue.click();
  }

  async tabNavigation(tabName: string) {
    await this.page.getByRole('tab', { name: tabName }).click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickSignOut() {
    await this.signOut.click();
  }

  async clickSubmit() {
    await this.submit.click();
  }
}

