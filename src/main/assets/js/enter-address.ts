import {
  hideEnterPostcode,
  hideInternationalAddressFields,
  hideUkAddressFields,
  showEnterPostcode,
  // showInternationalAddressFields,
  showUkAddressFields,
} from './address/links';
import { getById, qsa } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form && getById('enterPostcode')) {
  const formData = new FormData(form);
  // const uk = 'UK';
  const applicant1AddressCountry = formData.get('applicant1AddressCountry');
  const applicant2AddressCountry = formData.get('applicant2AddressCountry');
  const addressCountry = applicant1AddressCountry || applicant2AddressCountry;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  if (addressCountry || hasBackendError) {
    hideEnterPostcode();
    showUkAddressFields();

    //TODO Uncomment this if we need international address fields in future
    // if ((addressCountry && addressCountry !== uk) || (!addressCountry && hasBackendError)) {
    //   showInternationalAddressFields();
    // }
  } else {
    hideUkAddressFields();
    //TODO Uncomment this if we need international address fields in future
    hideInternationalAddressFields();
    showEnterPostcode();
  }
}
