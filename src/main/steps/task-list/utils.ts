import { CaseWithId } from '../../app/case/case';
import { ContactDetails, SectionStatus } from '../../app/case/definition';

export const isApplyingWithComplete = (userCase: CaseWithId): boolean => {
  return !!userCase.applyingWith;
};

export const getContactDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const {
    applicant1Address1 = '',
    applicant1AddressTown = '',
    applicant1AddressPostcode = '',
    applicant1ContactDetails = [],
    applicant1EmailAddress = '',
    applicant1PhoneNumber = '',
  } = userCase;

  let addressAvailable = false;
  if (applicant1Address1 && applicant1AddressTown && applicant1AddressPostcode) {
    addressAvailable = true;
  }

  let contactDetailsAvailable = false;
  if (applicant1ContactDetails.length === 0) {
    contactDetailsAvailable = false;
  } else {
    contactDetailsAvailable = applicant1ContactDetails.every(
      item =>
        (item === ContactDetails.EMAIL && applicant1EmailAddress) ||
        (item === ContactDetails.PHONE && applicant1PhoneNumber)
    );
  }
  if (addressAvailable && contactDetailsAvailable) {
    return SectionStatus.COMPLETED;
  } else if (addressAvailable || contactDetailsAvailable) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};
