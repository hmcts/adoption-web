import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import {
  ApplyingWith,
  DocumentType,
  Gender,
  LanguagePreference,
  ResponsibilityReasons,
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
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
    [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
    [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
    [SiblingPOType.OTHER]: 'Other',
  },
  responsibilityReasons: {
    [ResponsibilityReasons.BIRTH_CERTIFICATE]: 'Birth certificate',
    [ResponsibilityReasons.COURT_ORDER]: 'Court order',
    [ResponsibilityReasons.RESPONSIBILITY_ORDER]: 'Parental responsibility order',
    [ResponsibilityReasons.RESPONSIBILITY_AGREEMENT]: 'Parental responsibility agreement',
    [ResponsibilityReasons.REMOVED_BY_COURT]: 'Parental responsibility removed by court',
    [ResponsibilityReasons.NEVER_OBTAINED]: 'Parental responsibility never obtained',
    [ResponsibilityReasons.OTHER]: 'Other',
  },
  sectionTitles: {
    childDetails: "Child's details",
    birthMotherDetails: "Birth mother's details",
    birthFatherDetails: "Birth father's details",
    otherParentDetails: "Other person's details",
    childPlacementAndCourtOrders: "Child's placement and court orders",
    siblingCourtOrders: 'Sibling court orders',
    uploadedDocuments: 'Uploaded documents',
  },
  visuallyHiddenTexts: {
    childrenSexAtBirth: "Child's sex at birth",
    childrenNationality: "Child's nationality",
    birthMotherFullName: 'Birth mother full name',
    birthMotherStillAlive: 'Birth mother alive',
    birthMotherNationality: 'Birth mother nationality',
    birthMotherOccupation: 'Birth mother occupation',
    birthMotherAddressKnown: 'Birth mother address known',
    birthMotherAddress: 'Birth mother address',
    birthMotherServedWith: 'Any document or court orders to be sent by birth mother?',
    birthMotherLastAddressDate: 'Last date this address was confirmed by birth mother',
    birthFatherNameOnCertificate: 'Birth father name on birth certificate',
    birthFatherResponsibilityReason: 'Birth father parental responsibility reason',
    birthFatherFullName: 'Birth father full name',
    birthFatherStillAlive: 'Birth father alive',
    birthFatherNationality: 'Birth father nationality',
    birthFatherOccupation: 'Birth father occupation',
    birthFatherAddressKnown: 'Birth father address known',
    birthFatherAddress: 'Birth father address',
    birthFatherServedWith: 'Any document or court orders to be sent by birth father?',
    birthFatherLastAddressDate: 'Last date this address was confirmed by birth father',
    otherParentFullName: 'Other parent full name',
    otherParentResponsibilityReason: 'Other person parental responsibility granted',
    otherParentAddressKnown: 'Other parent address known',
    otherParentAddress: 'Other parent address',
    otherParentLastAddressDate: 'Last date other parent address was confirmed',
    otherParentServedWith: 'Any document or court orders to be sent by other parent?',
    placementOrderDate: 'Placement order date',
    siblingRelation: 'Relationship with child',
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
    responsibility: 'Does birth father has parental responsibility?',
    otherParentResponsibility: 'Parental responsibility granted',
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
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
    [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
    [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
    [SiblingPOType.OTHER]: 'Other',
  },
  responsibilityReasons: {
    [ResponsibilityReasons.BIRTH_CERTIFICATE]: 'Gorchymyn llys',
    [ResponsibilityReasons.COURT_ORDER]: 'Tystysgrif geni',
    [ResponsibilityReasons.RESPONSIBILITY_ORDER]: 'Gorchymyn cyfrifoldeb rhiant',
    [ResponsibilityReasons.RESPONSIBILITY_AGREEMENT]: 'Cytundeb cyfrifoldeb rhiant',
    [ResponsibilityReasons.REMOVED_BY_COURT]: 'Cyfrifoldeb rhiant wedi ei ddileu gan y llys',
    [ResponsibilityReasons.NEVER_OBTAINED]: 'Ni chafwyd cyfrifoldeb rhiant erioed',
    [ResponsibilityReasons.OTHER]: 'Arall',
  },
  sectionTitles: {
    childDetails: 'Manylion y plentyn',
    birthMotherDetails: 'Manylion y fam fiolegol',
    birthFatherDetails: 'Manylion y tad biolegol',
    otherParentDetails: 'Manylion person arall',
    childPlacementAndCourtOrders: 'Lleoliad y plentyn a gorchmynion llys',
    siblingCourtOrders: 'Gorchmynion llys brodyr/chwiorydd',
    uploadedDocuments: 'Dogfennau sydd wedi eu llwytho',
  },
  visuallyHiddenTexts: {
    childrenSexAtBirth: 'Plentynrhyw pan anwyd',
    childrenNationality: "Plentyn'cenedligrwydd",
    birthMotherFullName: 'Fam fiolegol enw llawn',
    birthMotherStillAlive: 'Fam fiolegol Yn fyw',
    birthMotherNationality: 'Fam fiolegol Cenedligrwydd',
    birthMotherOccupation: 'Fam fiolegolgalwedigaeth',
    birthMotherAddressKnown: 'Fam fiolegol cyfeiriad yn hysbys',
    birthMotherAddress: 'Fam fiolegol cyfeiriad',
    birthMotherServedWith: 'A ddylai unrhyw ddogfennau neu orchmynion llys gael eu hanfon gan fam fiolegol?',
    birthMotherLastAddressDate: 'Dyddiad olaf cafodd y cyfeiriad hwn ei gadarnhau gan fam fiolegol',
    birthFatherNameOnCertificate: 'Tad biolegol enw ar y dystysgrif geni	',
    birthFatherResponsibilityReason: 'Tad biolegol parental responsibility reason',
    birthFatherFullName: 'Tad biolegol enw llawn',
    birthFatherStillAlive: 'Tad biolegol Yn fyw	',
    birthFatherNationality: 'Tad biolegol Cenedligrwydd',
    birthFatherOccupation: 'Tad biolegol lgalwedigaeth',
    birthFatherAddressKnown: 'Tad biolegol cyfeiriad yn hysbys',
    birthFatherAddress: 'Tad biolegol cyfeiriad',
    birthFatherServedWith: 'Any document or court orders to be sent by Tad biolegol?',
    birthFatherLastAddressDate: 'Last date this address was confirmed by Tad biolegol',
    otherParentFullName: 'Person arall enw llawn',
    otherParentResponsibilityReason: 'Person arall caniatawyd cyfrifoldeb rhiant',
    otherParentAddressKnown: 'Person arall cyfeiriad yn hysbys',
    otherParentAddress: 'Person arall cyfeiriad',
    otherParentLastAddressDate: 'Dyddiad olaf cafodd y Person arall gadarnhau',
    otherParentServedWith: 'A ddylai unrhyw ddogfennau neu orchmynion llys gael eu hanfon gan Person arall?',
    placementOrderDate: 'Lleoliad y plentyn dyddiad',
    siblingRelation: 'Perthynas sy’n frawd/chwaer with child',
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
    responsibility: 'A oes gan y tad genedigol gyfrifoldeb rhiant?',
    otherParentResponsibility: 'caniatawyd cyfrifoldeb rhiant',
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
