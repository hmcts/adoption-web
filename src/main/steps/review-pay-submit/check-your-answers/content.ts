import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, YesOrNo } from '../../../app/case/definition';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import * as Urls from '../../../steps/urls';

const returnUrlQueryParam = `returnUrl=${Urls.CHECK_ANSWERS_URL}`;

const getSectionSummaryList = (rows, content: PageContent) => {
  return rows.map(item => {
    const changeUrl = `${item.changeUrl}${item.changeUrl.indexOf('?') === -1 ? '?' : '&'}${returnUrlQueryParam}`;
    return {
      key: { text: item.key },
      value: { text: item.value, html: item.valueHtml },
      actions: {
        items: [
          {
            href: changeUrl,
            text: content.change,
            visuallyHiddenText: `Change ${item.key}`,
          },
        ],
      },
    };
  });
};

const applicationSummaryList = (sectionTitle, keys, content, userCase: Partial<CaseWithId>) => ({
  title: sectionTitle,
  rows: getSectionSummaryList(
    [
      {
        key: keys.noOfApplicants,
        value: content.applyingWith[userCase.applyingWith!],
        changeUrl: Urls.APPLYING_WITH_URL,
      },
      {
        key: keys.dateChildMovedIn,
        value: getFormattedDate(userCase.dateChildMovedIn, content.language),
        changeUrl: Urls.DATE_CHILD_MOVED_IN,
      },
    ],
    content
  ),
});

const adoptionAgencySummaryList = (sectionTitle, keys, content, userCase: Partial<CaseWithId>, agencyIndex = 0) => {
  let adoptionAgency;
  if (!userCase.adopAgencyOrLAs?.length) {
    return;
  }

  if (agencyIndex === 0 || (agencyIndex === 1 && userCase.hasAnotherAdopAgencyOrLA === YesOrNo.YES)) {
    adoptionAgency = userCase.adopAgencyOrLAs[agencyIndex];
  }

  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      [
        ...(agencyIndex === 1
          ? [
              {
                key: keys.additionalAdoptionAgency,
                value: userCase.hasAnotherAdopAgencyOrLA,
                changeUrl: Urls.OTHER_ADOPTION_AGENCY,
              },
            ]
          : []),
        ...(adoptionAgency
          ? [
              {
                key: keys.name,
                value: adoptionAgency?.adopAgencyOrLaName,
                changeUrl: Urls.ADOPTION_AGENCY,
              },
              {
                key: keys.phoneNumber,
                value: adoptionAgency?.adopAgencyOrLaPhoneNumber,
                changeUrl: Urls.ADOPTION_AGENCY,
              },
              {
                key: keys.nameOfContact,
                value: adoptionAgency?.adopAgencyOrLaContactName,
                changeUrl: Urls.ADOPTION_AGENCY,
              },
              {
                key: keys.emailOfContact,
                value: adoptionAgency?.adopAgencyOrLaContactEmail,
                changeUrl: Urls.ADOPTION_AGENCY,
              },
            ]
          : []),
      ],
      content
    ),
  };
};

const socialWorkerSummaryList = (sectionTitle, keys, content, userCase: Partial<CaseWithId>) => {
  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      [
        {
          key: keys.name,
          value: userCase.socialWorkerName,
          changeUrl: Urls.SOCIAL_WORKER,
        },
        {
          key: keys.phoneNumber,
          value: userCase.socialWorkerPhoneNumber,
          changeUrl: Urls.SOCIAL_WORKER,
        },
        {
          key: keys.emailAddress,
          value: userCase.socialWorkerEmail,
          changeUrl: Urls.SOCIAL_WORKER,
        },
        {
          key: keys.teamEmailAddress,
          value: userCase.socialWorkerTeamEmail,
          changeUrl: Urls.SOCIAL_WORKER,
        },
      ],
      content
    ),
  };
};

