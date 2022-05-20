import languageAssertions from '../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { ApplyingWith, SectionStatus, YesNoNotsure } from '../../app/case/definition';
import { CommonContent } from '../common/common.content';

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
    applicantDetails: "Add applicant's details",
    childDetails: "Add child's details",
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review, pay and submit',
  },
  taskListItems: {
    numberOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in with you',
    adoptionAgency: 'Adoption agency and social worker',
    firstApplicant: 'First applicant',
    secondApplicant: 'Second applicant',
    personalDetails: 'Your personal details',
    contactDetails: 'Your contact details',
    birthCertificate: 'Birth certificate details',
    childDetails: "Child's details",
    birthMother: 'Birth mother details',
    birthFather: 'Birth father details',
    otherParent: 'Other person with parental responsibility',
    placementAndCourtOrders: 'Placement and court orders',
    siblingCourtOrders: 'Sibling court order details',
    familyCourt: 'The family court details',
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review, pay and submit your application',
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
    applicantDetails: 'Ychwanegu manylion y ceisydd',
    childDetails: 'Ychwanegu manylion y plentyn',
    uploadDocuments: 'Llwytho dogfennau',
    reviewPayAndSubmit: 'Adolygu, talu a chyflwyno',
  },
  taskListItems: {
    numberOfApplicants: 'Nifer y ceiswyr',
    dateChildMovedIn: 'Dyddiad wnaeth y plentyn symud i fyw gyda chi',
    adoptionAgency: 'Asiantaeth fabwysiadu a gweithiwr cymdeithasol',
    firstApplicant: 'Ceisydd cyntaf',
    secondApplicant: 'Ail geisydd',
    personalDetails: 'Eich manylion personol',
    contactDetails: 'Eich manylion cyswllt',
    birthCertificate: 'Manylion y dystysgrif geni',
    childDetails: "Child's details (in welsh)",
    birthMother: 'Manylion y fam fiolegol',
    birthFather: 'Manylion y tad biolegol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    familyCourt: 'The family court details (in welsh)',
    uploadDocuments: 'Llwytho dogfennau',
    reviewPayAndSubmit: 'Adolygu, talu a chyflwyno eich cais',
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
          title: 'Add application details',
          items: [
            { id: 'applying-with', text: 'Number of applicants', status: 'COMPLETED', href: '/applying-with' },
            {
              id: 'date-child-moved-in',
              text: 'Date child moved in with you',
              status: 'COMPLETED',
              href: '/date-child-moved-in',
            },
            {
              id: 'adoption-certificate-details',
              text: "Child's details",
              status: 'COMPLETED',
              href: '/children/full-name-after-adoption',
            },
            {
              id: 'adoption-agency',
              text: 'Adoption agency and social worker',
              status: 'COMPLETED',
              href: '/children/local-authority',
            },
            {
              id: 'find-family-court',
              text: 'The family court details',
              status: 'COMPLETED',
              href: '/children/find-placement-order-court',
            },
          ],
        },
        {
          title: "Add applicant's details",
          items: [
            {
              id: 'applicant1-personal-details',
              text: 'Your personal details',
              status: 'COMPLETED',
              href: '/applicant1/full-name',
            },
            {
              id: 'applicant1-contact-details',
              text: 'Your contact details',
              status: 'COMPLETED',
              href: '/applicant1/address/lookup',
            },
          ],
        },
        {
          title: "Add child's details",
          items: [
            {
              id: 'children-birth-certificate-details',
              text: 'Birth certificate details',
              status: 'COMPLETED',
              href: '/children/full-name',
            },
            {
              id: 'birth-mother-details',
              text: 'Birth mother details',
              status: 'COMPLETED',
              href: '/birth-mother/full-name',
            },
            {
              id: 'birth-father',
              text: 'Birth father details',
              status: 'COMPLETED',
              href: '/birth-father/name-on-certificate',
            },
            {
              id: 'other-parent',
              text: 'Other person with parental responsibility',
              status: 'COMPLETED',
              href: '/other-parent/exists',
            },
            {
              id: 'children-placement-order-details',
              text: 'Placement and court orders',
              status: 'COMPLETED',
              href: '/children/placement-order-summary',
            },
            { id: 'sibling', text: 'Sibling court order details', status: 'COMPLETED', href: '/sibling/summary' },
          ],
        },
        {
          title: 'Upload documents',
          items: [
            {
              id: 'upload-your-documents',
              text: 'Upload documents',
              status: 'COMPLETED',
              href: '/upload-your-documents',
            },
          ],
        },
        {
          title: 'Review, pay and submit',
          items: [
            {
              id: 'review-pay-and-submit',
              text: 'Review, pay and submit your application',
              status: 'NOT_STARTED',
              href: '/review-pay-submit/equality',
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
            { href: '/applying-with', id: 'applying-with', status: 'IN_PROGRESS', text: 'Number of applicants' },
            {
              href: '/date-child-moved-in',
              id: 'date-child-moved-in',
              status: 'COMPLETED',
              text: 'Date child moved in with you',
            },
            {
              href: '/children/full-name-after-adoption',
              id: 'adoption-certificate-details',
              status: 'COMPLETED',
              text: "Child's details",
            },
            {
              href: '/children/local-authority',
              id: 'adoption-agency',
              status: 'COMPLETED',
              text: 'Adoption agency and social worker',
            },
            {
              href: '/children/find-placement-order-court',
              id: 'find-family-court',
              status: 'CAN_NOT_START_YET',
              text: 'The family court details',
            },
          ],
          title: 'Add application details',
        },
        {
          items: [
            { text: 'First applicant' },
            {
              href: '/applicant1/full-name',
              id: 'applicant1-personal-details',
              status: 'COMPLETED',
              text: 'Your personal details',
            },
            {
              href: '/applicant1/address/lookup',
              id: 'applicant1-contact-details',
              status: 'COMPLETED',
              text: 'Your contact details',
            },
            { text: 'Second applicant' },
            {
              href: '/applicant2/full-name',
              id: 'applicant2-personal-details',
              status: 'COMPLETED',
              text: 'Your personal details',
            },
            {
              href: '/applicant2/same-address',
              id: 'applicant2-contact-details',
              status: 'COMPLETED',
              text: 'Your contact details',
            },
          ],
          title: "Add applicant's details",
        },
        {
          items: [
            {
              href: '/children/full-name',
              id: 'children-birth-certificate-details',
              status: 'COMPLETED',
              text: 'Birth certificate details',
            },
            {
              href: '/birth-mother/full-name',
              id: 'birth-mother-details',
              status: 'COMPLETED',
              text: 'Birth mother details',
            },
            {
              href: '/birth-father/name-on-certificate',
              id: 'birth-father',
              status: 'COMPLETED',
              text: 'Birth father details',
            },
            {
              href: '/other-parent/exists',
              id: 'other-parent',
              status: 'COMPLETED',
              text: 'Other person with parental responsibility',
            },
            {
              href: '/children/placement-order-number',
              id: 'children-placement-order-details',
              status: 'NOT_STARTED',
              text: 'Placement and court orders',
            },
            { href: '/sibling/exists', id: 'sibling', status: 'COMPLETED', text: 'Sibling court order details' },
          ],
          title: "Add child's details",
        },
        {
          items: [{ href: '', id: 'upload-your-documents', status: 'CAN_NOT_START_YET', text: 'Upload documents' }],
          title: 'Upload documents',
        },
        {
          items: [
            {
              href: '',
              id: 'review-pay-and-submit',
              status: 'CAN_NOT_START_YET',
              text: 'Review, pay and submit your application',
            },
          ],
          title: 'Review, pay and submit',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
