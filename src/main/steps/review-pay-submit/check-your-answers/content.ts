/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, DocumentType, Gender, LanguagePreference, YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import {
  adoptionAgencySummaryList,
  applicantSocialWorkerSummaryList,
  applicantSummaryList,
  applicationSummaryList,
  childSocialWorkerSummaryList,
  childrenSummaryList,
  familyCourtSummaryList,
} from './utils';

export const enContent = {
  section: 'Review your application',
  title: 'Review your answers',
  change: 'Change',
  reason: 'Reason',
  submitApplication: 'Check your application',
  checkInfoBeforeSubmit:
    'Check all the information you have provided carefully. The next step is to sign a statement of truth declaring that the information provided is correct. Once this is signed payment will be taken. If you are applying to adopt more than one child, payment will only be taken once.',
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
  languagePreference: {
    [LanguagePreference.ENGLISH]: 'English',
    [LanguagePreference.WELSH]: 'Welsh',
  },
  sectionTitles: {
    applicationDetails: 'Application details',
    adoptionagencyOrLA: 'Local authority details',
    additionalAoptionagencyOrLA: 'Adoption agency or local authority details',
    childSocialWorkerDetails: "Child's social worker details",
    applicantSocialWorkerDetails: 'Your social worker details',
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
  visuallyHiddenTexts: {
    fullName: "Child's full name",
    fullNameAfterAdoption: "Child's full name after adoption",
    dateOfBirth: "Child's date of birth",
    childSocialWorkerPhoneNumber: "child's social worker phone number",
    childSocialWorkerEmail: "child's social worker email address (if known)",
    applicantSocialWorkerPhoneNumber: 'Your social worker phone number',
    applicantSocialWorkerEmail: 'Your social worker email address (if known)',
    adopAgencyOrLaName: 'Adoption agency or local authority name',
    adopAgencyOrLaContactName: 'Adoption agency or local authority name of contact',
    adopAgencyOrLaPhoneNumber: 'Adoption agency or local authority phone number',
    adopAgencyAddress: 'Adoption agency or local authority address',
    adopAgencyOrLaContactEmail: 'Adoption agency or local authority email address',
  },
  keys: {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
    name: 'Name',
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
    nameOfContact: 'Name of contact',
    emailOfContact: 'Email address of contact',
    additionalAdoptionAgency: 'Additional adoption agency',
    fullName: 'Full name',
    previousNames: 'Previous names',
    dateOfBirth: 'Date of birth',
    occupation: 'Occupation',
    extraSupport: 'Extra support',
    extraSupportDetails: 'Details',
    address: 'Address',
    contactDetailsConsent: 'Court orders served by email',
    languagePreference: 'Emails and documents language',
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
    siblingRelation: 'Sibling relation',
    placementCourtName: 'Placement court name',
    familyCourtName: 'Family court name',
    uploadedDocuments: 'Uploaded documents',
    documentsNotUploaded: 'Documents not uploaded',
    childSocialWorkerName: "Name of child's social worker",
    emailAddressIfKnown: 'Email address (if known)',
    childLocalAuthority: "Child's local authority",
    childLocalAuthorityEmail: 'Local authority email address',
    applicantSocialWorkerName: 'Name of your social worker',
    applicantLocalAuthority: 'Name of local authority',
    applicantLocalAuthorityEmail: 'Your local authority email address',
    firstApplicantvisPrefix: "First applicant's ",
    secondApplicantvisPrefix: "Second applicant's ",
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
      childrenSummaryList(enContent, userCase),
      childSocialWorkerSummaryList(enContent, userCase),
      applicantSocialWorkerSummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase),
      familyCourtSummaryList(enContent, userCase),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT2),
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
    'Gwiriwch yr holl wybodaeth rydych wedi’i darparu yn ofalus. Y cam nesaf yw arwyddo datganiad gwirionedd i ddatgan bod yr wybodaeth a roddwyd yn gywir. Unwaith y byddwch wedi’i lofnodi fe gymerir y taliad. Os ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn, dim ond unwaith y cymerir y taliad.',
  applyingWith: {
    [ApplyingWith.ALONE]: 'Rwy’n gwneud cais ar fy mhen fy hun',
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: 'Rwy’n gwneud cais gyda fy mhriod neu fy mhartner sifil',
    [ApplyingWith.WITH_SOME_ONE_ELSE]: 'Rwy’n gwneud cais gyda rhywun nad ydynt yn briod neu’n bartner sifil i mi',
  },
  gender: {
    [Gender.MALE]: 'Gwryw',
    [Gender.FEMALE]: 'Benyw',
    [Gender.OTHER]: 'Arall',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Ydy',
    [YesNoNotsure.NO]: 'Nac ydy',
    [YesNoNotsure.NOT_SURE]: 'Ddim yn siŵr',
  },
  documentTypes: {
    [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE]: 'Tystysgrif geni neu dystysgrif mabwysiadu',
    [DocumentType.DEATH_CERTIFICATE]: 'Tystysgrif marwolaeth',
  },
  languagePreference: {
    [LanguagePreference.ENGLISH]: 'Saesneg',
    [LanguagePreference.WELSH]: 'Cymraeg',
  },
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
    adoptionagencyOrLA: 'Manylion yr awdurdod lleol',
    additionalAoptionagencyOrLA: 'Yr asiantaeth fabwysiadu neu fanylion yr awdurdod lleol',
    childSocialWorkerDetails: 'Manylion gweithiwr cymdeithasol y plentyn',
    applicantSocialWorkerDetails: 'Manylion eich gweithiwr cymdeithasol',
    applicantDetails: 'Manylion y ceisydd',
    firstApplicantDetails: 'Manylion y ceisydd cyntaf',
    secondApplicantDetails: 'Manylion yr ail geisydd',
    childDetails: 'Manylion y plentyn',
    birthMotherDetails: 'Manylion y fam enedigol',
    birthFatherDetails: 'Manylion y tad genedigol',
    otherParentDetails: 'Manylion y rhiant arall',
    childPlacementAndCourtOrders: 'Lleoliad y plentyn a gorchmynion llys',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    familyCourtDetails: 'Manylion y llys teulu',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
  },
  visuallyHiddenTexts: {
    fullName: 'Enw llawn yplentyn',
    fullNameAfterAdoption: 'Enw llawn ar ôl mabwysiadu',
    dateOfBirth: 'Dyddiad geni plentyn ',
    childSocialWorkerPhoneNumber: 'gweithiwr cymdeithasol plentyn rhif ffôn',
    childSocialWorkerEmail: "gweithiwr cymdeithasol plentyn cyfeiriad e-bost (os yw'n hysbys)	",
    applicantSocialWorkerPhoneNumber: 'eich gweithiwr cymdeithasol rhif ffôn',
    applicantSocialWorkerEmail: "eich gweithiwr cymdeithasol cyfeiriad e-bost (os yw'n hysbys)",
    adopAgencyOrLaName: 'asiantaeth fabwysiadu neu awdurdod lleol enw',
    adopAgencyOrLaContactName: 'asiantaeth fabwysiadu neu awdurdod lleol enw’r unigolyn cyswllt',
    adopAgencyOrLaPhoneNumber: 'asiantaeth fabwysiadu neu awdurdod lleol rhif ffôn',
    adopAgencyAddress: 'asiantaeth fabwysiadu neu awdurdod lleol cyfeiriad',
    adopAgencyOrLaContactEmail: 'asiantaeth fabwysiadu neu awdurdod lleol cyfeiriad e-bost',
  },
  keys: {
    noOfApplicants: 'Nifer y ceiswyr',
    dateChildMovedIn: 'Dyddiad wnaeth y plentyn symud i fyw gyda chi',
    name: 'Enw',
    phoneNumber: 'Rhif ffôn',
    emailAddress: 'Cyfeiriad e-bost',
    nameOfContact: 'Enw’r unigolyn cyswllt',
    emailOfContact: 'Cyfeiriad e-bost yr unigolyn cyswllt',
    childLocalAuthority: 'Awdurdod lleol y plentyn',
    additionalAdoptionAgency: 'Asiantaeth fabwysiadu ychwanegol',
    fullName: 'Enw llawn',
    previousNames: 'Enwau blaenorol',
    dateOfBirth: 'Dyddiad geni',
    occupation: 'Galwedigaeth',
    extraSupport: 'Cefnogaeth ychwanegol',
    extraSupportDetails: 'Manylion',
    address: 'Cyfeiriad',
    contactDetailsConsent: 'Gorchmynion llys a gyflwynir drwy e-bost',
    languagePreference: 'Negeseuon e-bost a iaith y dogfennau',
    sexAtBirth: 'Rhyw pan anwyd',
    nationality: 'Cenedligrwydd',
    fullNameAfterAdoption: 'Enw llawn ar ôl mabwysiadu',
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
    siblingRelation: 'Perthynas sy’n frawd/chwaer',
    placementCourtName: 'Enw’r llys sy’n lleoli’r plentyn',
    familyCourtName: 'Enw’r llys teulu',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
    documentsNotUploaded: 'Dogfennau heb eu llwytho',
    childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
    applicantLocalAuthorityEmail: 'Cyfeiriad e-bost eich awdurdod lleol',
    applicantSocialWorkerName: 'Enw eich gweithiwr cymdeithasol',
    applicantLocalAuthority: "Enw'r awdurdod lleol",
    childSocialWorkerName: 'Enw gweithiwr cymdeithasol y plentyn',
    emailAddressIfKnown: "Cyfeiriad e-bost (os yw'n hysbys)",
    firstApplicantvisPrefix: 'ceisydd cyntaf ',
    secondApplicantvisPrefix: 'ail geisydd',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'Rhaid i chi aros nes bydd 10 wythnos wedi mynd heibio ers i’r plentyn ddechrau byw gyda chi’n barhaus cyn cyflwyno eich cais',
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
      childrenSummaryList(cyContent, userCase),
      childSocialWorkerSummaryList(cyContent, userCase),
      applicantSocialWorkerSummaryList(cyContent, userCase),
      adoptionAgencySummaryList(cyContent, userCase),
      familyCourtSummaryList(cyContent, userCase),
      applicantSummaryList(cyContent, userCase, FieldPrefix.APPLICANT1),
      applicantSummaryList(cyContent, userCase, FieldPrefix.APPLICANT2),
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
