import { Locator, Page } from '@playwright/test';

import { NationalityPage } from '../../../pages/nationality.page';

export class LABirthFatherNationalityPage extends NationalityPage {
  readonly laBirthFatherNationalityHeader: Locator;
  constructor(page: Page) {
    super(page);
    this.laBirthFatherNationalityHeader = page.getByRole('heading', { name: 'What is the nationality of' });
  }
}
