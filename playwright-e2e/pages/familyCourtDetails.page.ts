import { type Locator, type Page } from '@playwright/test';

export default class FamilyCourtDetails {
  readonly whichCourt: Locator;
  readonly locationPicker: Locator;
  readonly locationPickerOption: Locator;
  readonly hearingInSameCourt: Locator;

  constructor(page: Page) {
    this.whichCourt = page.getByLabel('Which court made the placement order?');
    this.locationPicker = page.locator('#location-picker');
    this.locationPickerOption = page.getByRole('option', { name: 'Luton Justice Centre' });
    this.hearingInSameCourt = page.getByLabel('Yes');
  }

  async sameCourtYes(): Promise<void> {
    await this.hearingInSameCourt.click();
  }
}
