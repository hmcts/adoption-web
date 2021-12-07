import { getById, hidden } from '../selectors';

import { hideErrors, showError } from './errors';

const selectAddressInput = getById('selectAddressInput') as HTMLInputElement | null;
if (selectAddressInput) {
  const updateAddressInputs = () => {
    const selectedValue = selectAddressInput.value;
    if (selectedValue !== '-1') {
      const selectedAddress = JSON.parse(selectedValue);
      (getById('address1') as HTMLInputElement).value = selectedAddress.street1;
      (getById('address2') as HTMLInputElement).value = selectedAddress.street2;
      (getById('addressTown') as HTMLInputElement).value = selectedAddress.town;
      (getById('addressCounty') as HTMLInputElement).value = selectedAddress.county;
      (getById('addressPostcode') as HTMLInputElement).value = selectedAddress.postcode;
    }
  };

  selectAddressInput.onchange = updateAddressInputs;
  updateAddressInputs();

  (getById('main-form') as HTMLFormElement).onsubmit = () => {
    updateAddressInputs();
    hideErrors();

    if (!getById('selectAddress')?.classList.contains(hidden) && selectAddressInput.value === '-1') {
      showError('errorAddressNotSelected');
      return false;
    }

    return true;
  };
}
