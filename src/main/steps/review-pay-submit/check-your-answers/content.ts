import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, Gender, YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import {
  adoptionAgencySummaryList,
  applicantSummaryList,
  applicationSummaryList,
  birthParentSummaryList,
  childrenPlacementOrderSummaryList,
  childrenSummaryList,
  familyCourtSummaryList,
  otherParentSummaryList,
  siblingCourtOrderSummaryList,
  socialWorkerSummaryList,
} from './utils';

const en = (content: CommonContent): Record<string, unknown> => {
  const sectionTitles = {
    applicationDetails: 'Application details',
    adoptionagencyOrLA: 'Adoption agency or local authority details',
    additionalAoptionagencyOrLA: 'Additional adoption agency or local authority details',
    socialWorkerDetails: "Child's social worker details",
    applicantDetails: "Applicant's details",
    firstApplicantDetails: "First applicant's details",
    secondApplicantDetails: "Second applicant's details",
    childDetails: "Child's details",
    birthMotherDetails: "Birth mother's details",
    birthFatherDetails: "Birth father's details",
    otherParentDetails: "Other parent's details",
    childPlacementAndCourtOrders: "Child's placement and court orders",
    siblingCourtOrders: 'Sibling court orders',
    familyCourtDetails: 'Family court details',
    uploadedDocuments: 'Uploaded documents',
  };

  const keys = {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
    name: 'Name',
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
    nameOfContact: 'Name of contact',
    emailOfContact: 'Email address of contact',
    teamEmailAddress: 'Team email address',
    additionalAdoptionAgency: 'Additional adoption agency',
    fullName: 'Full name',
    previousNames: 'Previous names',
    dateOfBirth: 'Date of birth',
    occupation: 'Occupation',
    address: 'Address',
    sexAtBirth: 'Sex at birth',
    nationality: 'Nationality',
    fullNameAfterAdoption: 'Full name after adoption',
    alive: 'Alive',
    addressKnown: 'Address known',
    nameOnBirthCertificate: 'Name on birth certificate',
    otherParent: 'Is there another person with parental responsibility?',
    placementOrder: 'Placement order',
    typeOfOrder: 'Type of order',
    orderNumber: 'Order case or serial number',
    court: 'Court',
    date: 'Date',
    courtOrder: 'Court order',
    siblingCourtOrders: 'Sibling with court orders',
    siblingName: 'Sibling name',
    familyCourtName: 'Family court name',
    applicantDocuments: "Applicant's documents",
    childDocuments: "Child's documents",
  };

  const enContent = {
    section: 'Review your application',
    title: 'Review your answers',
    change: 'Change',
    submitApplication: 'Submit your application',
    checkInfoBeforeSubmit:
      'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing.',
    continue: 'Continue',
    applyingWith: {
      [ApplyingWith.ALONE]: "I'm applying on my own",
      [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner",
      [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner",
    },
    gender: {
      [Gender.MALE]: 'Male',
      [Gender.FEMALE]: 'Female',
      [Gender.INTERSEX]: 'Other',
    },
    yesNoNotsure: {
      [YesNoNotsure.YES]: 'Yes',
      [YesNoNotsure.NO]: 'No',
      [YesNoNotsure.NOT_SURE]: 'Not sure',
    },
    language: content.language,
    sectionTitles,
    keys,
    errors: {
      dateChildMovedIn: {
        lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
      },
    },
  };

  const userCase = content.userCase!;

  return {
    ...enContent,
    sections: [
      applicationSummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase, 1),
      socialWorkerSummaryList(enContent, userCase),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
      ...(userCase.applyingWith !== ApplyingWith.ALONE
        ? [applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT2)]
        : []),
      childrenSummaryList(enContent, userCase),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_MOTHER),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_FATHER),
      otherParentSummaryList(enContent, userCase),
      childrenPlacementOrderSummaryList(enContent, userCase),
      siblingCourtOrderSummaryList(enContent, userCase),
      familyCourtSummaryList(enContent),
    ],
  };
};

const cy = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  submitApplication: 'Submit your application (in welsh)',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing. (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'You can only submit 10 weeks after the date the child started living continuously with you (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    dateChildMovedIn: { type: 'hidden', hidden: true },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
