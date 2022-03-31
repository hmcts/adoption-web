import { CaseDate, CaseWithId, FieldPrefix } from '../../app/case/case';
import {
  AdoptionAgencyOrLocalAuthority,
  ApplyingWith,
  Gender,
  PlacementOrder,
  SectionStatus,
  State,
  YesNoNotsure,
  YesOrNo,
} from '../../app/case/definition';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFutureDate,
  isMoreThan18Years,
  notSureViolation,
} from '../../app/form/validation';
import { PaymentModel } from '../../app/payment/PaymentModel';
import * as urls from '../urls';

export const getApplyingWithStatus = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase.applyingWith === ApplyingWith.ALONE ||
    userCase.applyingWith === ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER
  ) {
    return SectionStatus.COMPLETED;
  }

  if (userCase.applyingWith === ApplyingWith.WITH_SOME_ONE_ELSE) {
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
  const fullName = userCase[`${userType}FirstNames`] && userCase[`${userType}LastNames`];
  const hasOtherNames = userCase[`${userType}HasOtherNames`];
  const additionalNames = userCase[`${userType}AdditionalNames`] || [];
  const dateOfBirth = userCase[`${userType}DateOfBirth`];
  const occupation = userCase[`${userType}Occupation`];

  const dateOfBirthComplete =
    !areDateFieldsFilledIn(dateOfBirth) && !isDateInputInvalid(dateOfBirth) && !isFutureDate(dateOfBirth);

  const otherNamesComplete =
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
        !isDateInputInvalid(item.placementOrderDate as CaseDate) &&
        !isFutureDate(item.placementOrderDate as CaseDate)
      );
    });

  const placementOrdersInProgress =
    userCase.placementOrders?.length &&
    userCase.placementOrders.some((item, index) => {
      return (
        item.placementOrderType ||
        item.placementOrderNumber ||
        item.placementOrderCourt ||
        (!isDateInputInvalid(item.placementOrderDate as CaseDate) &&
          !isFutureDate(item.placementOrderDate as CaseDate)) ||
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
  const dateOfBirthComplete =
    !areDateFieldsFilledIn(childrenDateOfBirth) &&
    !isDateInputInvalid(childrenDateOfBirth) &&
    !isFutureDate(childrenDateOfBirth) &&
    !isMoreThan18Years(childrenDateOfBirth);

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
  }
  if (!birthFatherNameOnCertificate) {
    return SectionStatus.NOT_STARTED;
  }

  // Progressed beyond certificate screen

  if (!birthFatherFirstNames || !birthFatherLastNames || !birthFatherStillAlive) {
    return SectionStatus.IN_PROGRESS;
  }

  if (
    birthFatherStillAlive === YesNoNotsure.NO ||
    (birthFatherStillAlive === YesNoNotsure.NOT_SURE && birthFatherUnsureAliveReason)
  ) {
    return SectionStatus.COMPLETED;
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
  }

  return (birthFatherAddressKnown === YesOrNo.NO && birthFatherAddressNotKnownReason) ||
    addressComplete(userCase, FieldPrefix.BIRTH_FATHER)
    ? SectionStatus.COMPLETED
    : SectionStatus.IN_PROGRESS;
};

export const getBirthMotherDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const names = userCase.birthMotherFirstNames && userCase.birthMotherLastNames;
  const stillAlive = userCase.birthMotherStillAlive;

  if (stillAlive === YesNoNotsure.NO) {
    return names ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  }

  if (stillAlive === YesNoNotsure.NOT_SURE) {
    const notAliveReason = userCase.birthMotherNotAliveReason;
    return names && notAliveReason ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  }

  if (stillAlive === YesNoNotsure.YES) {
    const nationality = userCase.birthMotherNationality;
    const nationalities = userCase.birthMotherAdditionalNationalities;
    const nationalityComplete =
      nationality?.length &&
      !notSureViolation(nationality) &&
      (!nationality.includes('Other') || (nationality.includes('Other') && nationalities?.length));
    const occupation = userCase.birthMotherOccupation;
    const addressKnown = userCase.birthMotherAddressKnown;

    if (addressKnown === YesOrNo.NO && userCase.birthMotherAddressNotKnownReason) {
      return names && nationalityComplete && occupation ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
    }

    return names &&
      nationalityComplete &&
      occupation &&
      addressKnown === YesOrNo.YES &&
      addressComplete(userCase, FieldPrefix.BIRTH_MOTHER)
      ? SectionStatus.COMPLETED
      : SectionStatus.IN_PROGRESS;
  }

  return names ? SectionStatus.IN_PROGRESS : SectionStatus.NOT_STARTED;
};

