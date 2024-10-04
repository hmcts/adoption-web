/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, YesOrNo } from '../../../app/case/definition';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent } from '../../../app/controller/GetController';
import { sanitizeHtml } from '../../../steps/common/functions/sanitize';
import * as Urls from '../../../steps/urls';

interface GovUkNunjucksSummary {
  key: {
    text?: string;
    html?: string;
    classes?: string;
  };
  value: {
    text?: string;
    html?: string;
  };
  actions?: {
    items?: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
  classes?: string;
}

interface SummaryListRow {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  visuallyHiddenText?: string;
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  visuallyHiddenTexts: Record<string, string>;
  language?: string;
  gender: Record<string, string>;
  applyingWith: Record<string, string>;
  yesNoNotsure: Record<string, string>;
  yesNoExtraSupport: Record<string, string>;
  languagePreference: Record<string, string>;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  const returnUrlQueryParam = `returnUrl=${Urls.CHECK_ANSWERS_URL}`;
  return rows.map(item => {
    let changeUrl = item.changeUrl;
    if (changeUrl) {
      changeUrl += `${changeUrl.indexOf('?') === -1 ? '?' : '&'}${returnUrlQueryParam}`;
    }
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: content.change as string,
                  visuallyHiddenText: item.visuallyHiddenText ? `${item.visuallyHiddenText}` : `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

export const applicationSummaryList = (
  { sectionTitles, keys, language, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => ({
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

export const adoptionAgencySummaryList = (
  { sectionTitles, keys, visuallyHiddenTexts, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  if (userCase.hasAnotherAdopAgencyOrLA === YesOrNo.NO) {
    return {
      title: sectionTitles.additionalAoptionagencyOrLA,
      rows: getSectionSummaryList(
        [
          {
            key: keys.additionalAdoptionAgency,
            value: content.yesNoExtraSupport[userCase.hasAnotherAdopAgencyOrLA],
            changeUrl: Urls.OTHER_ADOPTION_AGENCY,
          },
        ],
        content
      ),
    };
  }
  return {
    title: sectionTitles.additionalAoptionagencyOrLA,
    rows: getSectionSummaryList(
      [
        {
          key: keys.additionalAdoptionAgency,
          value: content.yesNoExtraSupport[userCase.hasAnotherAdopAgencyOrLA!],
          changeUrl: Urls.OTHER_ADOPTION_AGENCY,
        },
        {
          key: keys.name,
          value: userCase.adopAgencyOrLaName,
          changeUrl: Urls.ADOPTION_AGENCY,
          visuallyHiddenText: visuallyHiddenTexts.adopAgencyOrLaName,
        },
        {
          key: keys.nameOfContact,
          value: userCase.adopAgencyOrLaContactName,
          changeUrl: Urls.ADOPTION_AGENCY,
          visuallyHiddenText: visuallyHiddenTexts.adopAgencyOrLaContactName,
        },
        {
          key: keys.phoneNumber,
          value: userCase.adopAgencyOrLaPhoneNumber,
          changeUrl: Urls.ADOPTION_AGENCY,
          visuallyHiddenText: visuallyHiddenTexts.adopAgencyOrLaPhoneNumber,
        },
        {
          key: keys.address,
          valueHtml: getFormattedAddress(userCase, FieldPrefix.OTHER_ADOPTION_AGENCY),
          changeUrl: Urls.ADOPTION_AGENCY,
          visuallyHiddenText: visuallyHiddenTexts.adopAgencyAddress,
        },
        {
          key: keys.emailAddress,
          value: userCase.adopAgencyOrLaContactEmail,
          changeUrl: Urls.ADOPTION_AGENCY,
          visuallyHiddenText: visuallyHiddenTexts.adopAgencyOrLaContactEmail,
        },
      ],
      content
    ),
  };
};

export const childSocialWorkerSummaryList = (
  { sectionTitles, keys, visuallyHiddenTexts, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.childSocialWorkerDetails,
    rows: getSectionSummaryList(
      [
        {
          key: keys.childSocialWorkerName,
          value: userCase.childSocialWorkerName,
          changeUrl: Urls.SOCIAL_WORKER,
        },
        {
          key: keys.phoneNumber,
          value: userCase.childSocialWorkerPhoneNumber,
          changeUrl: Urls.SOCIAL_WORKER,
          visuallyHiddenText: visuallyHiddenTexts.childSocialWorkerPhoneNumber,
        },
        {
          key: keys.emailAddressIfKnown,
          value: userCase.childSocialWorkerEmail,
          changeUrl: Urls.SOCIAL_WORKER,
          visuallyHiddenText: visuallyHiddenTexts.childSocialWorkerEmail,
        },
        {
          key: keys.childLocalAuthority,
          value: userCase.childLocalAuthority,
          changeUrl: Urls.SOCIAL_WORKER,
        },
        {
          key: keys.childLocalAuthorityEmail,
          value: userCase.childLocalAuthorityEmail,
          changeUrl: Urls.SOCIAL_WORKER,
        },
      ],
      content
    ),
  };
};

export const applicantSocialWorkerSummaryList = (
  { sectionTitles, keys, visuallyHiddenTexts, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.applicantSocialWorkerDetails,
    rows: getSectionSummaryList(
      [
        {
          key: keys.applicantSocialWorkerName,
          value: userCase.applicantSocialWorkerName,
          changeUrl: Urls.APPLICANT_SOCIAL_WORKER,
        },
        {
          key: keys.phoneNumber,
          value: userCase.applicantSocialWorkerPhoneNumber,
          changeUrl: Urls.APPLICANT_SOCIAL_WORKER,
          visuallyHiddenText: visuallyHiddenTexts.applicantSocialWorkerPhoneNumber,
        },
        {
          key: keys.emailAddressIfKnown,
          value: userCase.applicantSocialWorkerEmail,
          changeUrl: Urls.APPLICANT_SOCIAL_WORKER,
          visuallyHiddenText: visuallyHiddenTexts.applicantSocialWorkerEmail,
        },
        {
          key: keys.applicantLocalAuthority,
          value: userCase.applicantLocalAuthority,
          changeUrl: Urls.APPLICANT_SOCIAL_WORKER,
        },
        {
          key: keys.applicantLocalAuthorityEmail,
          value: userCase.applicantLocalAuthorityEmail,
          changeUrl: Urls.APPLICANT_SOCIAL_WORKER,
        },
      ],
      content
    ),
  };
};

/* eslint-disable import/namespace */
export const applicantSummaryList = (
  { sectionTitles, keys, visuallyHiddenTexts, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
): SummaryList | undefined => {
  if (userCase.applyingWith === ApplyingWith.ALONE && prefix === FieldPrefix.APPLICANT2) {
    return;
  }

  const urlPrefix = prefix === FieldPrefix.APPLICANT1 ? 'APPLICANT_1_' : 'APPLICANT_2_';
  const visHidPrefix = prefix === FieldPrefix.APPLICANT1 ? keys.firstApplicantvisPrefix : keys.secondApplicantvisPrefix;
  let sectionTitle = sectionTitles.applicantDetails;
  let hasReasonableAdjustment = userCase.applicant1HasReasonableAdjustment;
  if (prefix === FieldPrefix.APPLICANT1 && userCase.applyingWith !== ApplyingWith.ALONE) {
    sectionTitle = sectionTitles.firstApplicantDetails;
  } else if (prefix === FieldPrefix.APPLICANT2) {
    sectionTitle = sectionTitles.secondApplicantDetails;
    hasReasonableAdjustment = userCase.applicant2HasReasonableAdjustment;
  }

  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      [
        {
          key: keys.fullName,
          value: userCase[`${prefix}FirstNames`] + ' ' + userCase[`${prefix}LastNames`],
          changeUrl: Urls[`${urlPrefix}FULL_NAME`],
          visuallyHiddenText: visHidPrefix + keys.fullName.toLowerCase(),
        },
        {
          key: keys.previousNames,
          valueHtml:
            userCase[`${prefix}HasOtherNames`] === YesOrNo.YES
              ? userCase[`${prefix}AdditionalNames`]
                  ?.map(item => sanitizeHtml(`${item.firstNames} ${item.lastNames}`))
                  .join('<br>')
              : '',
          changeUrl: Urls[`${urlPrefix}OTHER_NAMES`],
          visuallyHiddenText: visHidPrefix + keys.previousNames.toLowerCase(),
        },
        {
          key: keys.dateOfBirth,
          value: getFormattedDate(userCase[`${prefix}DateOfBirth`], content.language),
          changeUrl: Urls[`${urlPrefix}DOB`],
          visuallyHiddenText: visHidPrefix + keys.dateOfBirth.toLowerCase(),
        },
        {
          key: keys.occupation,
          value: userCase[`${prefix}Occupation`],
          changeUrl: Urls[`${urlPrefix}OCCUPATION`],
          visuallyHiddenText: visHidPrefix + keys.occupation.toLowerCase(),
        },
        {
          key: keys.extraSupport,
          value: content.yesNoExtraSupport[userCase[`${prefix}HasReasonableAdjustment`]],
          changeUrl: Urls[`${urlPrefix}EXTRA_SUPPORT`],
          visuallyHiddenText: visHidPrefix + keys.extraSupport.toLowerCase(),
        },
        ...(hasReasonableAdjustment === YesOrNo.YES
          ? [
              {
                key: keys.extraSupportDetails,
                value: userCase[`${prefix}ReasonableAdjustmentDetails`],
                changeUrl: Urls[`${urlPrefix}EXTRA_SUPPORT`],
                visuallyHiddenText: visHidPrefix + keys.extraSupportDetails.toLowerCase(),
              },
            ]
          : []),
        {
          key: keys.address,
          valueHtml: getFormattedAddress(userCase, prefix),
          changeUrl: Urls[`${urlPrefix}FIND_ADDRESS`],
          visuallyHiddenText: visHidPrefix + keys.address.toLowerCase(),
        },
        {
          key: keys.emailAddress,
          value: userCase[`${prefix}EmailAddress`],
          changeUrl: Urls[`${urlPrefix}CONTACT_DETAILS`],
          visuallyHiddenText: visHidPrefix + keys.emailAddress.toLowerCase(),
        },
        {
          key: keys.phoneNumber,
          value: userCase[`${prefix}PhoneNumber`],
          changeUrl: Urls[`${urlPrefix}CONTACT_DETAILS`],
          visuallyHiddenText: visHidPrefix + keys.phoneNumber.toLowerCase(),
        },
        {
          key: keys.languagePreference,
          value: content.languagePreference[userCase[`${prefix}LanguagePreference`]],
          changeUrl: Urls[`${urlPrefix}LANGUAGE_PREFERENCE`],
          visuallyHiddenText: visHidPrefix + keys.languagePreference.toLowerCase(),
        },
      ],
      content
    ),
  };
};

export const childrenSummaryList = (
  { sectionTitles, keys, visuallyHiddenTexts, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.childDetails,
    rows: getSectionSummaryList(
      [
        {
          key: keys.fullName,
          value: userCase.childrenFirstName + ' ' + userCase.childrenLastName,
          changeUrl: Urls.CHILDREN_FULL_NAME,
          visuallyHiddenText: visuallyHiddenTexts.fullName,
        },
        {
          key: keys.fullNameAfterAdoption,
          value: userCase.childrenFirstNameAfterAdoption + ' ' + userCase.childrenLastNameAfterAdoption,
          changeUrl: Urls.CHILDREN_FULL_NAME_AFTER_ADOPTION,
          visuallyHiddenText: visuallyHiddenTexts.fullNameAfterAdoption,
        },
        {
          key: keys.dateOfBirth,
          value: getFormattedDate(userCase.childrenDateOfBirth),
          changeUrl: Urls.CHILDREN_DATE_OF_BIRTH,
          visuallyHiddenText: visuallyHiddenTexts.dateOfBirth,
        },
      ],
      content
    ),
  };
};

export const familyCourtSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => ({
  title: sectionTitles.familyCourtDetails,
  rows: getSectionSummaryList(
    [
      {
        key: keys.placementCourtName,
        value: userCase.placementOrderCourt,
        changeUrl: Urls.CHILDREN_FIND_PLACEMENT_ORDER_COURT,
      },
      {
        key: keys.familyCourtName,
        value: userCase.familyCourtName,
        changeUrl: Urls.CHILDREN_FIND_FAMILY_COURT,
      },
    ],
    content
  ),
});
