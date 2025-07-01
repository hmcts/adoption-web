import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class CITAnotherAdoptionAgencyPage extends BasePage {
  readonly applicationDetailsTitle: Locator;

  readonly anotherAdoptionAgencyHeading: Locator;

  readonly nameOfAdoptionAgencyHeading: Locator;
  readonly nameOfAdoptionAgencyLabel: Locator;

  readonly nameOfYourContactHeading: Locator;
  readonly nameOfYourContactLabel: Locator;

  readonly phoneNumberHeading: Locator;
  readonly phoneNumberLabel: Locator;

  readonly addressLineOneHeading: Locator;
  readonly addressLineOneLabel: Locator;

  readonly townOrCityHeading: Locator;
  readonly townOrCityLabel: Locator;

  readonly postcodeHeading: Locator;
  readonly postcodeLabel: Locator;

  readonly emailAddressHeading: Locator;
  readonly emailAddressLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationDetailsTitle = page.getByText('Application details');

    this.anotherAdoptionAgencyHeading = page.getByRole('heading', {
      name: 'Adoption agency or local authority details',
    });

    this.nameOfAdoptionAgencyHeading = page.getByText('Name of adoption agency or local authority');
    this.nameOfAdoptionAgencyLabel = page.getByRole('textbox', { name: 'Name of adoption agency or local authority' });

    this.nameOfYourContactHeading = page.getByText('Name of your contact');
    this.nameOfYourContactLabel = page.getByRole('textbox', { name: 'Name of your contact' });

    this.phoneNumberHeading = page.getByText('Phone number');
    this.phoneNumberLabel = page.getByRole('textbox', { name: 'Phone number' });

    this.addressLineOneHeading = page.getByText('Address line');
    this.addressLineOneLabel = page.getByRole('textbox', { name: 'Address line' });

    this.townOrCityHeading = page.getByText('Town or city');
    this.townOrCityLabel = page.getByRole('textbox', { name: 'Town or city' });

    this.postcodeHeading = page.getByText('Postcode');
    this.postcodeLabel = page.getByRole('textbox', { name: 'Postcode' });

    this.emailAddressHeading = page.getByText('Email address of your contact');
    this.emailAddressLabel = page.getByRole('textbox', { name: 'Email address of your contact' });
  }
}
