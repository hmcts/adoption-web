import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, DocumentType, Gender, YesNoNotsure } from '../../../app/case/definition';
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
  uploadedDocumentSummaryList,
} from './utils';

export const enContent = {
  section: 'Review your application',
  title: 'Review your answers',
  change: 'Change',
  reason: 'Reason',
  submitApplication: 'Check your application',
  checkInfoBeforeSubmit:
    'Check all the information you have provided carefully. The next step is to sign a statement of truth declaring that the information provided is correct. Once this is signed and payment has been taken, your application will be submitted to the court.',
  applyingWith: {
    [ApplyingWith.ALONE]: "I'm applying on my own",
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner",
    [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner",
  },
  gender: {
    [Gender.MALE]: 'Male',
    [Gender.FEMALE]: 'Female',
    [Gender.OTHER]: 'Other',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Yes',
    [YesNoNotsure.NO]: 'No',
    [YesNoNotsure.NOT_SURE]: 'Not sure',
  },
  documentTypes: {
    [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE]: 'Birth or adoption certificate',
    [DocumentType.DEATH_CERTIFICATE]: 'Death certiticate',
  },
  sectionTitles: {
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
  },
  keys: {
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
    siblingOrHalfSibling: 'Child siblings or half siblings',
    siblingCourtOrders: 'Sibling court orders',
    siblingName: 'Sibling name',
    familyCourtName: 'Family court name',
    uploadedDocuments: 'Uploaded documents',
    documentsNotUploaded: 'Documents not uploaded',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
    },
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      applicationSummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase, 1),
      socialWorkerSummaryList(enContent, userCase),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT2),
      childrenSummaryList(enContent, userCase),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_MOTHER),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_FATHER),
      otherParentSummaryList(enContent, userCase),
      childrenPlacementOrderSummaryList(enContent, userCase),
      siblingCourtOrderSummaryList(enContent, userCase),
      familyCourtSummaryList(enContent, userCase),
      uploadedDocumentSummaryList(enContent, userCase),
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Review your application (in welsh)',
  title: 'Review your answers (in welsh)',
  change: 'Change (in welsh)',
  reason: 'Reason (in welsh)',
  submitApplication: 'Check your application (in welsh)',
  checkInfoBeforeSubmit:
    'Check all the information you have provided carefully. The next step is to sign a statement of truth declaring that the information provided is correct. Once this is signed and payment has been taken, your application will be submitted to the court. (in welsh)',
  applyingWith: {
    [ApplyingWith.ALONE]: "I'm applying on my own (in welsh)",
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner (in welsh)",
    [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  },
  gender: {
    [Gender.MALE]: 'Male (in welsh)',
    [Gender.FEMALE]: 'Female (in welsh)',
    [Gender.OTHER]: 'Other (in welsh)',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Yes (in welsh)',
    [YesNoNotsure.NO]: 'No (in welsh)',
    [YesNoNotsure.NOT_SURE]: 'Not sure (in welsh)',
  },
  documentTypes: {
    [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE]: 'Birth or adoption certificate (in welsh)',
    [DocumentType.DEATH_CERTIFICATE]: 'Death certiticate (in welsh)',
  },
  sectionTitles: {
    applicationDetails: 'Application details (in welsh)',
    adoptionagencyOrLA: 'Adoption agency or local authority details (in welsh)',
    additionalAoptionagencyOrLA: 'Additional adoption agency or local authority details (in welsh)',
    socialWorkerDetails: "Child's social worker details (in welsh)",
    applicantDetails: "Applicant's details (in welsh)",
    firstApplicantDetails: "First applicant's details (in welsh)",
    secondApplicantDetails: "Second applicant's details (in welsh)",
    childDetails: "Child's details (in welsh)",
    birthMotherDetails: "Birth mother's details (in welsh)",
    birthFatherDetails: "Birth father's details (in welsh)",
    otherParentDetails: "Other parent's details (in welsh)",
    childPlacementAndCourtOrders: "Child's placement and court orders (in welsh)",
    siblingCourtOrders: 'Sibling court orders (in welsh)',
    familyCourtDetails: 'Family court details (in welsh)',
    uploadedDocuments: 'Uploaded documents (in welsh)',
  },
  keys: {
    noOfApplicants: 'Number of applicants (in welsh)',
    dateChildMovedIn: 'Date child moved in (in welsh)',
    name: 'Name (in welsh)',
    phoneNumber: 'Phone number (in welsh)',
    emailAddress: 'Email address (in welsh)',
    nameOfContact: 'Name of contact (in welsh)',
    emailOfContact: 'Email address of contact (in welsh)',
    teamEmailAddress: 'Team email address (in welsh)',
    additionalAdoptionAgency: 'Additional adoption agency (in welsh)',
    fullName: 'Full name (in welsh)',
    previousNames: 'Previous names (in welsh)',
    dateOfBirth: 'Date of birth (in welsh)',
    occupation: 'Occupation (in welsh)',
    address: 'Address (in welsh)',
    sexAtBirth: 'Sex at birth (in welsh)',
    nationality: 'Nationality (in welsh)',
    fullNameAfterAdoption: 'Full name after adoption (in welsh)',
    alive: 'Alive (in welsh)',
    addressKnown: 'Address known (in welsh)',
    nameOnBirthCertificate: 'Name on birth certificate (in welsh)',
    otherParent: 'Is there another person with parental responsibility? (in welsh)',
    placementOrder: 'Placement order (in welsh)',
    typeOfOrder: 'Type of order (in welsh)',
    orderNumber: 'Order case or serial number (in welsh)',
    court: 'Court (in welsh)',
    date: 'Date (in welsh)',
    courtOrder: 'Court order (in welsh)',
    siblingOrHalfSibling: 'Child siblings or half siblings (in welsh)',
    siblingCourtOrders: 'Sibling court orders (in welsh)',
    siblingName: 'Sibling name (in welsh)',
    familyCourtName: 'Family court name (in welsh)',
    uploadedDocuments: 'Uploaded documents (in welsh)',
    documentsNotUploaded: 'Documents not uploaded (in welsh)',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'You can only submit 10 weeks after the date the child started living continuously with you (in welsh)',
    },
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      applicationSummaryList(cyContent, userCase),
      adoptionAgencySummaryList(cyContent, userCase),
      adoptionAgencySummaryList(cyContent, userCase, 1),
      socialWorkerSummaryList(cyContent, userCase),
      applicantSummaryList(cyContent, userCase, FieldPrefix.APPLICANT1),
      applicantSummaryList(cyContent, userCase, FieldPrefix.APPLICANT2),
      childrenSummaryList(cyContent, userCase),
      birthParentSummaryList(cyContent, userCase, FieldPrefix.BIRTH_MOTHER),
      birthParentSummaryList(cyContent, userCase, FieldPrefix.BIRTH_FATHER),
      otherParentSummaryList(cyContent, userCase),
      childrenPlacementOrderSummaryList(cyContent, userCase),
      siblingCourtOrderSummaryList(cyContent, userCase),
      familyCourtSummaryList(cyContent, userCase),
      uploadedDocumentSummaryList(cyContent, userCase),
    ],
  };
};

export const form: FormContent = {
  fields: {
    dateChildMovedIn: { type: 'hidden', hidden: true },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
