import { FieldPrefix } from '../../app/case/case';
import { ApplyingWith, SectionStatus } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import * as URL from '../urls';

import {
  findFamilyCourtStatus,
  getAdoptionAgencyDetailStatus,
  getAdoptionAgencyUrl,
  getAdoptionCertificateDetailsStatus,
  getApplicationStatus,
  getApplyingWithStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getDateChildMovedInStatus,
  getOtherParentStatus,
  getPersonalDetailsStatus,
  getReviewPaySubmitUrl,
  getSiblingStatus,
  getUploadDocumentStatus,
} from './utils';

const generateTaskList = (sectionTitles, taskListItems, userCase) => [
  {
    title: sectionTitles.applicationDetails,
    items: [
      {
        id: 'applying-with',
        text: taskListItems.numberOfApplicants,
        status: getApplyingWithStatus(userCase),
        href: URL.APPLYING_WITH_URL,
      },
      {
        id: 'date-child-moved-in',
        text: taskListItems.dateChildMovedIn,
        status: getDateChildMovedInStatus(userCase),
        href: URL.DATE_CHILD_MOVED_IN,
      },
      {
        id: 'adoption-agency',
        text: taskListItems.adoptionAgency,
        status: getAdoptionAgencyDetailStatus(userCase),
        href: getAdoptionAgencyUrl(userCase),
      },
    ],
  },
  {
    title: sectionTitles.applicantDetails,
    items: [
      ...(userCase.applyingWith !== ApplyingWith.ALONE ? [{ text: taskListItems.firstApplicant }] : []),
      {
        id: 'applicant1-personal-details',
        text: taskListItems.personalDetails,
        status: getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT1),
        href: URL.APPLICANT_1_FULL_NAME,
      },
      {
        id: 'applicant1-contact-details',
        text: taskListItems.contactDetails,
        status: getContactDetailsStatus(userCase, FieldPrefix.APPLICANT1),
        href: URL.APPLICANT_1_FIND_ADDRESS,
      },
      ...(userCase.applyingWith !== ApplyingWith.ALONE
        ? [
            { text: taskListItems.secondApplicant },
            {
              id: 'applicant2-personal-details',
              text: taskListItems.personalDetails,
              status: getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT2),
              href: URL.APPLICANT_2_FULL_NAME,
            },
            {
              id: 'applicant2-contact-details',
              text: taskListItems.contactDetails,
              status: getContactDetailsStatus(userCase, FieldPrefix.APPLICANT2),
              href: URL.APPLICANT_2_SAME_ADDRESS,
            },
          ]
        : []),
    ],
  },
  {
    title: sectionTitles.childDetails,
    items: [
      {
        id: 'children-birth-certificate-details',
        text: taskListItems.birthCertificate,
        status: getChildrenBirthCertificateStatus(userCase),
        href: URL.CHILDREN_FULL_NAME,
      },
      {
        id: 'adoption-certificate-details',
        text: taskListItems.childNameAfterAdoption,
        status: getAdoptionCertificateDetailsStatus(userCase),
        href: URL.CHILDREN_FULL_NAME_AFTER_ADOPTION,
      },
      {
        id: 'birth-mother-details',
        text: taskListItems.birthMother,
        status: getBirthMotherDetailsStatus(userCase),
        href: URL.BIRTH_MOTHER_FULL_NAME,
      },
      {
        id: 'birth-father',
        text: taskListItems.birthFather,
        status: getBirthFatherDetailsStatus(userCase),
        href: URL.BIRTH_FATHER_NAME_ON_CERTIFICATE,
      },
      {
        id: 'other-parent',
        text: taskListItems.otherParent,
        status: getOtherParentStatus(userCase),
        href: URL.OTHER_PARENT_EXISTS,
      },
      {
        id: 'children-placement-order-details',
        text: taskListItems.placementAndCourtOrders,
        status: getChildrenPlacementOrderStatus(userCase),
        href:
          getChildrenPlacementOrderStatus(userCase) === SectionStatus.NOT_STARTED
            ? URL.CHILDREN_PLACEMENT_ORDER_NUMBER
            : URL.CHILDREN_PLACEMENT_ORDER_SUMMARY,
      },
      {
        id: 'sibling',
        text: taskListItems.siblingCourtOrders,
        status: getSiblingStatus(userCase),
        href: URL.SIBLING_EXISTS,
      },
      {
        id: 'find-family-court',
        text: taskListItems.chooseFamilyCourt,
        status: findFamilyCourtStatus(userCase),
        href: URL.CHILDREN_FIND_FAMILY_COURT,
      },
    ],
  },
  {
    title: sectionTitles.uploadDocuments,
    items: [
      {
        id: 'upload-your-documents',
        text: taskListItems.uploadDocuments,
        status: getUploadDocumentStatus(userCase),
        href: URL.UPLOAD_YOUR_DOCUMENTS,
      },
    ],
  },
  {
    title: sectionTitles.reviewPayAndSubmit,
    items: [
      {
        id: 'review-pay-and-submit',
        text: taskListItems.reviewPayAndSubmit,
        status: getApplicationStatus(userCase),
        href: getApplicationStatus(userCase) === SectionStatus.CAN_NOT_START_YET ? '' : getReviewPaySubmitUrl(userCase),
      },
    ],
  },
];

const en = () => ({
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
});

const cy = () => ({
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
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { sectionTitles, taskListItems, ...translations } = languages[content.language]();
  return {
    ...translations,
    sections: generateTaskList(sectionTitles, taskListItems, content.userCase),
  };
};
