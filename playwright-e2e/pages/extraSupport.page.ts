import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class ExtraSupport {
  readonly h1: Locator;
  readonly extraSupportNo: Locator;
  
    constructor(page: Page) {
        this.h1 = page.getByRole('heading', { name: 'Extra support during your case' });
        this.extraSupportNo = page.getByLabel('No - I do not need any extra');
    }

    async noSupportNeeded(){
        await this.extraSupportNo.check();
    }

}