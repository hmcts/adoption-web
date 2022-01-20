import { FieldPrefix } from '../../app/case/case';
import { SectionStatus } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import * as urls from '../urls';

import {
  getAdoptionAgencyDetailStatus,
  getAdoptionCertificateDetailsStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getOtherParentStatus,
  getPersonalDetailsStatus,
  isApplyingWithComplete,
} from './utils';

const getSectionStatusLabel = (status, statuses, id) => {
  if (status === SectionStatus.COMPLETED) {
    return `<strong id="${id}" class="govuk-tag  app-task-list__tag" id="eligibility-completed">${statuses.completed}</strong>`;
  } else if (status === SectionStatus.IN_PROGRESS) {
    return `<strong id="${id}" class="govuk-tag govuk-tag--blue app-task-list__tag">${statuses.inProgress}</strong>`;
  } else {
    return `<strong id="${id}" class="govuk-tag govuk-tag--grey app-task-list__tag">${statuses.notStarted}</strong>`;
  }
};

const getAdoptionAgencyUrl = userCase => {
  if (userCase.adopAgencyOrLAs?.length) {
    const adopAgency = userCase.adopAgencyOrLAs[0];
    return `${urls.ADOPTION_AGENCY}?change=${adopAgency.adopAgencyOrLaId}`;
  }
  return `${urls.ADOPTION_AGENCY}?add=${Date.now()}`;
};

const en = content => {
  const statuses = {
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
  };

  return {
    title: 'Apply to adopt a child placed in your care',
    section1: 'Add your details',
    insetTextLine1: 'You will need:',
    insetTextLine2: 'a photo ID document (such as driving licence or passport)',
    insetTextLine3: 'documents about any legal change of name',
    insetTextLine4: 'You may need:',
    insetTextLine5: 'UK visa',
    insetTextLine6: 'death certificate of spouse or nullity of marriage',
    insetTextLine7: 'a decree absolute of divorce or decree of nullity of your marriage',
    insetTextLine8: 'medical documents if your spouse is incapacitated',
    section1details1: 'Number of applicants',
    section1details2: 'Date child moved in with you',
    section2subheading2: 'First applicant',
    section2subheading2line1: 'Your personal details',
    section2subheading2line2: 'Your contact details',
    section2subheading2line3: 'Upload your identity documents',
    section2subheading3: 'Second applicant',
    section2subheading3line1: 'Your personal details',
    section2subheading3line2: 'Your contact details',
    section2subheading3line3: 'Upload your identity documents',
    section3: "Add the child's details",
    insetTextLine9:
      "You'll need to work with your social worker or adoption agency to answer these questions, but it's important the come you",
    insetTextLine10:
      'This is because, if your application is successful, "parental responsibility" permanently transfer from the birth parents to you.',
    section3link1: 'Their birth certificate details',
    section3link2: 'Adoption certificate details',
    section3link3: 'Their placement order details',
    section3link4: "Their birth mother's details",
    section3link5: "Their birth father's details",
    section3link6: "Other parent's details",
    section3link7: 'Previous court orders for the child',
    section3link8: 'Court order details for any siblings or half-siblings',
    section3link9: 'Adoption agency, social worker and solicitor details',
    section4: 'Add your adoption contacts',
    section4link1: 'Your adoption agency or local authority',
    section4link2: "The child's adoption agency or local authority",
    section4link3: 'Your solicitor',
    section5: 'Declare payments',
    section5link1: 'Declare any payments made or received',
    section6: 'Review application, pay and send',
    insetTextLine11: "You'll need your credit or debit card.",
    section6link1: 'Review application, pay and send',
    status: {
      applyingWith: isApplyingWithComplete(content.userCase),
      applicant1PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-personal-details-status'
      ),
      applicant1ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT1),
        statuses,
        'applicant1-contact-details-status'
      ),
      applicant2PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant2-personal-details-status'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT2),
        statuses,
        'applicant2-contact-details-status'
      ),
      childrenBirthCertificate: getSectionStatusLabel(
        getChildrenBirthCertificateStatus(content.userCase),
        statuses,
        'children-birth-certificate-details-status'
      ),
      childrenPlacementOrder: getSectionStatusLabel(
        getChildrenPlacementOrderStatus(content.userCase),
        statuses,
        'children-placement-order-details-status'
      ),
      adoptionCertificateDetails: getSectionStatusLabel(
        getAdoptionCertificateDetailsStatus(content.userCase),
        statuses,
        'adoption-certificate-details-status'
      ),
      birthFather: getSectionStatusLabel(
        getBirthFatherDetailsStatus(content.userCase),
        statuses,
        'birth-father-status'
      ),
      birthMotherDetails: getSectionStatusLabel(
        getBirthMotherDetailsStatus(content.userCase),
        statuses,
        'birth-mother-details-status'
      ),
      otherParent: getSectionStatusLabel(getOtherParentStatus(content.userCase), statuses, 'other-parent-status'),
      adoptionAgency: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'adoption-agency'
      ),
    },
    urls: {
      applyingWith: urls.APPLYING_WITH_URL,
      applicant1PersonalDetails: urls.APPLICANT_1_FULL_NAME,
      applicant1ContactDetails: urls.APPLICANT_1_FIND_ADDRESS,
      applicant2PersonalDetails: urls.APPLICANT_2_FULL_NAME,
      applicant2ContactDetails: urls.APPLICANT_2_SAME_ADDRESS,
      childrenBirthCertificate: urls.CHILDREN_FULL_NAME,
      otherParentExists: urls.OTHER_PARENT_EXISTS,
      adoptionCertificateDetails: urls.CHILDREN_FULL_NAME_AFTER_ADOPTION,
      childrenPlacementOrder:
        getChildrenPlacementOrderStatus(content.userCase) === SectionStatus.NOT_STARTED
          ? urls.CHILDREN_PLACEMENT_ORDER_NUMBER
          : urls.CHILDREN_PLACEMENT_ORDER_SUMMARY,
      birthFather: urls.BIRTH_FATHER_NAME_ON_CERTIFICATE,
      birthMotherDetails: urls.BIRTH_MOTHER_FULL_NAME,
      reviewApplicationPayAndSubmit: urls.CHECK_ANSWERS_URL,
      adoptionAgency: getAdoptionAgencyUrl(content.userCase),
    },
  };
};

