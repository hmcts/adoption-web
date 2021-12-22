import { SectionStatus } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import * as urls from '../urls';

import { getContactDetailsStatus, getPersonalDetailsStatus, isApplyingWithComplete } from './utils';

const getSectionStatusLabel = (status, statuses, id) => {
  if (status === SectionStatus.COMPLETED) {
    return `<strong id="${id}" class="govuk-tag  app-task-list__tag" id="eligibility-completed">${statuses.completed}</strong>`;
  } else if (status === SectionStatus.IN_PROGRESS) {
    return `<strong id="${id}" class="govuk-tag govuk-tag--blue app-task-list__tag">${statuses.inProgress}</strong>`;
  } else {
    return `<strong id="${id}" class="govuk-tag govuk-tag--grey app-task-list__tag">${statuses.notStarted}</strong>`;
  }
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
    section3link5: "Their birth father's or other parent's details",
    section3link6: 'Previous court orders for the child',
    section3link7: 'Court order details for any siblings or half-siblings',
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
        getContactDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-contact-details-status'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant2-contact-details-status'
      ),
    },
    urls,
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
    section3link5: "Their birth father's or other parent's details (in welsh) ",
    section3link6: 'Previous court orders for the child (in welsh) ',
    section3link7: 'Court order details for any siblings or half-siblings (in welsh) ',
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
        getContactDetailsStatus(content.userCase, 'applicant1'),
        statuses,
        'applicant1-contact-details-status'
      ),
      applicant2ContactDetails: getSectionStatusLabel(
        getContactDetailsStatus(content.userCase, 'applicant2'),
        statuses,
        'applicant2-contact-details-status'
      ),
    },
    urls,
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
