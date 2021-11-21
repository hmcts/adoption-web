import { getById, hidden, qs, qsa } from '../selectors';

import { hideErrors } from './errors';

const toggleLookupPostcode = (toggle: string) => (getById('enterPostcode') as HTMLElement).classList[toggle](hidden);
export const hideEnterPostcode = (): void => toggleLookupPostcode('add');
export const showEnterPostcode = (): void => toggleLookupPostcode('remove');

const hideSelectAddress = () => (getById('selectAddress') as HTMLElement).classList.add(hidden);

const updateLabels = (type: 'uk' | 'international') => {
  const labels = JSON.parse(getById('addressFieldLabels')?.textContent || '{}');
  (qs('.govuk-form-group.address1 label') as HTMLLabelElement).textContent = labels[type].line1;
  (qs('.govuk-form-group.address2 label') as HTMLLabelElement).textContent = labels[type].line2;
  (qs('.govuk-form-group.addressTown label') as HTMLLabelElement).textContent = labels[type].town;
  (qs('.govuk-form-group.addressCounty label') as HTMLLabelElement).textContent = labels[type].county;
  (qs('.govuk-form-group.addressPostcode label') as HTMLLabelElement).textContent = labels[type].postcode;
};

const toggleInternationalAddressFields = (toggle: string) => {
  if (toggle === 'remove') {
    updateLabels('international');
  }

  (qs('.govuk-form-group.address3') as HTMLElement).classList[toggle](hidden);
  (qs('.govuk-form-group.addressCountry') as HTMLElement).classList[toggle](hidden);
  (getById('enterUkPostcode') as HTMLElement).classList[toggle](hidden);
  (getById('main-form-submit') as HTMLElement).classList[toggle](hidden);
};
export const showInternationalAddressFields = (): void => toggleInternationalAddressFields('remove');
export const hideInternationalAddressFields = (): void => toggleInternationalAddressFields('add');

const toggleUkAddressFields = (toggle: string): void => {
  if (toggle === 'remove') {
    updateLabels('uk');
  }

  (getById('selectAddress') as HTMLElement).classList.add(hidden);
  (qs('.govuk-form-group.address1') as HTMLElement).classList[toggle](hidden);
  (qs('.govuk-form-group.address2') as HTMLElement).classList[toggle](hidden);
  (qs('.govuk-form-group.addressTown') as HTMLElement).classList[toggle](hidden);
  (qs('.govuk-form-group.addressCounty') as HTMLElement).classList[toggle](hidden);
  (qs('.govuk-form-group.addressPostcode') as HTMLElement).classList[toggle](hidden);
  (getById('main-form-submit') as HTMLElement).classList[toggle](hidden);
};
export const showUkAddressFields = (): void => toggleUkAddressFields('remove');
export const hideUkAddressFields = (): void => toggleUkAddressFields('add');

const cannotEnterUkPostcode = getById('cannot-enter-uk-postcode') as HTMLAnchorElement;
if (cannotEnterUkPostcode) {
  cannotEnterUkPostcode.onclick = e => {
    e.preventDefault();
    hideErrors();
    hideEnterPostcode();
    showUkAddressFields();
    showInternationalAddressFields();
  };
}

const cannotFindAddress = getById('cannotFindAddress') as HTMLAnchorElement;
if (cannotFindAddress) {
  cannotFindAddress.onclick = e => {
    e.preventDefault();
    hideErrors();
    showUkAddressFields();
  };
}

const onResetPostcodeLookup = e => {
  e.preventDefault();
  hideErrors();
  hideSelectAddress();
  hideInternationalAddressFields();
  hideUkAddressFields();

  for (const el of qsa('.govuk-error-summary:not([id="addressErrorSummary"])')) {
    el.remove();
  }

  showEnterPostcode();
};

const resetPostcodeLookupLinks = qsa('[data-link="resetPostcodeLookup"]') as NodeListOf<HTMLElement>;
if (resetPostcodeLookupLinks) {
  for (const el of resetPostcodeLookupLinks) {
    el.onclick = onResetPostcodeLookup;
  }
}

const postcodeEntry = getById('enterPostcode') as HTMLElement | null;
const backLink = qs('.govuk-back-link');
if (postcodeEntry && backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    const notOnPostcodeEntry = postcodeEntry.classList.contains(hidden);
    if (notOnPostcodeEntry) {
      (e.target as HTMLAnchorElement).blur();
      onResetPostcodeLookup(e);
    } else {
      history.go(-1);
    }
  };
}
