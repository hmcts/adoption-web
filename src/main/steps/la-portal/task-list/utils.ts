import { CaseDate, CaseWithId, Checkbox, FieldPrefix } from '../../../app/case/case';
import { AdditionalNationality, Gender, SectionStatus, YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { isDateInputInvalid, isFutureDate, notSureViolation } from '../../../app/form/validation';

const addressComplete = (userCase: CaseWithId, fieldPrefix: FieldPrefix) => {
  const address1 = userCase[`${fieldPrefix}Address1`];
  const addressTown = userCase[`${fieldPrefix}AddressTown`];
  const addressPostcode = userCase[`${fieldPrefix}AddressPostcode`];
  const addressCountry = userCase[`${fieldPrefix}AddressCountry`];

  return (address1 && addressTown && addressPostcode) || (address1 && addressCountry);
};

const isDateComplete = (userCase: CaseWithId, fieldPrefix: FieldPrefix) => {
  const lastAddressDate = userCase[`${fieldPrefix}LastAddressDate`];
  return !isDateInputInvalid(lastAddressDate as CaseDate) && !isFutureDate(lastAddressDate as CaseDate);
};

export const getChildrenPlacementOrderStatus = (userCase: CaseWithId): SectionStatus => {
  const addAnotherPlacementOrder = userCase.addAnotherPlacementOrder;
  const placementOrdersComplete =
    userCase.placementOrders?.length &&
    userCase.placementOrders.every((item, index) => {
      return (
        (index === 0 || item.placementOrderType) &&
        item.placementOrderNumber &&
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

  if (addAnotherPlacementOrder && placementOrdersComplete) {
    return SectionStatus.COMPLETED;
  }

  if (!addAnotherPlacementOrder && !placementOrdersComplete && !placementOrdersInProgress) {
    return SectionStatus.NOT_STARTED;
  }

  return SectionStatus.IN_PROGRESS;
};

export const getChildrenBirthCertificateStatus = (userCase: CaseWithId): SectionStatus => {
  const childrenSexAtBirth = userCase.childrenSexAtBirth;
  const childrenOtherSexAtBirth = userCase.childrenOtherSexAtBirth;

  const sexAtBirthComplete =
    childrenSexAtBirth === Gender.MALE ||
    childrenSexAtBirth === Gender.FEMALE ||
    (childrenSexAtBirth === Gender.OTHER && childrenOtherSexAtBirth);
  const sexAtBirthPartialComplete = childrenSexAtBirth === Gender.OTHER && !childrenOtherSexAtBirth;
  const nationality: string[] = userCase.childrenNationality || [];
  const nationalities: AdditionalNationality[] = userCase.childrenAdditionalNationalities || [];
  const nationalityComplete =
    !!nationality.length &&
    (!nationality.includes('Other') || (!!nationalities.length && nationality.includes('Other')));

  if (sexAtBirthComplete && nationalityComplete) {
    return SectionStatus.COMPLETED;
  }

  if (!sexAtBirthComplete && !nationalityComplete && !sexAtBirthPartialComplete) {
    return SectionStatus.NOT_STARTED;
  }

  return SectionStatus.IN_PROGRESS;
};

export const getAdoptionCertificateDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const firstName = userCase.childrenFirstNameAfterAdoption;
  const lastName = userCase.childrenLastNameAfterAdoption;

  if (firstName && lastName) {
    return SectionStatus.COMPLETED;
  }

  if (!firstName && !lastName) {
    return SectionStatus.NOT_STARTED;
  }

  return SectionStatus.IN_PROGRESS;
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
    (addressComplete(userCase, FieldPrefix.BIRTH_FATHER) && isDateComplete(userCase, FieldPrefix.BIRTH_FATHER))
    ? SectionStatus.COMPLETED
    : SectionStatus.IN_PROGRESS;
};

export const getBirthMotherDetailsStatus = (userCase: CaseWithId): SectionStatus => {
  const firstName = userCase.birthMotherFirstNames;
  const lastName = userCase.birthMotherLastNames;
  const stillAlive = userCase.birthMotherStillAlive;

  if (stillAlive === YesNoNotsure.NO) {
    return firstName && lastName ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  }

  if (stillAlive === YesNoNotsure.NOT_SURE) {
    const notAliveReason = userCase.birthMotherNotAliveReason;
    return firstName && lastName && notAliveReason ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
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
      return firstName && lastName && nationalityComplete && occupation
        ? SectionStatus.COMPLETED
        : SectionStatus.IN_PROGRESS;
    }

    return firstName &&
      lastName &&
      nationalityComplete &&
      occupation &&
      addressKnown === YesOrNo.YES &&
      addressComplete(userCase, FieldPrefix.BIRTH_MOTHER) &&
      isDateComplete(userCase, FieldPrefix.BIRTH_MOTHER)
      ? SectionStatus.COMPLETED
      : SectionStatus.IN_PROGRESS;
  }

  return firstName || lastName ? SectionStatus.IN_PROGRESS : SectionStatus.NOT_STARTED;
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

    return names &&
      addressKnown === YesOrNo.YES &&
      addressComplete(userCase, FieldPrefix.OTHER_PARENT) &&
      isDateComplete(userCase, FieldPrefix.OTHER_PARENT)
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
    const siblingsComplete =
      userCase.siblings?.length &&
      userCase.siblings?.every(item => item.siblingRelation && item.siblingPoType && item.siblingPoNumber);
    return siblingsComplete ? SectionStatus.COMPLETED : SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

export const getUploadDocumentStatus = (userCase: CaseWithId): SectionStatus => {
  const { laUploadedFiles, laCannotUpload } = userCase;
  if (
    ((laUploadedFiles as unknown as string) !== '[]' &&
      laUploadedFiles !== undefined &&
      laCannotUpload === undefined) ||
    laCannotUpload === Checkbox.Checked
  ) {
    return SectionStatus.COMPLETED;
  }

  // const statuses = getAllSectionStatuses(userCase);

  // if (statuses.some(status => status !== SectionStatus.COMPLETED)) {
  //   return SectionStatus.CAN_NOT_START_YET;
  // }

  return SectionStatus.NOT_STARTED;
};

const getAllSectionStatuses = (userCase: CaseWithId): SectionStatus[] => {
  return [
    getChildrenPlacementOrderStatus(userCase),
    getChildrenBirthCertificateStatus(userCase),
    getAdoptionCertificateDetailsStatus(userCase),
    getBirthFatherDetailsStatus(userCase),
    getBirthMotherDetailsStatus(userCase),
    getOtherParentStatus(userCase),
    getSiblingStatus(userCase),
  ];
};

export const getApplicationStatus = (userCase: CaseWithId): SectionStatus => {
  const statuses = [...getAllSectionStatuses(userCase), getUploadDocumentStatus(userCase)];

  if (statuses.every(status => status === SectionStatus.COMPLETED)) {
    return SectionStatus.NOT_STARTED;
  }
  return SectionStatus.CAN_NOT_START_YET;
};
