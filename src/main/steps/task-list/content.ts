import { FieldPrefix } from '../../app/case/case';
import { SectionStatus } from '../../app/case/definition';
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

const getSectionStatusLabel = (status, statuses, id) => {
  switch (status) {
    case SectionStatus.CAN_NOT_START_YET:
      return `<strong id="${id}-status" class="govuk-tag govuk-tag--grey app-task-list__tag">${statuses.canNotStartYet}</strong>`;
    case SectionStatus.IN_PROGRESS:
      return `<strong id="${id}-status" class="govuk-tag govuk-tag--blue app-task-list__tag">${statuses.inProgress}</strong>`;
    case SectionStatus.COMPLETED:
      return `<strong id="${id}-status" class="govuk-tag  app-task-list__tag">${statuses.completed}</strong>`;
    default:
      return `<strong id="${id}-status" class="govuk-tag govuk-tag--grey app-task-list__tag">${statuses.notStarted}</strong>`;
  }
};

const urls = content => ({
  applyingWith: URL.APPLYING_WITH_URL,
  applicant1PersonalDetails: URL.APPLICANT_1_FULL_NAME,
  applicant1ContactDetails: URL.APPLICANT_1_FIND_ADDRESS,
  applicant2PersonalDetails: URL.APPLICANT_2_FULL_NAME,
  applicant2ContactDetails: URL.APPLICANT_2_SAME_ADDRESS,
  childrenBirthCertificate: URL.CHILDREN_FULL_NAME,
  otherParentExists: URL.OTHER_PARENT_EXISTS,
  adoptionCertificateDetails: URL.CHILDREN_FULL_NAME_AFTER_ADOPTION,
  childrenPlacementOrder:
    getChildrenPlacementOrderStatus(content.userCase) === SectionStatus.NOT_STARTED
      ? URL.CHILDREN_PLACEMENT_ORDER_NUMBER
      : URL.CHILDREN_PLACEMENT_ORDER_SUMMARY,
  birthFather: URL.BIRTH_FATHER_NAME_ON_CERTIFICATE,
  birthMotherDetails: URL.BIRTH_MOTHER_FULL_NAME,
  siblingDetails: URL.SIBLING_EXISTS,
  dateChildMovedIn: URL.DATE_CHILD_MOVED_IN,
  adoptionAgency: getAdoptionAgencyUrl(content.userCase),
  uploadYourDocuments: URL.UPLOAD_YOUR_DOCUMENTS,
  findFamilyCourt: URL.CHILDREN_FIND_FAMILY_COURT,
  reviewApplicationPayAndSubmit:
    getApplicationStatus(content.userCase) === SectionStatus.CAN_NOT_START_YET
      ? undefined
      : getReviewPaySubmitUrl(content.userCase),
});

const en = content => {
  const statuses = {
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    canNotStartYet: 'Can not start yet',
  };

  return {
    title: 'Apply to adopt a child placed in your care',
    section1: 'Add application details',
    section1details1: 'Number of applicants',
    section1details2: 'Date child moved in with you',
    section2: "Add applicant's details",
    section2subheading2: 'First applicant',
    section2subheading2line1: 'Your personal details',
    section2subheading2line2: 'Your contact details',
    section2subheading3: 'Second applicant',
    section2subheading3line1: 'Your personal details',
    section2subheading3line2: 'Your contact details',
    section3: "Add the child's details",
    section3link1: 'Their birth certificate details',
    section3link2: 'Adoption certificate details',
    section3link3: 'Their placement order details',
    section3link4: "Their birth mother's details",
    section3link5: "Their birth father's details",
    section3link6: "Other parent's details",
    section3link7: 'Previous court orders for the child',
    section3link8: 'Court order details for any siblings or half-siblings',
    section3link9: 'Adoption agency and social worker',
    section3link10: 'Sibling details',
    section3link11: 'Choose your family court',
    section4: 'Add your adoption contacts',
    section4link1: 'Your adoption agency or local authority',
    section4link2: "The child's adoption agency or local authority",
    section4link3: 'Your solicitor',
    section5: 'Upload documents',
    section5link1: 'Upload documents',
    section6: 'Review application, pay and send',
    section6link1: 'Review application, pay and send',
    status: {
      applyingWith: getSectionStatusLabel(getApplyingWithStatus(content.userCase), statuses, 'applying-with'),
      dateChildMovedIn: getSectionStatusLabel(
        getDateChildMovedInStatus(content.userCase),
        statuses,
        'date-child-moved-in'
      ),
      applicant1PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-personal-details'
      ),
      applicant1ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT1),
        statuses,
        'applicant1-contact-details'
      ),
      applicant2PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant2-personal-details'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT2),
        statuses,
        'applicant2-contact-details'
      ),
      childrenBirthCertificate: getSectionStatusLabel(
        getChildrenBirthCertificateStatus(content.userCase),
        statuses,
        'children-birth-certificate-details'
      ),
      childrenPlacementOrder: getSectionStatusLabel(
        getChildrenPlacementOrderStatus(content.userCase),
        statuses,
        'children-placement-order-details'
      ),
      adoptionCertificateDetails: getSectionStatusLabel(
        getAdoptionCertificateDetailsStatus(content.userCase),
        statuses,
        'adoption-certificate-details'
      ),
      birthFather: getSectionStatusLabel(getBirthFatherDetailsStatus(content.userCase), statuses, 'birth-father'),
      birthMotherDetails: getSectionStatusLabel(
        getBirthMotherDetailsStatus(content.userCase),
        statuses,
        'birth-mother-details'
      ),
      otherParent: getSectionStatusLabel(getOtherParentStatus(content.userCase), statuses, 'other-parent'),
      adoptionAgency: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'adoption-agency'
      ),
      sibling: getSectionStatusLabel(getSiblingStatus(content.userCase), statuses, 'sibling'),
      statementsOfTruth: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'statement-of-truth'
      ),
      uploadDocuments: getSectionStatusLabel(
        getUploadDocumentStatus(content.userCase),
        statuses,
        'upload-your-documents'
      ),
      findFamilyCourt: getSectionStatusLabel(findFamilyCourtStatus(content.userCase), statuses, 'find-family-court'),
      reviewPayAndSubmit: getSectionStatusLabel(
        getApplicationStatus(content.userCase),
        statuses,
        'review-pay-and-submit'
      ),
    },
    urls: urls(content),
  };
};

