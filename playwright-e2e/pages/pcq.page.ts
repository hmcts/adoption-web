import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class Pcq {
  readonly h1: Locator;
  readonly noContinueQuestionsButton: Locator;

  constructor(page: Page) {
    this.h1 = page.getByRole('heading', { name: 'Equality and diversity questions' });
    this.noContinueQuestionsButton = page.getByRole('button', { name: "I don't want to answer these questions" });
  }

  async noPcqAnswers() {
    await expect(this.h1).toBeVisible();
    await this.noContinueQuestionsButton.click();
  }
  //this commented out code can be used to fill out the pcq questions
  // await app.basePage.dob(-22);
  // await app.basePage.continueButton.click();
  // await app.contactDetails.englishLang.check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('Female').check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('Yes').check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('Prefer not to say').check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('Yes').check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('Mixed or multiple ethnic groups').check();
  // await app.basePage.continueButton.click();
  // await app.page.getByLabel('White and Black African').check();
  // await app.basePage.continueButton.click();
}
