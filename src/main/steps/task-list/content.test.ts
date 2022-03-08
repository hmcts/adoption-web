import languageAssertions from '../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../app/case/definition';
import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.NOT_STARTED]: 'Not Started',
    [SectionStatus.CAN_NOT_START_YET]: 'Can not start yet',
  },
  sectionTitles: {
    applicationDetails: 'Add application details',
    applicantDetails: "Add applicant's details",
    childDetails: "Add the child's details",
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
    childNameAfterAdoption: "Child's name after adoption",
    birthMother: 'Birth mother details',
    birthFather: 'Birth father details',
    otherParent: 'Other person with parental responsibility',
    placementAndCourtOrders: 'Placement and court orders',
    siblingCourtOrders: 'Sibling court order details',
    chooseFamilyCourt: 'Choose your family court',
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review, pay and submit your application',
  },
};

const cyContent = {
  title: 'Apply to adopt a child placed in your care (in welsh)',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed (in welsh)',
    [SectionStatus.IN_PROGRESS]: 'In Progress (in welsh)',
    [SectionStatus.NOT_STARTED]: 'Not Started (in welsh)',
    [SectionStatus.CAN_NOT_START_YET]: 'Can not start yet (in welsh)',
  },
  sectionTitles: {
    applicationDetails: 'Add application details (in welsh)',
    applicantDetails: "Add applicant's details (in welsh)",
    childDetails: "Add the child's details (in welsh)",
    uploadDocuments: 'Upload documents (in welsh)',
    reviewPayAndSubmit: 'Review, pay and submit (in welsh)',
  },
  taskListItems: {
    numberOfApplicants: 'Number of applicants (in welsh)',
    dateChildMovedIn: 'Date child moved in with you (in welsh)',
    adoptionAgency: 'Adoption agency and social worker (in welsh)',
    firstApplicant: 'First applicant (in welsh)',
    secondApplicant: 'Second applicant (in welsh)',
    personalDetails: 'Your personal details (in welsh)',
    contactDetails: 'Your contact details (in welsh)',
    birthCertificate: 'Birth certificate details (in welsh)',
    childNameAfterAdoption: "Child's name after adoption (in welsh)",
    birthMother: 'Birth mother details (in welsh)',
    birthFather: 'Birth father details (in welsh)',
    otherParent: 'Other person with parental responsibility (in welsh)',
    placementAndCourtOrders: 'Placement and court orders (in welsh)',
    siblingCourtOrders: 'Sibling court order details (in welsh)',
    chooseFamilyCourt: 'Choose your family court (in welsh)',
    uploadDocuments: 'Upload documents (in welsh)',
    reviewPayAndSubmit: 'Review, pay and submit your application (in welsh)',
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
});
