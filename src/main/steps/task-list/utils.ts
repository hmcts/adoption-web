import { CaseDate, CaseWithId, FieldPrefix } from '../../app/case/case';
import { ContactDetails, SectionStatus, YesOrNo } from '../../app/case/definition';
import { isDateInputInvalid } from '../../app/form/validation';

export const isApplyingWithComplete = (userCase: CaseWithId): boolean => {
  return !!userCase.applyingWith;
};

const addressComplete = (userCase: CaseWithId, fieldPrefix: FieldPrefix) => {
  const address1 = userCase[`${fieldPrefix}Address1`];
  const addressTown = userCase[`${fieldPrefix}AddressTown`];
  const addressPostcode = userCase[`${fieldPrefix}AddressPostcode`];

  return address1 && addressTown && addressPostcode;
};

export const getContactDetailsStatus = (userCase: CaseWithId, fieldPrefix: FieldPrefix): SectionStatus => {
  const contactDetails = userCase[`${fieldPrefix}ContactDetails`] || [];
  const emailAddress = userCase[`${fieldPrefix}EmailAddress`];
  const phoneNumber = userCase[`${fieldPrefix}PhoneNumber`];
  const applicant2AddressSameAsApplicant1 = userCase[`${fieldPrefix}AddressSameAsApplicant1`];

  let addressAvailable = addressComplete(userCase, fieldPrefix);
  if (fieldPrefix === FieldPrefix.APPLICANT2 && applicant2AddressSameAsApplicant1 === YesOrNo.YES) {
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

  return addressAvailable && contactDetailsAvailable
    ? SectionStatus.COMPLETED
    : !addressAvailable && !contactDetailsAvailable
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getPersonalDetailsStatus = (userCase: CaseWithId, userType: `applicant${1 | 2}`): SectionStatus => {
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

export const getBirthMotherDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const names = userCase.birthMotherFirstNames && userCase.birthMotherLastNames;

  const addressKnown = userCase.birthMotherAddressKnown;
  const addressAvailable =
    addressKnown === YesOrNo.NO ||
    (addressKnown === YesOrNo.YES && addressComplete(userCase, FieldPrefix.BIRTH_MOTHER));

  /**

  birthMotherStillAlive?: YesOrNo;
  birthMotherNotAliveReason?: string;
  birthMotherNationality?: string[];
  birthMotherAdditionalNationalities?: string[];
  birthMotherOccupation?: string;
  birthMotherAddressKnown?: YesOrNo;
  birthMotherAddress1?: string;
  birthMotherAddress2?: string;
  birthMotherAddress3?: string;
  birthMotherAddressTown?: string;
  birthMotherAddressCounty?: string;
  birthMotherAddressPostcode?: string;
  birthMotherAddressCountry?: string;
   */
  return names && addressAvailable
    ? SectionStatus.COMPLETED
    : !names
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};
