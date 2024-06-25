import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';
export default class FamilyCourtDetails {
  readonly whichCourt: Locator;
  readonly hearingInSameCourt: Locator;
  readonly locationPickerCourt: Locator;

  constructor(page: Page) {
    this.whichCourt = page.getByLabel('Which court made the placement order?');
    this.hearingInSameCourt = page.getByLabel('Yes');
    this.locationPickerCourt = page.getByLabel('Which court made the');
  }

  async sameCourtYes(): Promise<void> {
    await this.hearingInSameCourt.click();
  }

  async courtLocation(location, locationPickerCourt){
    await expect(this.locationPickerCourt).toBeEditable();
    await this.locationPickerCourt.fill(location);
    await this.locationPickerCourt.press('Enter');
  }
}
