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
  section: 'Adolygu eich cais',
  title: 'Adolygu eich atebion',
  change: 'Newid',
  reason: 'Rheswm',
  submitApplication: 'Gwirio eich cais',
  checkInfoBeforeSubmit:
    'Gwiriwch yr holl wybodaeth yr ydych wedi???i rhoi yn ofalus. Y cam nesaf yw arwyddo???r datganiad gwirionedd i ddatgan bod yr wybodaeth a roddwyd yn gywir. Unwaith y bydd wedi???i arwyddo a???r taliad wedi???i wneud, bydd eich cais yn cael ei gyflwyno i???r llys.',
  applyingWith: {
    [ApplyingWith.ALONE]: 'Rwy???n gwneud cais ar fy mhen fy hun',
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: 'Rwy???n gwneud cais gyda fy mhriod neu fy mhartner sifil',
    [ApplyingWith.WITH_SOME_ONE_ELSE]: 'Rwy???n gwneud cais gyda rhywun nad ydynt yn briod neu???n bartner sifil i mi',
  },
  gender: {
    [Gender.MALE]: 'Gwryw',
    [Gender.FEMALE]: 'Benyw',
    [Gender.OTHER]: 'Arall',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Ydy',
    [YesNoNotsure.NO]: 'Nac ydy',
    [YesNoNotsure.NOT_SURE]: 'Ddim yn si??r',
  },
  documentTypes: {
    [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE]: 'Tystysgrif geni neu dystysgrif mabwysiadu',
    [DocumentType.DEATH_CERTIFICATE]: 'Tystysgrif marwolaeth',
  },
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
    adoptionagencyOrLA: 'Manylion yr asiantaeth fabwysiadu neu???r awdurdod lleol',
    additionalAoptionagencyOrLA: 'Manylion ychwanegol yr asiantaeth fabwysiadu neu???r awdurdod lleol',
    socialWorkerDetails: 'Manylion gweithiwr cymdeithasol y plentyn',
    applicantDetails: 'Manylion y ceisydd',
    firstApplicantDetails: 'Manylion y ceisydd cyntaf',
    secondApplicantDetails: 'Manylion yr ail geisydd',
    childDetails: 'Manylion y plenty',
    birthMotherDetails: 'Manylion y fam fiolegol',
    birthFatherDetails: 'Manylion y tad biolegol',
    otherParentDetails: 'Manylion y rhiant arall',
    childPlacementAndCourtOrders: 'Lleoliad y plentyn a gorchmynion llys',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    familyCourtDetails: 'Manylion y llys teulu',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
  },
  keys: {
    noOfApplicants: 'Nifer y ceiswyr',
    dateChildMovedIn: 'Dyddiad wnaeth y plentyn symud i fyw gyda chi',
    name: 'Enw',
    phoneNumber: 'Rhif ff??n',
    emailAddress: 'Cyfeiriad e-bost',
    nameOfContact: 'Enw???r unigolyn cyswllt',
    emailOfContact: 'Cyfeiriad e-bost yr unigolyn cyswllt',
    teamEmailAddress: 'Cyfeiriad e-bost y t??m',
    additionalAdoptionAgency: 'Asiantaeth fabwysiadu ychwanegol',
    fullName: 'Enw llawn',
    previousNames: 'Enwau blaenorol',
    dateOfBirth: 'Dyddiad geni',
    occupation: 'Galwedigaeth',
    address: 'Cyfeiriad',
    sexAtBirth: 'Rhyw pan anwyd',
    nationality: 'Cenedligrwydd',
    fullNameAfterAdoption: 'Enw llawn ar ??l mabwysiadu',
    alive: 'Yn fyw',
    addressKnown: 'Cyfeiriad yn hysbys',
    nameOnBirthCertificate: 'Enw ar y dystysgrif geni',
    otherParent: 'A oes gan unigolyn arall gyfrifoldeb rhiant?',
    placementOrder: 'Gorchymyn Lleoli',
    typeOfOrder: 'Math o orchymyn',
    orderNumber: 'Rhif y gorchymyn, yr achos neu rif cyfresol',
    court: 'Llys',
    date: 'Dyddiad',
    courtOrder: 'Gorchymyn llys',
    siblingOrHalfSibling: 'Brodyr/chwiorydd neu hanner brodyr/chwiorydd y plentyn',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    siblingName: 'Enw llawn y brawd/chwaer',
    familyCourtName: 'Enw???r llys teulu',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
    documentsNotUploaded: 'Dogfennau heb eu llwytho',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'Rhaid i chi aros nes bydd 10 wythnos wedi mynd heibio ers i???r plentyn ddechrau byw gyda chi???n barhaus cyn cyflwyno eich cais',
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
