import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import {
  ApplyingWith,
  DocumentType,
  Gender,
  LanguagePreference,
  SiblingPOType,
  SiblingRelationships,
  YesNoNotsure,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Check your answers',
  change: 'Change',
  reason: 'Reason',
  submitApplication: 'Check your answers',
  checkInfoBeforeSubmit1:
    'Check all the information you have provided. If you need to edit any of the answers, select the change link at the end of the relevant answer.',
  checkInfoBeforeSubmit2: 'Once you are happy with your answers, you can submit the application to the court.',
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
  siblingRelationships: {
    [SiblingRelationships.SISTER]: 'Sister',
    [SiblingRelationships.HALF_SISTER]: 'Half-sister',
    [SiblingRelationships.STEP_SISTER]: 'Step-sister',
    [SiblingRelationships.BROTHER]: 'Brother',
    [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
    [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
  },
  siblingPlacementOrderType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
    [SiblingPOType.CARE_ORDER]: 'Care order',
    [SiblingPOType.CONTACT_ORDER]: 'Contact order',
    [SiblingPOType.FREEING_ORDER]: 'Freeing order',
    [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
    [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
    [SiblingPOType.OTHER]: 'Other',
  },
  sectionTitles: {
    childDetails: "Child's details",
    birthMotherDetails: "Birth mother's details",
    birthFatherDetails: "Birth father's details",
    otherParentDetails: "Other parent's details",
    childPlacementAndCourtOrders: "Child's placement and court orders",
    siblingCourtOrders: 'Sibling court orders',
    uploadedDocuments: 'Uploaded documents',
  },
  keys: {
    sexAtBirth: 'Sex at birth',
    nationality: 'Nationality',
    fullName: 'Full name',
    alive: 'Alive',
    occupation: 'Occupation',
    addressKnown: 'Address known',
    address: 'Address',
    nameOnBirthCertificate: 'Name on birth certificate',
    addressConfirmedDate: 'Last date this address was confirmed',
    otherParent: 'Is there another person with parental responsibility?',
    placementOrder: 'Placement order',
    courtOrder: 'Court order',
    typeOfOrder: 'Type of order',
    orderNumber: 'Order case or serial number',
    court: 'Court',
    date: 'Date',
    siblingCourtOrders: 'Sibling court orders',
    siblingOrHalfSibling: 'Siblings or half siblings with court orders',
    siblingRelation: 'Relationship',
    uploadedDocuments: 'Uploaded documents',
    documentsNotUploaded: 'Documents not uploaded',
    caseRefNumber: 'Court case reference number',
    dateOfBirth: 'Date of birth',
    servedWith: 'Any document or court orders to be sent?',
    NotServedWithReason: 'Reason',
  },
};

const cyContent: typeof enContent = {
  title: 'Adolygu eich atebion',
  change: 'Newid',
  reason: 'Rheswm',
  submitApplication: 'Gwirio eich cais',
  checkInfoBeforeSubmit1:
    'Gwiriwch yr holl wybodaeth yr ydych wedi’i rhoi yn ofalus. Y cam nesaf yw arwyddo’r datganiad gwirionedd i ddatgan bod yr wybodaeth a roddwyd yn gywir. Unwaith y bydd wedi’i arwyddo a’r taliad wedi’i wneud, bydd eich cais yn cael ei gyflwyno i’r llys.',
  checkInfoBeforeSubmit2:
    'Gwiriwch yr holl wybodaeth yr ydych wedi’i rhoi yn ofalus. Y cam nesaf yw arwyddo’r datganiad gwirionedd i ddatgan bod yr wybodaeth a roddwyd yn gywir. Unwaith y bydd wedi’i arwyddo a’r taliad wedi’i wneud, bydd eich cais yn cael ei gyflwyno i’r llys.',
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
  siblingRelationships: {
    [SiblingRelationships.SISTER]: 'Chwaer',
    [SiblingRelationships.HALF_SISTER]: 'Hanner chwaer',
    [SiblingRelationships.STEP_SISTER]: 'Llyschwaer',
    [SiblingRelationships.BROTHER]: 'Brawd',
    [SiblingRelationships.HALF_BROTHER]: 'Hanner brawd',
    [SiblingRelationships.STEP_BROTHER]: 'Llysfrawd',
  },
  siblingPlacementOrderType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Gorchymyn Mabwysiadu',
    [SiblingPOType.CARE_ORDER]: 'Gorchymyn Gofal',
    [SiblingPOType.CONTACT_ORDER]: 'Gorchymyn Cyswllt',
    [SiblingPOType.FREEING_ORDER]: 'Gorchymyn Rhyddhau',
    [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
    [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
    [SiblingPOType.OTHER]: 'Other',
  },
  sectionTitles: {
    childDetails: 'Manylion y plentyn',
    birthMotherDetails: 'Manylion y fam fiolegol',
    birthFatherDetails: 'Manylion y tad biolegol',
    otherParentDetails: 'Manylion y rhiant arall',
    childPlacementAndCourtOrders: 'Lleoliad y plentyn a gorchmynion llys',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
  },
  keys: {
    sexAtBirth: 'Rhyw pan anwyd',
    nationality: 'Cenedligrwydd',
    nameOnBirthCertificate: 'Enw ar y dystysgrif geni',
    alive: 'Yn fyw',
    fullName: 'Enw llawn',
    occupation: 'Galwedigaeth',
    addressKnown: 'Cyfeiriad yn hysbys',
    address: 'Cyfeiriad',
    addressConfirmedDate: 'Dyddiad olaf cafodd y cyfeiriad hwn ei gadarnhau',
    otherParent: 'A oes gan unigolyn arall gyfrifoldeb rhiant?',
    placementOrder: 'Gorchymyn Lleoli',
    courtOrder: 'Gorchymyn llys',
    typeOfOrder: 'Math o orchymyn',
    orderNumber: 'Rhif y gorchymyn, yr achos neu rif cyfresol',
    court: 'Llys',
    date: 'Dyddiad',
    siblingOrHalfSibling: 'Brodyr/chwiorydd neu hanner brodyr/chwiorydd y plentyn',
    siblingRelation: 'Perthynas sy’n frawd/chwaer',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
    documentsNotUploaded: 'Dogfennau heb eu llwytho',
    caseRefNumber: 'Cyfeirnod yr achos llys',
    dateOfBirth: 'Dyddiad geni',
    servedWith: 'A ddylid anfon unrhyw ddogfennau neu orchmynion llys? ',
    NotServedWithReason: 'Rheswm',
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('check-your-answer > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
  } as unknown as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () =>
      generateContent({
        ...commonContent,
        userCase: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
        language: 'cy',
      })
    );
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  /* test('should contain save-as-draft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft!.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  }); */
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