const cy = content => {
  const statuses = {
    completed: 'Completed (in welsh)',
    inProgress: 'In Progress (in welsh)',
    notStarted: 'Not Started (in welsh)',
    canNotStartYet: 'Can not start yet (in welsh)',
  };

  return {
    title: 'Apply to adopt a child placed in your care (in welsh) ',
    section1: 'Add application details (in welsh) ',
    section1details1: 'Number of applicants (in welsh) ',
    section2: "Add applicant's details (in welsh) ",
    section1details2: 'Date child moved in with you (in welsh) ',
    section2subheading2: 'First applicant (in welsh) ',
    section2subheading2line1: 'Your personal details (in welsh) ',
    section2subheading2line2: 'Your contact details (in welsh) ',
    section2subheading3: 'Second applicant (in welsh) ',
    section2subheading3line1: 'Your personal details (in welsh) ',
    section2subheading3line2: 'Your contact details (in welsh) ',
    section3: "Add the child's details (in welsh) ",
    section3link1: 'Their birth certificate details (in welsh) ',
    section3link2: 'Adoption certificate details (in welsh) ',
    section3link3: 'Their placement order details (in welsh) ',
    section3link4: "Their birth mother's details (in welsh) ",
    section3link5: "Their birth father's (in welsh) ",
    section3link6: "Other parent's details (in welsh)",
    section3link7: 'Previous court orders for the child (in welsh) ',
    section3link8: 'Court order details for any siblings or half-siblings (in welsh) ',
    section3link9: 'Adoption agency and social worker (in welsh) ',
    section3link10: 'Sibling details',
    section3link11: 'Choose your family court (in welsh)',
    section4: 'Add your adoption contacts (in welsh) ',
    section4link1: 'Your adoption agency or local authority (in welsh) ',
    section4link2: "The child's adoption agency or local authority (in welsh) ",
    section4link3: 'Your solicitor (in welsh) ',
    section5: 'Upload documents (in welsh) ',
    section5link1: 'Upload documents (in welsh) ',
    section6: 'Review application, pay and send (in welsh) ',
    section6link1: 'Review application, pay and send (in welsh) ',
    status: {
      applyingWith: getSectionStatusLabel(getApplyingWithStatus(content.userCase), statuses, 'applying-with'),
      dateChildMovedIn: getDateChildMovedInStatus(content.userCase),
      applicant1PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-personal-details'
      ),
      applicant1ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT1),
        statuses,
        'applicant1-contact-details'
      ),
      applicant2PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant1-personal-details'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT2),
        statuses,
        'applicant2-contact-details'
      ),
      childrenBirthCertificate: getSectionStatusLabel(
        getChildrenBirthCertificateStatus(content.userCase),
        statuses,
        'children-birth-certificate-details'
      ),
      childrenPlacementOrder: getSectionStatusLabel(
        getChildrenPlacementOrderStatus(content.userCase),
        statuses,
        'children-placement-order-details'
      ),
      adoptionCertificateDetails: getSectionStatusLabel(
        getAdoptionCertificateDetailsStatus(content.userCase),
        statuses,
        'adoption-certificate-details'
      ),
      birthFather: getSectionStatusLabel(getBirthFatherDetailsStatus(content.userCase), statuses, 'birth-father'),
      birthMotherDetails: getSectionStatusLabel(
        getBirthMotherDetailsStatus(content.userCase),
        statuses,
        'birth-mother-details'
      ),
      otherParent: getSectionStatusLabel(getOtherParentStatus(content.userCase), statuses, 'other-parent'),
      adoptionAgency: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'adoption-agency'
      ),
      sibling: getSectionStatusLabel(getSiblingStatus(content.userCase), statuses, 'sibling'),
      statementsOfTruth: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'statement-of-truth'
      ),
      findFamilyCourt: getSectionStatusLabel(findFamilyCourtStatus(content.userCase), statuses, 'find-family-court'),
      reviewPayAndSubmit: getSectionStatusLabel(
        getApplicationStatus(content.userCase),
        statuses,
        'review-pay-and-submit'
      ),
    },
    urls: urls(content),
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
