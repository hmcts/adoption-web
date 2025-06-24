import { Locator, Page } from '@playwright/test';

import { NationalityPage } from '../../../pages/nationality.page';

export class LABirthMotherNationalityPage extends NationalityPage {
  readonly birthMotherNationalityHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherNationalityHeading = page.getByRole('heading', { name: 'What is the nationality of' });
  }
}