const cy = content => {
  const statuses = {
    completed: 'Completed (in welsh)',
    inProgress: 'In Progress (in welsh)',
    notStarted: 'Not Started (in welsh)',
  };

  return {
    title: 'Apply to adopt a child placed in your care (in welsh) ',
    section1: 'Add your details (in welsh) ',
    insetTextLine1: 'You will need: (in welsh) ',
    insetTextLine2: 'a photo ID document (such as driving licence or passport) (in welsh) ',
    insetTextLine3: 'documents about any legal change of name (in welsh) ',
    insetTextLine4: 'You may need: (in welsh) ',
    insetTextLine5: 'UK visa (in welsh) ',
    insetTextLine6: 'death certificate of spouse or nullity of marriage (in welsh) ',
    insetTextLine7: 'a decree absolute of divorce or decree of nullity of your marriage (in welsh) ',
    insetTextLine8: 'medical documents if your spouse is incapacitated (in welsh) ',
    section1details1: 'Number of applicants (in welsh) ',
    section1details2: 'Date child moved in with you (in welsh) ',
    section2subheading2: 'First applicant (in welsh) ',
    section2subheading2line1: 'Your personal details (in welsh) ',
    section2subheading2line2: 'Your contact details (in welsh) ',
    section2subheading2line3: 'Upload your identity documents (in welsh) ',
    section2subheading3: 'Second applicant (in welsh) ',
    section2subheading3line1: 'Your personal details (in welsh) ',
    section2subheading3line2: 'Your contact details (in welsh) ',
    section2subheading3line3: 'Upload your identity documents (in welsh) ',
    section3: "Add the child's details (in welsh) ",
    insetTextLine9:
      "You'll need to work with your social worker or adoption agency to answer these questions, but it's important the come you (in welsh) ",
    insetTextLine10:
      'This is because, if your application is successful, "parental responsibility" permanently transfer from the birth parents to you. (in welsh) ',
    section3link1: 'Their birth certificate details (in welsh) ',
    section3link2: 'Adoption certificate details (in welsh) ',
    section3link3: 'Their placement order details (in welsh) ',
    section3link4: "Their birth mother's details (in welsh) ",
    section3link5: "Their birth father's (in welsh) ",
    section3link6: "Other parent's details (in welsh)",
    section3link7: 'Previous court orders for the child (in welsh) ',
    section3link8: 'Court order details for any siblings or half-siblings (in welsh) ',
    section3link9: 'Adoption agency, social worker and solicitor details (in welsh) ',
    section4: 'Add your adoption contacts (in welsh) ',
    section4link1: 'Your adoption agency or local authority (in welsh) ',
    section4link2: "The child's adoption agency or local authority (in welsh) ",
    section4link3: 'Your solicitor (in welsh) ',
    section5: 'Declare payments (in welsh) ',
    section5link1: 'Declare any payments made or received (in welsh) ',
    section6: 'Review application, pay and send (in welsh) ',
    insetTextLine11: "You'll need your credit or debit card. (in welsh) ",
    section6link1: 'Review application, pay and send (in welsh) ',
    status: {
      applyingWith: isApplyingWithComplete(content.userCase),
      applicant1PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-personal-details-status'
      ),
      applicant1ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT1),
        statuses,
        'applicant1-contact-details-status'
      ),
      applicant2PersonalDetails: getSectionStatusLabel(
        getPersonalDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant1-personal-details-status'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, FieldPrefix.APPLICANT2),
        statuses,
        'applicant2-contact-details-status'
      ),
      childrenBirthCertificate: getSectionStatusLabel(
        getChildrenBirthCertificateStatus(content.userCase),
        statuses,
        'children-birth-certificate-details-status'
      ),
      childrenPlacementOrder: getSectionStatusLabel(
        getChildrenPlacementOrderStatus(content.userCase),
        statuses,
        'children-placement-order-details-status'
      ),
      adoptionCertificateDetails: getSectionStatusLabel(
        getAdoptionCertificateDetailsStatus(content.userCase),
        statuses,
        'adoption-certificate-details-status'
      ),
      birthFather: getSectionStatusLabel(
        getBirthFatherDetailsStatus(content.userCase),
        statuses,
        'birth-father-status'
      ),
      birthMotherDetails: getSectionStatusLabel(
        getBirthMotherDetailsStatus(content.userCase),
        statuses,
        'birth-mother-details-status'
      ),
      otherParent: getSectionStatusLabel(getOtherParentStatus(content.userCase), statuses, 'other-parent-status'),
      adoptionAgency: getSectionStatusLabel(
        getAdoptionAgencyDetailStatus(content.userCase),
        statuses,
        'adoption-agency'
      ),
    },
    urls: {
      applyingWith: urls.APPLYING_WITH_URL,
      applicant1PersonalDetails: urls.APPLICANT_1_FULL_NAME,
      applicant1ContactDetails: urls.APPLICANT_1_FIND_ADDRESS,
      applicant2PersonalDetails: urls.APPLICANT_2_FULL_NAME,
      applicant2ContactDetails: urls.APPLICANT_2_SAME_ADDRESS,
      childrenBirthCertificate: urls.CHILDREN_FULL_NAME,
      otherParentExists: urls.OTHER_PARENT_EXISTS,
      adoptionCertificateDetails: urls.CHILDREN_FULL_NAME_AFTER_ADOPTION,
      childrenPlacementOrder:
        getChildrenPlacementOrderStatus(content.userCase) === SectionStatus.NOT_STARTED
          ? urls.CHILDREN_PLACEMENT_ORDER_NUMBER
          : urls.CHILDREN_PLACEMENT_ORDER_SUMMARY,
      birthFather: urls.BIRTH_FATHER_NAME_ON_CERTIFICATE,
      birthMotherDetails: urls.BIRTH_MOTHER_FULL_NAME,
      reviewApplicationPayAndSubmit: urls.CHECK_ANSWERS_URL,
      adoptionAgency: getAdoptionAgencyUrl(content.userCase),
    },
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
