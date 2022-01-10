import { CaseDate, CaseWithId } from '../../app/case/case';
import { ContactDetails, SectionStatus, YesOrNo } from '../../app/case/definition';
import { isDateInputInvalid } from '../../app/form/validation';

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

export const getPersonalDetailsStatus = (
  userCase: Partial<CaseWithId>,
  userType: `applicant${1 | 2}`
): SectionStatus => {
  //TODO full name logic should be changed after applicant1 name field is split into 2
  const fullName =
    userCase[`${userType}FullName`] || (userCase[`${userType}FirstNames`] && userCase[`${userType}LastNames`]);
  const hasOtherNames = userCase[`${userType}HasOtherNames`];
  const additionalNames = userCase[`${userType}AdditionalNames`] || [];
  const dateOfBirth = userCase[`${userType}DateOfBirth`];
  const nationality: string[] = userCase[`${userType}Nationality`] || [];
  const nationalities: string[] = userCase[`${userType}AdditionalNationalities`] || [];
  const occupation = userCase[`${userType}Occupation`];

  const dateOfBirthComplete = dateOfBirth ? !!dateOfBirth.year && !!dateOfBirth.month && !!dateOfBirth.day : false;

  const otherNamesComplete: boolean =
    hasOtherNames === YesOrNo.NO || (hasOtherNames === YesOrNo.YES && !!additionalNames.length);
  const nationalityComplete =
    !!nationality.length &&
    (!nationality.includes('Other') || (!!nationalities.length && nationality.includes('Other')));

  return fullName && otherNamesComplete && dateOfBirthComplete && nationalityComplete && occupation
    ? SectionStatus.COMPLETED
    : !fullName && !otherNamesComplete && !dateOfBirthComplete && !nationalityComplete && !occupation
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getChildrenPlacementOrderStatus = (userCase: CaseWithId): SectionStatus => {
  const addAnotherPlacementOrder = userCase.addAnotherPlacementOrder;
  const placementOrdersComplete =
    userCase.placementOrders?.length &&
    userCase.placementOrders.every((item, index) => {
      return (
        (index === 0 || item.placementOrderType) &&
        item.placementOrderNumber &&
        item.placementOrderCourt &&
        !isDateInputInvalid(item.placementOrderDate)
      );
    });

  const placementOrdersInProgress =
    userCase.placementOrders?.length &&
    userCase.placementOrders.some((item, index) => {
      return (
        item.placementOrderType ||
        item.placementOrderNumber ||
        item.placementOrderCourt ||
        !isDateInputInvalid(item.placementOrderDate) ||
        index === 0
      );
    });

  return addAnotherPlacementOrder && placementOrdersComplete
    ? SectionStatus.COMPLETED
    : !addAnotherPlacementOrder && !placementOrdersComplete && !placementOrdersInProgress
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getChildrenBirthCertificateStatus = (userCase: CaseWithId): SectionStatus => {
  const childrenFirstName = userCase.childrenFirstName;
  const childrenLastName = userCase.childrenLastName;
  const childrenDateOfBirth = userCase.childrenDateOfBirth as CaseDate;
  const dateOfBirthComplete = childrenDateOfBirth?.day && childrenDateOfBirth?.month && childrenDateOfBirth?.year;
  const childrenSexAtBirth = userCase.childrenSexAtBirth;

  const nationality: string[] = userCase.childrenNationality || [];
  const nationalities: string[] = userCase.childrenAdditionalNationalities || [];
  const nationalityComplete =
    !!nationality.length &&
    (!nationality.includes('Other') || (!!nationalities.length && nationality.includes('Other')));

  return childrenFirstName && childrenLastName && dateOfBirthComplete && childrenSexAtBirth && nationalityComplete
    ? SectionStatus.COMPLETED
    : !childrenFirstName && !childrenLastName && !dateOfBirthComplete && !childrenSexAtBirth && !nationalityComplete
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getAdoptionCertificateDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const firstName = userCase.childrenFirstNameAfterAdoption;
  const lastName = userCase.childrenLastNameAfterAdoption;

  return firstName && lastName
    ? SectionStatus.COMPLETED
    : !firstName && !lastName
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};