export const getOtherParentStatus = (userCase: CaseWithId): SectionStatus => {
  const exists = userCase.otherParentExists;

  if (exists === YesOrNo.NO) {
    return SectionStatus.COMPLETED;
  }

  if (exists === YesOrNo.YES) {
    const names = userCase.otherParentFirstNames && userCase.otherParentLastNames;
    const addressKnown = userCase.otherParentAddressKnown;
    if (addressKnown === YesOrNo.NO && userCase.otherParentAddressNotKnownReason) {
      return names ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
    }

    return names && addressKnown === YesOrNo.YES && addressComplete(userCase, FieldPrefix.OTHER_PARENT)
      ? SectionStatus.COMPLETED
      : SectionStatus.IN_PROGRESS;
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
  const adopAgencyOrLAsComplete =
    userCase.adopAgencyOrLAs?.length &&
    ((userCase.hasAnotherAdopAgencyOrLA === YesOrNo.NO && isAdoptionAgencyOrLaComplete(userCase.adopAgencyOrLAs[0])) ||
      (userCase.hasAnotherAdopAgencyOrLA === YesOrNo.YES &&
        userCase.adopAgencyOrLAs?.length === 2 &&
        isAdoptionAgencyOrLaComplete(userCase.adopAgencyOrLAs[0]) &&
        isAdoptionAgencyOrLaComplete(userCase.adopAgencyOrLAs[1])));

  const socialWorkerComplete = !!(
    userCase.socialWorkerName &&
    userCase.socialWorkerPhoneNumber &&
    userCase.socialWorkerEmail
  );

  if (adopAgencyOrLAsComplete && socialWorkerComplete) {
    return SectionStatus.COMPLETED;
  }

  const adopAgencyOrLAsInProgress =
    userCase.hasAnotherAdopAgencyOrLA ||
    (userCase.adopAgencyOrLAs?.length && userCase.adopAgencyOrLAs.some(item => isAdoptionAgencyOrLaInProgress(item)));

  const socialWorkerInProgress =
    userCase.socialWorkerName || userCase.socialWorkerPhoneNumber || userCase.socialWorkerEmail;

  return !adopAgencyOrLAsInProgress && !socialWorkerInProgress ? SectionStatus.NOT_STARTED : SectionStatus.IN_PROGRESS;
};

export const getAdoptionAgencyUrl = (userCase: CaseWithId): string => {
  if (userCase.adopAgencyOrLAs?.length) {
    const adopAgency = userCase.adopAgencyOrLAs[0];
    return `${urls?.ADOPTION_AGENCY}?change=${adopAgency.adopAgencyOrLaId}`;
  }
  return `${urls?.ADOPTION_AGENCY}?add=${Date.now()}`;
};

const isAdoptionAgencyOrLaComplete = (item: AdoptionAgencyOrLocalAuthority): boolean => {
  return !!(
    item.adopAgencyOrLaName &&
    item.adopAgencyOrLaContactName &&
    item.adopAgencyOrLaPhoneNumber &&
    item.adopAgencyOrLaContactEmail
  );
};

const isAdoptionAgencyOrLaInProgress = (item: AdoptionAgencyOrLocalAuthority): boolean => {
  return !!(
    item.adopAgencyOrLaName ||
    item.adopAgencyOrLaContactName ||
    item.adopAgencyOrLaPhoneNumber ||
    item.adopAgencyOrLaContactEmail
  );
};

export const getReviewPaySubmitUrl = (userCase: CaseWithId): string => {
  const payments = new PaymentModel(userCase.payments);
  if (payments.hasPayment) {
    if (payments.wasLastPaymentSuccessful) {
      return urls.APPLICATION_SUBMITTED;
    }
    return urls.PAYMENT_CALLBACK_URL;
  }
  return urls.EQUALITY;
};

export const getUploadDocumentStatus = (userCase: CaseWithId): SectionStatus => {
  const { applicant1UploadedFiles, applicant1CannotUpload, applicant1CannotUploadDocuments } = userCase;
  if (applicant1UploadedFiles && applicant1UploadedFiles.length > 0 && !applicant1CannotUpload) {
    return SectionStatus.COMPLETED;
  }

  if (applicant1UploadedFiles && applicant1UploadedFiles.length > 0 && applicant1CannotUpload) {
    if (applicant1CannotUploadDocuments && applicant1CannotUploadDocuments.length > 0) {
      return SectionStatus.COMPLETED;
    }
    return SectionStatus.IN_PROGRESS;
  }

  if (applicant1CannotUpload && applicant1CannotUploadDocuments && applicant1CannotUploadDocuments.length > 0) {
    return SectionStatus.COMPLETED;
  }

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
  ];

  if (statuses.some(status => status !== SectionStatus.COMPLETED)) {
    return SectionStatus.CAN_NOT_START_YET;
  }

  return SectionStatus.NOT_STARTED;
};

