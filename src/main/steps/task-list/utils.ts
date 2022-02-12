import { CaseDate, CaseWithId, FieldPrefix } from '../../app/case/case';
import {
  AdoptionAgencyOrLocalAuthority,
  ContactDetails,
  PlacementOrder,
  SectionStatus,
  YesNoNotsure,
  YesOrNo,
} from '../../app/case/definition';
import { Form } from '../../app/form/Form';
import { isDateInputInvalid, notSureViolation } from '../../app/form/validation';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { stepFields, steps } from '../../steps';
import { Sections } from '../../steps/constants';
import * as urls from '../urls';

export const isApplyingWithComplete = (userCase: CaseWithId): boolean => {
  return !!userCase.applyingWith;
};

const addressComplete = (userCase: CaseWithId, fieldPrefix: FieldPrefix) => {
  const address1 = userCase[`${fieldPrefix}Address1`];
  const addressTown = userCase[`${fieldPrefix}AddressTown`];
  const addressPostcode = userCase[`${fieldPrefix}AddressPostcode`];
  const addressCountry = userCase[`${fieldPrefix}AddressCountry`];

  return (address1 && addressTown && addressPostcode) || (address1 && addressCountry);
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

export const getPersonalDetailsStatus = (
  userCase: Partial<CaseWithId>,
  userType: `applicant${1 | 2}`
): SectionStatus => {
  //TODO full name logic should be changed after applicant1 name field is split into 2
  const fullName = userCase[`${userType}FirstNames`] && userCase[`${userType}LastNames`];
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

const getSectionStatus = (userCase: Partial<CaseWithId>, section: Sections) => {
  const sectionSteps = steps.filter(item => item.showInSection === section);
  let completedCount = 0;
  let nextStepUrl = sectionSteps.find(item => item.isFirstInSection)![0].url;
  do {
    const step = sectionSteps.find(item => item.url === nextStepUrl)!;
    const formFields = stepFields[step.url];
    const fields = typeof formFields === 'function' ? formFields(userCase) : formFields;
    const form = new Form(fields);
    if (form.getErrors(userCase).length === 0) {
      completedCount++;
    }
    nextStepUrl = step.getNextStep(userCase);
  } while (nextStepUrl !== urls.TASK_LIST_URL);

  if (completedCount === 0) {
    return SectionStatus.NOT_STARTED;
  }
  if (completedCount === sectionSteps.length) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.IN_PROGRESS;
};

export const getChildrenBirthCertificateStatus = (userCase: CaseWithId): SectionStatus => {
  return getSectionStatus(userCase, Sections.ChildrenBirthCertificate);
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
    return birthFatherAddressKnown === YesOrNo.NO || addressComplete(userCase, FieldPrefix.BIRTH_FATHER)
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

    if (addressKnown === YesOrNo.NO) {
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
    if (addressKnown === YesOrNo.NO) {
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
  } else if (exists === YesNoNotsure.YES) {
    const courtOrderExists = userCase.hasPoForSiblings;
    if (courtOrderExists === YesNoNotsure.NO || courtOrderExists === YesNoNotsure.NOT_SURE) {
      return SectionStatus.COMPLETED;
    } else if (courtOrderExists === YesNoNotsure.YES) {
      const siblingsComplete = userCase.siblings?.every(
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
      return '#';
    } else {
      return urls.PAYMENT_CALLBACK_URL;
    }
  }
  return urls.EQUALITY;
};
