import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, SectionStatus } from '../../../app/case/definition'; //YesNoNotsure
import { TranslationFn } from '../../../app/controller/GetController';
import * as URL from '../../urls';

import {
  findFamilyCourtStatus,
  getAdoptionAgencyDetailStatus,
  getAdoptionCertificateDetailsStatus,
  getApplicationStatus,
  getApplyingWithStatus,
  getContactDetailsStatus,
  getDateChildMovedInStatus,
  getPersonalDetailsStatus,
  getReviewPaySubmitUrl,
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
        id: 'adoption-certificate-details',
        text: taskListItems.childDetails,
        status: getAdoptionCertificateDetailsStatus(userCase),
        href: URL.CHILDREN_FULL_NAME,
      },
      {
        id: 'adoption-agency',
        text: taskListItems.adoptionAgency,
        status: getAdoptionAgencyDetailStatus(userCase),
        href: URL.SOCIAL_WORKER,
      },
      {
        id: 'find-family-court',
        text: taskListItems.familyCourt,
        status: findFamilyCourtStatus(userCase),
        href: URL.CHILDREN_FIND_PLACEMENT_ORDER_COURT,
      },
    ],
  },
  {
    title: sectionTitles.applicantDetails,
    items: [
      ...(userCase.applyingWith !== ApplyingWith.ALONE ? [{ text: taskListItems.firstApplicant }] : []),
      {
        id: 'applicant1-personal-details',
        text:
          userCase.applyingWith !== ApplyingWith.ALONE
            ? taskListItems.firstApplicantPersonalDetails
            : taskListItems.personalDetails,
        status: getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT1),
        href: URL.APPLICANT_1_FULL_NAME,
      },
      {
        id: 'applicant1-contact-details',
        text:
          userCase.applyingWith !== ApplyingWith.ALONE
            ? taskListItems.firstApplicantContactDetails
            : taskListItems.contactDetails,
        status: getContactDetailsStatus(userCase, FieldPrefix.APPLICANT1),
        href: URL.APPLICANT_1_FIND_ADDRESS,
      },
      ...(userCase.applyingWith !== ApplyingWith.ALONE
        ? [
            { text: taskListItems.secondApplicant },
            {
              id: 'applicant2-personal-details',
              text:
                userCase.applyingWith !== ApplyingWith.ALONE
                  ? taskListItems.secondApplicantPersonalDetails
                  : taskListItems.personalDetails,
              status: getPersonalDetailsStatus(userCase, FieldPrefix.APPLICANT2),
              href: URL.APPLICANT_2_FULL_NAME,
            },
            {
              id: 'applicant2-contact-details',
              text:
                userCase.applyingWith !== ApplyingWith.ALONE
                  ? taskListItems.secondApplicantContactDetails
                  : taskListItems.contactDetails,
              status: getContactDetailsStatus(userCase, FieldPrefix.APPLICANT2),
              href: URL.APPLICANT_2_SAME_ADDRESS,
            },
          ]
        : []),
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
    [SectionStatus.CAN_NOT_START_YET]: 'Cannot start yet',
  },
  sectionTitles: {
    applicationDetails: 'Add application details',
    applicantDetails: "Add applicant's details",
    childDetails: "Add child's details",
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review and submit',
  },
  taskListItems: {
    numberOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in with you',
    adoptionAgency: 'Adoption agency and social worker',
    firstApplicant: 'First applicant',
    secondApplicant: 'Second applicant',
    personalDetails: 'Your personal details',
    contactDetails: 'Your contact details',
    firstApplicantPersonalDetails:
      'Your personal details <span class="govuk-visually-hidden">First applicant personal details</span>',
    firstApplicantContactDetails:
      'Your contact details <span class="govuk-visually-hidden">First applicant contact details</span>',
    secondApplicantPersonalDetails:
      'Your personal details <span class="govuk-visually-hidden">Second applicant personal details</span>',
    secondApplicantContactDetails:
      'Your contact details <span class="govuk-visually-hidden">Second applicant contact details</span>',
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
});

const cy: typeof en = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a osodwyd yn eich gofal',
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
    firstApplicantPersonalDetails:
      'Eich manylion personol <span class="govuk-visually-hidden">Ceisydd cyntaf manylion personol</span>',
    firstApplicantContactDetails:
      'Eich manylion cyswllt <span class="govuk-visually-hidden">Ceisydd cyntaf manylion cyswllt</span>',
    secondApplicantPersonalDetails:
      'Eich manylion personol <span class="govuk-visually-hidden">Ail geisydd manylion personol</span>',
    secondApplicantContactDetails:
      'Eich manylion cyswllt <span class="govuk-visually-hidden">Ail geisydd manylion cyswllt</span>',
    birthCertificate: 'Manylion y dystysgrif geni',
    childDetails: 'Manylion y plentyn',
    birthMother: 'Manylion y fam fiolegol',
    birthFather: 'Manylion y tad biolegol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    familyCourt: 'Manylion y llys teulu',
    uploadDocuments: 'Llwytho dogfennau',
    reviewPayAndSubmit: 'Adolygu, talu a chyflwyno eich cais',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
  };
};