export const getDateChildMovedInStatus = (userCase: CaseWithId): SectionStatus => {
  const dateChildMovedIn = userCase.dateChildMovedIn as CaseDate;
  const dateChildMovedInComplete =
    !areDateFieldsFilledIn(dateChildMovedIn) &&
    !isDateInputInvalid(dateChildMovedIn) &&
    !isFutureDate(dateChildMovedIn);

  return dateChildMovedInComplete ? SectionStatus.COMPLETED : SectionStatus.NOT_STARTED;
};

export const findFamilyCourtStatus = (userCase: CaseWithId): SectionStatus => {
  const exists = userCase.findFamilyCourt;

  if (exists === YesOrNo.YES) {
    return SectionStatus.COMPLETED;
  }

  if (exists === YesOrNo.NO) {
    if (userCase.familyCourtName) {
      return SectionStatus.COMPLETED;
    }
    return SectionStatus.IN_PROGRESS;
  }

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
  ];

  if (statuses.some(status => status !== SectionStatus.COMPLETED)) {
    return SectionStatus.CAN_NOT_START_YET;
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
    if (statementOfTruthAndPaymentStatus(userCase) === SectionStatus.IN_PROGRESS) {
      return SectionStatus.IN_PROGRESS;
    }
    return SectionStatus.NOT_STARTED;
  }

  return SectionStatus.CAN_NOT_START_YET;
};

export const statementOfTruthAndPaymentStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase.applyingWith === ApplyingWith.ALONE) {
    if (!userCase.applicant1IBelieveApplicationIsTrue && !userCase.applicant1SotFullName) {
      return SectionStatus.NOT_STARTED;
    } else if (
      userCase.applicant1IBelieveApplicationIsTrue ||
      userCase.applicant1SotFullName ||
      userCase.state !== State.Submitted
    ) {
      return SectionStatus.IN_PROGRESS;
    }
  } else {
    if (
      !userCase.applicant1IBelieveApplicationIsTrue &&
      !userCase.applicant1SotFullName &&
      !userCase.applicant2IBelieveApplicationIsTrue &&
      !userCase.applicant2SotFullName
    ) {
      return SectionStatus.NOT_STARTED;
    } else if (
      userCase.applicant1IBelieveApplicationIsTrue ||
      userCase.applicant1SotFullName ||
      userCase.applicant1IBelieveApplicationIsTrue ||
      userCase.applicant1SotFullName ||
      userCase.state !== State.Submitted
    ) {
      return SectionStatus.IN_PROGRESS;
    }
  }
  return SectionStatus.NOT_STARTED;
};
