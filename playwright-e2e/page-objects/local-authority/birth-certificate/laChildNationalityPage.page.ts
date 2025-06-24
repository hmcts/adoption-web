import { Locator, Page } from '@playwright/test';

import { NationalityPage } from '../../../pages/nationality.page.ts';

export class LAChildNationalityPage extends NationalityPage {
  readonly childNationalityHeading: Locator;
  constructor(page: Page) {
    super(page);
    this.childNationalityHeading = page.getByRole('heading', { name: 'What is their nationality?' });
  }
}
