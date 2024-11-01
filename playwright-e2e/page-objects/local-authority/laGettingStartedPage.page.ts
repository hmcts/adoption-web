import { Locator, Page } from "@playwright/test";

export default class LAGettingStartedPage {
  readonly gettingStartedHeading: Locator;
  readonly submittingResponseHeading: Locator;
  readonly whatYouWillNeedHeading: Locator;
  readonly completingYourResponseHeading: Locator;

  readonly startNowButton: Locator;

  constructor(page: Page) {
    this.gettingStartedHeading = page.getByRole('heading', { name: 'Getting started' });
    this.submittingResponseHeading = page.getByRole('heading', { name: 'Submitting a response to an' });
    this.whatYouWillNeedHeading = page.getByRole('heading', { name: 'What you will need' });
    this.completingYourResponseHeading = page.getByRole('heading', {
      name: 'Completing your response to the application',
    });

    this.startNowButton = page.getByRole('button', { name: 'Start now' });
  }

  async laGettingStarted(): Promise<void> {
    await this.startNowButton.click();
  }
}
