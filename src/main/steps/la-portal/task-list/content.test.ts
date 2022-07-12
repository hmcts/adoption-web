import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { ApplyingWith, SectionStatus, YesNoNotsure } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.NOT_STARTED]: 'Not Started',
    [SectionStatus.CAN_NOT_START_YET]: 'Cannot start yet',
  },
  sectionTitles: {
    applicationDetails: 'Add application details',
  },
  taskListItems: {
    birthCertificate: 'Birth certificate details',
    birthMother: 'Birth mother details',
    birthFather: 'Birth father details',
    otherParent: 'Other person with parental responsibility',
    placementAndCourtOrders: 'Placement and court orders',
    siblingCourtOrders: 'Sibling court order details',
    uploadDocuments: 'Upload documents',
    checkYourAnswers: 'Check your answers',
  },
};

const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.NOT_STARTED]: 'Heb Ddechrau',
    [SectionStatus.CAN_NOT_START_YET]: 'Methu dechrau eto',
  },
  sectionTitles: {
    applicationDetails: 'Ychwanegu manylion y cais',
  },
  taskListItems: {
    birthCertificate: 'Manylion y dystysgrif geni',
    birthMother: 'Manylion y fam fiolegol',
    birthFather: 'Manylion y tad biolegol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    uploadDocuments: 'Llwytho dogfennau',
    checkYourAnswers: 'Check your answers (in welsh)',
  },
};

describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              id: 'birth-certificate-details',
              text: 'Birth certificate details',
              status: 'COMPLETED',
              href: '/la-portal/child/sex-at-birth',
            },
            {
              id: 'birth-mother-details',
              text: 'Birth mother details',
              status: 'COMPLETED',
              href: '/la-portal/birth-mother/full-name',
            },
            {
              id: 'birth-father-details',
              text: 'Birth father details',
              status: 'COMPLETED',
              href: '/la-portal/birth-father/name-on-certificate',
            },
            {
              id: 'other-parent-details',
              text: 'Other person with parental responsibility',
              status: 'COMPLETED',
              href: '/la-portal/other-parent/exists',
            },
            {
              id: 'placement-and-court-order-details',
              text: 'Placement and court orders',
              status: 'COMPLETED',
              href: '/la-portal/child/placement-order-summary',
            },
            { id: 'sibling-court-order-details', text: 'Sibling court order details', status: 'COMPLETED', href: '' },
            { id: 'upload-documents', text: 'Upload documents', status: 'COMPLETED', href: '' },
            {
              id: 'check-your-answers',
              text: 'Check your answers',
              status: 'NOT_STARTED',
              href: '/la-portal/review-pay-submit/check-your-answers',
            },
          ],
        },
      ],
    },
    {
      userCase: {
        ...mockUserCase,
        applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE,
        placementOrders: undefined,
        addAnotherPlacementOrder: undefined,
        hasSiblings: YesNoNotsure.NO,
        applicant1UploadedFiles: undefined,
        applicant1CannotUpload: undefined,
        findFamilyCourt: undefined,
        familyCourtName: undefined,
      },
      expected: [
        {
          items: [
            {
              id: 'birth-certificate-details',
              text: 'Birth certificate details',
              status: 'COMPLETED',
              href: '/la-portal/child/sex-at-birth',
            },
            {
              id: 'birth-mother-details',
              text: 'Birth mother details',
              status: 'COMPLETED',
              href: '/la-portal/birth-mother/full-name',
            },
            {
              id: 'birth-father-details',
              text: 'Birth father details',
              status: 'COMPLETED',
              href: '/la-portal/birth-father/name-on-certificate',
            },
            {
              id: 'other-parent-details',
              text: 'Other person with parental responsibility',
              status: 'COMPLETED',
              href: '/la-portal/other-parent/exists',
            },
            {
              id: 'placement-and-court-order-details',
              text: 'Placement and court orders',
              status: 'NOT_STARTED',
              href: '/la-portal/child/placement-order-number',
            },
            { id: 'sibling-court-order-details', text: 'Sibling court order details', status: 'COMPLETED', href: '' },
            { id: 'upload-documents', text: 'Upload documents', status: 'NOT_STARTED', href: '' },
            {
              id: 'check-your-answers',
              text: 'Check your answers',
              status: 'CAN_NOT_START_YET',
              href: '/la-portal/task-list',
            },
          ],
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
