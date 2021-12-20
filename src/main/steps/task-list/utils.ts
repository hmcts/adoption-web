import { CaseWithId } from '../../app/case/case';
import { ContactDetails, SectionStatus, YesOrNo } from '../../app/case/definition';

export const isApplyingWithComplete = (userCase: CaseWithId): boolean => {
  return !!userCase.applyingWith;
};

export const getContactDetailsStatus = (userCase: CaseWithId, userType: 'applicant1' | 'applicant2'): SectionStatus => {
  const address1 = userCase[`${userType}Address1`];
  const addressTown = userCase[`${userType}AddressTown`];
  const addressPostcode = userCase[`${userType}AddressPostcode`];
  const contactDetails = userCase[`${userType}ContactDetails`] || [];
  const emailAddress = userCase[`${userType}EmailAddress`];
  const phoneNumber = userCase[`${userType}PhoneNumber`];
  const applicant2AddressSameAsApplicant1 = userCase[`${userType}AddressSameAsApplicant1`];

  let addressAvailable = false;
  if (address1 && addressTown && addressPostcode) {
    addressAvailable = true;
  } else if (userType === 'applicant2' && applicant2AddressSameAsApplicant1 === YesOrNo.YES) {
    addressAvailable = true;
  }

  let contactDetailsAvailable = false;
  if (contactDetails.length === 0) {
    contactDetailsAvailable = false;
  } else if (contactDetails) {
    contactDetailsAvailable = contactDetails.every(
      item => (item === ContactDetails.EMAIL && emailAddress) || (item === ContactDetails.PHONE && phoneNumber)
    );
  }
  if (addressAvailable && contactDetailsAvailable) {
    return SectionStatus.COMPLETED;
  } else if (addressAvailable || contactDetailsAvailable) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

// export const getPersonalDetailsStatus = (userCase: CaseWithId, userType: 'applicant1' | 'applicant2'): SectionStatus => {

// }