/* eslint-disable import/namespace */
const applicantSummaryList = (sectionTitle, keys, content, userCase: Partial<CaseWithId>, prefix: FieldPrefix) => {
  const urlPrefix = prefix === FieldPrefix.APPLICANT1 ? 'APPLICANT_1_' : 'APPLICANT_2_';
  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      [
        {
          key: keys.fullName,
          value: userCase[`${prefix}FirstNames`] + ' ' + userCase[`${prefix}LastNames`],
          changeUrl: Urls[`${urlPrefix}FULL_NAME`],
        },
        {
          key: keys.previousNames,
          valueHtml: userCase[`${prefix}HasOtherNames`]
            ? userCase[`${prefix}AdditionalNames`]?.map(item => `${item.firstNames} ${item.lastNames}`).join('<br>')
            : '',
          changeUrl: Urls[`${urlPrefix}OTHER_NAMES`],
        },
        {
          key: keys.dateOfBirth,
          value: getFormattedDate(userCase[`${prefix}DateOfBirth`], content.language),
          changeUrl: Urls[`${urlPrefix}DOB`],
        },
        {
          key: keys.occupation,
          value: userCase[`${prefix}Occupation`],
          changeUrl: Urls[`${urlPrefix}OCCUPATION`],
        },
        {
          key: keys.address,
          value: getFormattedAddress(userCase, prefix),
          changeUrl: Urls[`${urlPrefix}MANUAL_ADDRESS`],
        },
        {
          key: keys.emailAddress,
          value: userCase[`${prefix}EmailAddress`],
          changeUrl: Urls[`${urlPrefix}CONTACT_DETAILS`],
        },
        {
          key: keys.phoneNumber,
          value: userCase[`${prefix}PhoneNumber`],
          changeUrl: Urls[`${urlPrefix}CONTACT_DETAILS`],
        },
      ],
      content
    ),
  };
};
/* eslint-enable import/namespace */

const en = (content: CommonContent): Record<string, unknown> => {
  const sectionTitles = {
    applicationDetails: 'Application details',
    adoptionagencyOrLA: 'Adoption agency or local authority details',
    additionalAoptionagencyOrLA: 'Additional adoption agency or local authority details',
    socialWorkerDetails: "Child's social worker details",
    applicantDetails: "Applicant's details",
    firstApplicantDetails: "First applicant's details",
    secondApplicantDetails: "Second applicant's details",
    childDetails: "Child's details",
    birthMotherDetails: "Birth mother's details",
    birthFatherDetails: "Birth father's details",
    otherParentDetails: "Other parent's details",
    childPlacementAndCourtOrders: "Child's placement and court orders",
    siblingCourtOrders: 'Sibling court orders',
    familyCourtDetails: 'Family court details',
    uploadedDocuments: 'Uploaded documents',
  };

  const keys = {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
    name: 'Name',
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
    nameOfContact: 'Name of contact',
    emailOfContact: 'Email address of contact',
    teamEmailAddress: 'Team email address',
    additionalAdoptionAgency: 'Additional adoption agency',
    fullName: 'Full name',
    previousNames: 'Previous names',
    dateOfBirth: 'Date of birth',
    occupation: 'Occupation',
    address: 'Address',
    sexAtBirth: 'Sex at birth',
    nationality: 'Nationality',
    fullNameAfterAdoption: 'Full name after adoption',
    alive: 'Alive',
    addressKnown: 'Address known',
    nameOnBirthCertificate: 'Name on birth certificate',
    otherParent: 'Is there another person with parental responsibility?',
    placementOrder: 'Placement order',
    typeOfOrder: 'Type of order',
    orderNumber: 'Order case or serial number',
    court: 'Court',
    date: 'Date',
    courtOrder: 'Court order',
    siblingName: 'Sibling name',
    familyCourtName: 'Family court name',
    applicantDocuments: "Applicant's documents",
    childDocuments: "Child's documents",
  };

  const enContent = {
    section: 'Review your application',
    title: 'Review your answers',
    change: 'Change',
    submitApplication: 'Submit your application',
    checkInfoBeforeSubmit:
      'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing.',
    continue: 'Continue',
    errors: {
      dateChildMovedIn: {
        lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
      },
    },
    applyingWith: {
      [ApplyingWith.ALONE]: "I'm applying on my own",
      [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner",
      [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner",
    },
    language: content.language,
  };

  const userCase = content.userCase!;

  return {
    ...enContent,
    sections: [
      applicationSummaryList(sectionTitles.applicationDetails, keys, enContent, userCase),
      adoptionAgencySummaryList(sectionTitles.adoptionagencyOrLA, keys, enContent, userCase),
      adoptionAgencySummaryList(sectionTitles.additionalAoptionagencyOrLA, keys, enContent, userCase, 1),
      socialWorkerSummaryList(sectionTitles.socialWorkerDetails, keys, enContent, userCase),
      applicantSummaryList(
        userCase.applyingWith === ApplyingWith.ALONE
          ? sectionTitles.applicantDetails
          : sectionTitles.firstApplicantDetails,
        keys,
        enContent,
        userCase,
        FieldPrefix.APPLICANT1
      ),
      ...(userCase.applyingWith !== ApplyingWith.ALONE
        ? [
            applicantSummaryList(
              sectionTitles.secondApplicantDetails,
              keys,
              enContent,
              userCase,
              FieldPrefix.APPLICANT2
            ),
          ]
        : []),
    ],
  };
};

const cy = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  submitApplication: 'Submit your application (in welsh)',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing. (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'You can only submit 10 weeks after the date the child started living continuously with you (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    dateChildMovedIn: { type: 'hidden', hidden: true },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
