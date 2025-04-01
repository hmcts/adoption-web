import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITChildFullNameAfterAdoptionPage extends BasePage {
  readonly childDetailsTitle: Locator;
  readonly childFullNameAfterAdoptionHeading: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;

  readonly childFullNameAfterAdoptionTooltip: Locator;

  readonly firstName: Locator;
  readonly firstNameTooltip: Locator;

  readonly lastName: Locator;
  readonly lastNameTooltip: Locator;

  readonly contactUsForHelpDropdownLink: Locator;
  readonly contactACourtHeading: Locator;
  readonly findACourtLink: Locator;

  readonly errorFirstNameSummary: Locator;
  readonly errorLastNameSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.childDetailsTitle = page.getByText("The child's details");
    this.childFullNameAfterAdoptionHeading = page.getByRole('heading', { name: 'After adoption, what will be' });

    this.childFullNameAfterAdoptionTooltip = page.getByText('If you are changing the child');

    this.firstName = page.getByLabel('First names');
    this.firstNameTooltip = page.getByText('(Include any given or middle');

    this.lastName = page.getByLabel('Last names');
    this.lastNameTooltip = page.getByText('(Include surname or family');

    this.contactUsForHelpDropdownLink = page.getByText('Contact us for help');
    this.contactACourtHeading = page.getByRole('heading', { name: 'Contact a court that deals' });
    this.findACourtLink = page.getByRole('link', { name: 'Find a Court or Tribunal' });

    this.errorFirstNameSummary = page.getByRole('link', { name: 'Enter their first names' });
    this.errorLastNameSummary = page.getByRole('link', { name: 'Enter their last names' });
  }

  async fillFirstNameLabel(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastNameLabel(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }
}
