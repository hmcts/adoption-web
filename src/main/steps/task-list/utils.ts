import { CaseDate, CaseWithId, FieldPrefix } from '../../app/case/case';
import {
  AdoptionAgencyOrLocalAuthority,
  ApplyingWith,
  Gender,
  PlacementOrder,
  SectionStatus,
  YesNoNotsure,
  YesOrNo,
} from '../../app/case/definition';
import { isDateInputInvalid, notSureViolation } from '../../app/form/validation';
import { PaymentModel } from '../../app/payment/PaymentModel';
import * as urls from '../urls';

export const getApplyingWithStatus = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase.applyingWith === ApplyingWith.ALONE ||
    userCase.applyingWith === ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER
  ) {
    return SectionStatus.COMPLETED;
  } else if (userCase.applyingWith === ApplyingWith.WITH_SOME_ONE_ELSE) {
    return userCase.otherApplicantRelation && userCase.otherApplicantRelation?.length > 0
      ? SectionStatus.COMPLETED
      : SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

const addressComplete = (userCase: CaseWithId, fieldPrefix: FieldPrefix) => {
  const address1 = userCase[`${fieldPrefix}Address1`];
  const addressTown = userCase[`${fieldPrefix}AddressTown`];
  const addressPostcode = userCase[`${fieldPrefix}AddressPostcode`];
  const addressCountry = userCase[`${fieldPrefix}AddressCountry`];

  return (address1 && addressTown && addressPostcode) || (address1 && addressCountry);
};

export const getContactDetailsStatus = (userCase: CaseWithId, fieldPrefix: FieldPrefix): SectionStatus => {
  const contactDetailsConsent = userCase[`${fieldPrefix}ContactDetailsConsent`];
  const emailAddress = userCase[`${fieldPrefix}EmailAddress`];
  const phoneNumber = userCase[`${fieldPrefix}PhoneNumber`];
  const applicant2AddressSameAsApplicant1 = userCase[`${fieldPrefix}AddressSameAsApplicant1`];

  let addressAvailable = addressComplete(userCase, fieldPrefix);
  if (fieldPrefix === FieldPrefix.APPLICANT2 && applicant2AddressSameAsApplicant1 === YesOrNo.YES) {
    addressAvailable = true;
  }

  const contactDetailsAvailable = !!contactDetailsConsent && !!emailAddress && !!phoneNumber;

  return addressAvailable && contactDetailsAvailable
    ? SectionStatus.COMPLETED
    : !addressAvailable && !contactDetailsAvailable
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getPersonalDetailsStatus = (
  userCase: Partial<CaseWithId>,
  userType: `applicant${1 | 2}`
): SectionStatus => {
  //TODO full name logic should be changed after applicant1 name field is split into 2
  const fullName = userCase[`${userType}FirstNames`] && userCase[`${userType}LastNames`];
  const hasOtherNames = userCase[`${userType}HasOtherNames`];
  const additionalNames = userCase[`${userType}AdditionalNames`] || [];
  const dateOfBirth = userCase[`${userType}DateOfBirth`];
  const occupation = userCase[`${userType}Occupation`];

  const dateOfBirthComplete = dateOfBirth ? !!dateOfBirth.year && !!dateOfBirth.month && !!dateOfBirth.day : false;

  const otherNamesComplete: boolean =
    hasOtherNames === YesOrNo.NO || (hasOtherNames === YesOrNo.YES && !!additionalNames.length);

  return fullName && otherNamesComplete && dateOfBirthComplete && occupation
    ? SectionStatus.COMPLETED
    : !fullName && !otherNamesComplete && !dateOfBirthComplete && !occupation
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
        !isDateInputInvalid(item.placementOrderDate as CaseDate)
      );
    });

  const placementOrdersInProgress =
    userCase.placementOrders?.length &&
    userCase.placementOrders.some((item, index) => {
      return (
        item.placementOrderType ||
        item.placementOrderNumber ||
        item.placementOrderCourt ||
        !isDateInputInvalid(item.placementOrderDate as CaseDate) ||
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
  const childrenOtherSexAtBirth = userCase.childrenOtherSexAtBirth;

  const sexAtBirthComplete =
    childrenSexAtBirth === Gender.MALE ||
    childrenSexAtBirth === Gender.FEMALE ||
    (childrenSexAtBirth === Gender.OTHER && childrenOtherSexAtBirth);
  const nationality: string[] = userCase.childrenNationality || [];
  const nationalities: string[] = userCase.childrenAdditionalNationalities || [];
  const nationalityComplete =
    !!nationality.length &&
    (!nationality.includes('Other') || (!!nationalities.length && nationality.includes('Other')));

  return childrenFirstName && childrenLastName && dateOfBirthComplete && sexAtBirthComplete && nationalityComplete
    ? SectionStatus.COMPLETED
    : !childrenFirstName && !childrenLastName && !dateOfBirthComplete && !sexAtBirthComplete && !nationalityComplete
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

export const getBirthFatherDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const {
    birthFatherNameOnCertificate,
    birthFatherFirstNames,
    birthFatherLastNames,
    birthFatherStillAlive,
    birthFatherUnsureAliveReason,
    birthFatherNationality,
    birthFatherAdditionalNationalities,
    birthFatherOccupation,
    birthFatherAddressKnown,
    birthFatherAddressNotKnownReason,
  } = userCase;

  if (birthFatherNameOnCertificate === YesOrNo.NO) {
    return SectionStatus.COMPLETED;
  } else if (!birthFatherNameOnCertificate) {
    return SectionStatus.NOT_STARTED;
  }

  // Progressed beyond certificate screen

  if (!birthFatherFirstNames || !birthFatherLastNames || !birthFatherStillAlive) {
    return SectionStatus.IN_PROGRESS;
  } else {
    if (
      birthFatherStillAlive === YesNoNotsure.NO ||
      (birthFatherStillAlive === YesNoNotsure.NOT_SURE && birthFatherUnsureAliveReason)
    ) {
      return SectionStatus.COMPLETED;
    }
  }

  // Progressed beyond alive screen

  if (
    !birthFatherNationality?.length ||
    notSureViolation(birthFatherNationality) ||
    (birthFatherNationality.includes('Other') && !birthFatherAdditionalNationalities?.length) ||
    !birthFatherOccupation ||
    !birthFatherAddressKnown
  ) {
    return SectionStatus.IN_PROGRESS;
  } else {
    return (birthFatherAddressKnown === YesOrNo.NO &&
      birthFatherAddressNotKnownReason &&
      birthFatherAddressNotKnownReason?.length > 0) ||
      addressComplete(userCase, FieldPrefix.BIRTH_FATHER)
      ? SectionStatus.COMPLETED
      : SectionStatus.IN_PROGRESS;
  }
};

export const getBirthMotherDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const names = userCase.birthMotherFirstNames && userCase.birthMotherLastNames;
  const stillAlive = userCase.birthMotherStillAlive;

  if (stillAlive === YesNoNotsure.NO) {
    return names ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  } else if (stillAlive === YesNoNotsure.NOT_SURE) {
    const notAliveReason = userCase.birthMotherNotAliveReason;
    return names && notAliveReason ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  } else if (stillAlive === YesNoNotsure.YES) {
    const nationality = userCase.birthMotherNationality;
    const nationalities = userCase.birthMotherAdditionalNationalities;
    const nationalityComplete =
      nationality?.length &&
      !notSureViolation(nationality) &&
      (!nationality.includes('Other') || (nationality.includes('Other') && nationalities?.length));
    const occupation = userCase.birthMotherOccupation;
    const addressKnown = userCase.birthMotherAddressKnown;

    if (
      addressKnown === YesOrNo.NO &&
      userCase.birthMotherAddressNotKnownReason &&
      userCase.birthMotherAddressNotKnownReason?.length > 0
    ) {
      return names && nationalityComplete && occupation ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
    } else {
      return names &&
        nationalityComplete &&
        occupation &&
        addressKnown === YesOrNo.YES &&
        addressComplete(userCase, FieldPrefix.BIRTH_MOTHER)
        ? SectionStatus.COMPLETED
        : SectionStatus.IN_PROGRESS;
    }
  }

  return names ? SectionStatus.IN_PROGRESS : SectionStatus.NOT_STARTED;
};

export const getOtherParentStatus = (userCase: CaseWithId): SectionStatus => {
  const exists = userCase.otherParentExists;

  if (exists === YesOrNo.NO) {
    return SectionStatus.COMPLETED;
  } else if (exists === YesOrNo.YES) {
    const names = userCase.otherParentFirstNames && userCase.otherParentLastNames;
    const addressKnown = userCase.otherParentAddressKnown;
    if (
      addressKnown === YesOrNo.NO &&
      userCase.otherParentAddressNotKnownReason &&
      userCase.otherParentAddressNotKnownReason?.length > 0
    ) {
      return names ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
    } else {
      return names && addressKnown === YesOrNo.YES && addressComplete(userCase, FieldPrefix.OTHER_PARENT)
        ? SectionStatus.COMPLETED
        : SectionStatus.IN_PROGRESS;
    }
  }

  return SectionStatus.NOT_STARTED;
};

export const getSiblingStatus = (userCase: CaseWithId): SectionStatus => {
  const exists = userCase.hasSiblings;
  if (exists === YesNoNotsure.NO || exists === YesNoNotsure.NOT_SURE) {
    return SectionStatus.COMPLETED;
  }
  if (exists === YesNoNotsure.YES) {
    const courtOrderExists = userCase.hasPoForSiblings;
    if (courtOrderExists === YesNoNotsure.NO || courtOrderExists === YesNoNotsure.NOT_SURE) {
      return SectionStatus.COMPLETED;
    }
    if (courtOrderExists === YesNoNotsure.YES) {
      const siblingsComplete =
        userCase.siblings?.length &&
        userCase.siblings?.every(
          item =>
            item.siblingFirstName &&
            item.siblingLastNames &&
            item.siblingPlacementOrders?.length &&
            (item.siblingPlacementOrders as PlacementOrder[]).every(
              po => po.placementOrderType && po.placementOrderNumber && po.placementOrderId
            )
        );
      return siblingsComplete ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
    }
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

export const getAdoptionAgencyDetailStatus = (userCase: CaseWithId): SectionStatus => {
  let adopAgencyOrLAsComplete = false;
  if (userCase.hasAnotherAdopAgencyOrLA === YesOrNo.NO && userCase.adopAgencyOrLAs?.length === 2) {
    adopAgencyOrLAsComplete =
      isAdoptionAgencyOrLocalAuthorityNotEmpty(userCase.adopAgencyOrLAs[0]) && isSocialWorkerNotEmpty(userCase);
  } else {
    adopAgencyOrLAsComplete =
      ((userCase.hasAnotherAdopAgencyOrLA === YesOrNo.NO && userCase.adopAgencyOrLAs?.length === 1) ||
        (userCase.hasAnotherAdopAgencyOrLA === YesOrNo.YES && userCase.adopAgencyOrLAs?.length === 2)) &&
      userCase.adopAgencyOrLAs.every(item => {
        return (
          item.adopAgencyOrLaName &&
          item.adopAgencyOrLaContactName &&
          item.adopAgencyOrLaPhoneNumber &&
          item.adopAgencyOrLaContactEmail
        );
      }) &&
      isSocialWorkerNotEmpty(userCase);
  }

  const adopAgencyOrLAsInProgress =
    userCase.hasAnotherAdopAgencyOrLA ||
    (userCase.adopAgencyOrLAs?.length &&
      userCase.adopAgencyOrLAs.some(item => {
        return (
          item.adopAgencyOrLaName ||
          item.adopAgencyOrLaContactName ||
          item.adopAgencyOrLaPhoneNumber ||
          item.adopAgencyOrLaContactEmail
        );
      })) ||
    userCase.socialWorkerName ||
    userCase.socialWorkerPhoneNumber ||
    userCase.socialWorkerEmail;

  return adopAgencyOrLAsComplete
    ? SectionStatus.COMPLETED
    : !adopAgencyOrLAsComplete && !adopAgencyOrLAsInProgress
    ? SectionStatus.NOT_STARTED
    : SectionStatus.IN_PROGRESS;
};

export const getAdoptionAgencyUrl = (userCase: CaseWithId): string => {
  if (userCase.adopAgencyOrLAs?.length) {
    const adopAgency = userCase.adopAgencyOrLAs[0];
    return `${urls?.ADOPTION_AGENCY}?change=${adopAgency.adopAgencyOrLaId}`;
  }
  return `${urls?.ADOPTION_AGENCY}?add=${Date.now()}`;
};

export const isAdoptionAgencyOrLocalAuthorityNotEmpty = (item: AdoptionAgencyOrLocalAuthority): boolean => {
  return !!(
    item.adopAgencyOrLaName &&
    item.adopAgencyOrLaContactName &&
    item.adopAgencyOrLaPhoneNumber &&
    item.adopAgencyOrLaContactEmail
  );
};

export const isSocialWorkerNotEmpty = (userCase: CaseWithId): boolean => {
  return !!(userCase.socialWorkerName && userCase.socialWorkerPhoneNumber && userCase.socialWorkerEmail);
};

export const getReviewPaySubmitUrl = (userCase: CaseWithId): string => {
  const payments = new PaymentModel(userCase.payments);
  if (payments.hasPayment) {
    if (payments.wasLastPaymentSuccessful) {
      return urls.APPLICATION_SUBMITTED;
    } else {
      return urls.PAYMENT_CALLBACK_URL;
    }
  }
  return urls.EQUALITY;
};

export const getUploadDocumentStatus = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase?.applicant1UploadedFiles &&
    userCase.applicant1UploadedFiles.length > 0 &&
    !userCase.applicant1CannotUpload
  ) {
    return SectionStatus.COMPLETED;
  } else if (
    userCase?.applicant1UploadedFiles &&
    userCase.applicant1UploadedFiles.length > 0 &&
    userCase.applicant1CannotUpload
  ) {
    if (userCase.applicant1CannotUploadDocuments && userCase.applicant1CannotUploadDocuments.length > 0) {
      return SectionStatus.COMPLETED;
    } else {
      return SectionStatus.IN_PROGRESS;
    }
  } else if (
    userCase.applicant1CannotUpload &&
    userCase?.applicant1CannotUploadDocuments &&
    userCase.applicant1CannotUploadDocuments.length > 0
  ) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.NOT_STARTED;
};

export const getDateChildMovedInStatus = (userCase: CaseWithId): SectionStatus => {
  const dateChildMovedIn = userCase.dateChildMovedIn as CaseDate;
  const dateChildMovedInComplete = !!(dateChildMovedIn?.day && dateChildMovedIn.month && dateChildMovedIn.year);

  return dateChildMovedInComplete ? SectionStatus.COMPLETED : SectionStatus.NOT_STARTED;
};

export const findFamilyCourtStatus = (userCase: CaseWithId): SectionStatus => {
  const exists = userCase.findFamilyCourt;

  if (exists === YesOrNo.YES) {
    return SectionStatus.COMPLETED;
  } else if (exists === YesOrNo.NO) {
    if (userCase.familyCourtName && userCase.familyCourtName?.length > 0) {
      return SectionStatus.COMPLETED;
    } else {
      return SectionStatus.IN_PROGRESS;
    }
  }
  return SectionStatus.NOT_STARTED;
};

export const getApplicationStatus = (userCase: CaseWithId): SectionStatus => {
  const statuses = [
    getApplyingWithStatus(userCase),
    getDateChildMovedInStatus(userCase),
    getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT1),
    getContactDetailsStatus(userCase, FieldPrefix.APPLICANT1),
    ...(userCase.applyingWith !== ApplyingWith.ALONE
      ? [
          getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT2),
          getContactDetailsStatus(userCase, FieldPrefix.APPLICANT2),
        ]
      : []),
    getChildrenBirthCertificateStatus(userCase),
    getAdoptionCertificateDetailsStatus(userCase),
    getChildrenPlacementOrderStatus(userCase),
    getBirthMotherDetailsStatus(userCase),
    getBirthFatherDetailsStatus(userCase),
    getOtherParentStatus(userCase),
    getAdoptionAgencyDetailStatus(userCase),
    getSiblingStatus(userCase),
    findFamilyCourtStatus(userCase),
    getUploadDocumentStatus(userCase),
  ];

  if (statuses.every(status => status === SectionStatus.COMPLETED)) {
    return SectionStatus.NOT_STARTED;
  }

  return SectionStatus.CAN_NOT_START_YET;
};
