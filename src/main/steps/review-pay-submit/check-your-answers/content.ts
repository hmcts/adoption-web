import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, Gender, YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import * as Urls from '../../../steps/urls';

const getSectionSummaryList = (rows, content: PageContent) => {
  const returnUrlQueryParam = `returnUrl=${Urls.CHECK_ANSWERS_URL}`;
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

const applicationSummaryList = ({ sectionTitles, keys, language, ...content }, userCase: Partial<CaseWithId>) => ({
  title: sectionTitles.applicationDetails,
  rows: getSectionSummaryList(
    [
      {
        key: keys.noOfApplicants,
        value: content.applyingWith[userCase.applyingWith!],
        changeUrl: Urls.APPLYING_WITH_URL,
      },
      {
        key: keys.dateChildMovedIn,
        value: getFormattedDate(userCase.dateChildMovedIn, language),
        changeUrl: Urls.DATE_CHILD_MOVED_IN,
      },
    ],
    content
  ),
});

const adoptionAgencySummaryList = (
  { sectionTitles, keys, ...content },
  userCase: Partial<CaseWithId>,
  agencyIndex = 0
) => {
  let adoptionAgency;
  if (!userCase.adopAgencyOrLAs?.length) {
    return;
  }

  if (agencyIndex === 0 || (agencyIndex === 1 && userCase.hasAnotherAdopAgencyOrLA === YesOrNo.YES)) {
    adoptionAgency = userCase.adopAgencyOrLAs[agencyIndex];
  }

  return {
    title: agencyIndex === 0 ? sectionTitles.adoptionagencyOrLA : sectionTitles.additionalAoptionagencyOrLA,
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

const socialWorkerSummaryList = ({ sectionTitles, keys, ...content }, userCase: Partial<CaseWithId>) => {
  return {
    title: sectionTitles.socialWorkerDetails,
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
const applicantSummaryList = (
  { sectionTitles, keys, ...content },
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
) => {
  const urlPrefix = prefix === FieldPrefix.APPLICANT1 ? 'APPLICANT_1_' : 'APPLICANT_2_';
  let sectionTitle = sectionTitles.applicantDetails;
  if (prefix === FieldPrefix.APPLICANT1 && userCase.applyingWith !== ApplyingWith.ALONE) {
    sectionTitle = sectionTitles.firstApplicantDetails;
  } else if (prefix === FieldPrefix.APPLICANT2) {
    sectionTitle = sectionTitles.secondApplicantDetails;
  }

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
          valueHtml: getFormattedAddress(userCase, prefix),
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

const childrenSummaryList = ({ sectionTitles, keys, ...content }, userCase: Partial<CaseWithId>) => {
  return {
    title: sectionTitles.childDetails,
    rows: getSectionSummaryList(
      [
        {
          key: keys.fullName,
          value: userCase.childrenFirstName + ' ' + userCase.childrenLastName,
          changeUrl: Urls.CHILDREN_FULL_NAME,
        },
        {
          key: keys.dateOfBirth,
          value: getFormattedDate(userCase.childrenDateOfBirth),
          changeUrl: Urls.CHILDREN_DATE_OF_BIRTH,
        },
        {
          key: keys.sexAtBirth,
          value: content.gender[userCase.childrenSexAtBirth!],
          changeUrl: Urls.CHILDREN_SEX_AT_BIRTH,
        },
        {
          key: keys.nationality,
          value: userCase.childrenNationality,
          changeUrl: Urls.CHILDREN_NATIONALITY,
        },
        {
          key: keys.fullNameAfterAdoption,
          value: userCase.childrenFirstNameAfterAdoption + ' ' + userCase.childrenLastNameAfterAdoption,
          changeUrl: Urls.CHILDREN_FULL_NAME_AFTER_ADOPTION,
        },
      ],
      content
    ),
  };
};

const getNotSureReasonElement = (userCase, fieldName, reasonFieldName) => {
  return `${userCase[fieldName]}<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span>${userCase[reasonFieldName]}</p>`;
};

/* eslint-disable import/namespace */
const birthParentSummaryList = (
  { sectionTitles, keys, ...content },
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
) => {
  const urlPrefix = prefix === FieldPrefix.BIRTH_MOTHER ? 'BIRTH_MOTHER_' : 'BIRTH_FATHER_';
  const reasonFieldName =
    prefix === FieldPrefix.BIRTH_MOTHER ? `${prefix}NotAliveReason` : `${prefix}UnsureAliveReason`;
  return {
    title: sectionTitles[`${prefix}Details`],
    rows: getSectionSummaryList(
      [
        {
          key: keys.fullName,
          value: userCase[`${prefix}FirstNames`] + ' ' + userCase[`${prefix}LastNames`],
          changeUrl: Urls[`${urlPrefix}FULL_NAME`],
        },
        {
          key: keys.alive,
          valueHtml:
            userCase[`${prefix}StillAlive`] === YesNoNotsure.NOT_SURE
              ? getNotSureReasonElement(userCase, `${prefix}StillAlive`, reasonFieldName)
              : userCase[`${prefix}StillAlive`],
          changeUrl: Urls[`${urlPrefix}STILL_ALIVE`],
        },
        ...(userCase[`${prefix}StillAlive`] === YesOrNo.YES
          ? [
              {
                key: keys.nationality,
                value: userCase[`${prefix}Nationality`],
                changeUrl: Urls[`${urlPrefix}NATIONALITY`],
              },
              {
                key: keys.occupation,
                value: userCase[`${prefix}Occupation`],
                changeUrl: Urls[`${urlPrefix}OCCUPATION`],
              },
              {
                key: keys.addressKnown,
                value: userCase[`${prefix}AddressKnown`],
                changeUrl: Urls[`${urlPrefix}ADDRESS_KNOWN`],
              },
              ...(userCase[`${prefix}AddressKnown`] === YesOrNo.YES
                ? [
                    {
                      key: keys.address,
                      valueHtml: getFormattedAddress(userCase, FieldPrefix.BIRTH_MOTHER),
                      changeUrl: Urls[`${urlPrefix}ADDRESS_MANUAL`],
                    },
                  ]
                : []),
            ]
          : []),
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
    gender: {
      [Gender.MALE]: 'Male',
      [Gender.FEMALE]: 'Female',
      [Gender.INTERSEX]: 'Other',
    },
    language: content.language,
    sectionTitles,
    keys,
  };

  const userCase = content.userCase!;

  return {
    ...enContent,
    sections: [
      applicationSummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase),
      adoptionAgencySummaryList(enContent, userCase, 1),
      socialWorkerSummaryList(enContent, userCase),
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
      ...(userCase.applyingWith !== ApplyingWith.ALONE
        ? [applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT2)]
        : []),
      childrenSummaryList(enContent, userCase),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_MOTHER),
      birthParentSummaryList(enContent, userCase, FieldPrefix.BIRTH_FATHER),
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
