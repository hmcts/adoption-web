import { iClearTheForm, iClick } from './common';

const { I } = inject();

export const iWaitForPostcodeLookUpResults = async (): Promise<void> => {
  I.waitForText('Select an address');
  I.waitForElement('option[value^="{\\"fullAddress"]', 10);
};
Then('I wait for the postcode lookup to return results', iWaitForPostcodeLookUpResults);

export const iResetThePostCodeLookUpForm = (): void => {
  iClearTheForm();

  I.executeScript(() => {
    (document.querySelector('[data-link="resetPostcodeLookup"]') as HTMLAnchorElement).click();
  });
};
Given('I reset the postcode lookup form', iResetThePostCodeLookUpForm);

export const iEnterTheUkAddress = async (address: string): Promise<void> => {
  const addressParts = address.split(', ');
  const postcode = addressParts[addressParts.length - 1];

  iResetThePostCodeLookUpForm();

  try {
    iClick('Enter a UK postcode', '#postcode', 10);
    I.type(postcode);
    iClick('Find address');
    await iWaitForPostcodeLookUpResults();
    I.waitForText(postcode);
    I.selectOption('Select an address', address);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Warning: Postcode lookup service failed, entering address manually', e);
    iClick('I cannot find the address in the list');
    iClick('Building and street');
    I.type(addressParts[0]);
    iClick('Town or city');
    I.type(addressParts[1]);
    iClick('Postcode');
    I.type(postcode);
  }
};
Given('I enter the UK address {string}', iEnterTheUkAddress);
