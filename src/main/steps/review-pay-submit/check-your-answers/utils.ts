/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseDate, CaseWithId, Checkbox, FieldPrefix } from '../../../app/case/case';
import { AdditionalNationality, ApplyingWith, Nationality, YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent } from '../../../app/controller/GetController';
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

export const localAuthoritySummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.adoptionagencyOrLA,
    rows: getSectionSummaryList(
      [
        {
          key: keys.name,
          value: userCase.localAuthorityName,
          changeUrl: Urls.LOCAL_AUTHORITY,
        },
        {
          key: keys.nameOfContact,
          value: userCase.localAuthorityContactName,
          changeUrl: Urls.LOCAL_AUTHORITY,
        },
        {
          key: keys.phoneNumber,
          value: userCase.localAuthorityPhoneNumber,
          changeUrl: Urls.LOCAL_AUTHORITY,
        },
        {
          key: keys.emailAddress,
          value: userCase.localAuthorityContactEmail,
          changeUrl: Urls.LOCAL_AUTHORITY,
        },
      ],
      content
    ),
  };
};
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
          valueHtml:
            userCase.adopAgencyAddressLine1 + '<br>' + userCase.adopAgencyTown + '<br>' + userCase.adopAgencyPostcode,
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

  if (hasReasonableAdjustment === YesOrNo.NO) {
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
                ? userCase[`${prefix}AdditionalNames`]?.map(item => `${item.firstNames} ${item.lastNames}`).join('<br>')
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
              ? userCase[`${prefix}AdditionalNames`]?.map(item => `${item.firstNames} ${item.lastNames}`).join('<br>')
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
        {
          key: keys.extraSupportDetails,
          value: userCase[`${prefix}ReasonableAdjustmentDetails`],
          changeUrl: Urls[`${urlPrefix}EXTRA_SUPPORT`],
          visuallyHiddenText: visHidPrefix + keys.extraSupportDetails.toLowerCase(),
        },
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
/* eslint-enable import/namespace */

const formatNationalities = (
  nationality: (string | Nationality)[],
  additionalNationalities: AdditionalNationality[]
): string => {
  const nationalities = nationality.filter(item => item !== Nationality.OTHER);
  if (nationality.includes(Nationality.OTHER)) {
    nationalities.push(...additionalNationalities.map(item => item.country));
  }
  return nationalities.join('<br>');
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

const getNotSureReasonElement = (content, userCase, notSure, reasonFieldName): string => {
  return `${notSure}<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">${content.reason}: </span>${userCase[reasonFieldName]}</p>`;
};

/* eslint-disable import/namespace */
export const birthParentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
): SummaryList => {
  const urlPrefix = prefix === FieldPrefix.BIRTH_MOTHER ? 'BIRTH_MOTHER_' : 'BIRTH_FATHER_';
  const reasonFieldName =
    prefix === FieldPrefix.BIRTH_MOTHER ? `${prefix}NotAliveReason` : `${prefix}UnsureAliveReason`;
  return {
    title: sectionTitles[`${prefix}Details`],
    rows: getSectionSummaryList(
      [
        ...(prefix === FieldPrefix.BIRTH_FATHER
          ? [
              {
                key: keys.nameOnBirthCertificate,
                value: content.yesNoNotsure[userCase.birthFatherNameOnCertificate!],
                changeUrl: Urls[`${urlPrefix}NAME_ON_CERTIFICATE`],
              },
            ]
          : []),
        ...(prefix === FieldPrefix.BIRTH_MOTHER || userCase.birthFatherNameOnCertificate === YesOrNo.YES
          ? [
              {
                key: keys.fullName,
                value: userCase[`${prefix}FirstNames`] + ' ' + userCase[`${prefix}LastNames`],
                changeUrl: Urls[`${urlPrefix}FULL_NAME`],
              },
              {
                key: keys.alive,
                valueHtml:
                  userCase[`${prefix}StillAlive`] === YesNoNotsure.NOT_SURE
                    ? getNotSureReasonElement(
                        content,
                        userCase,
                        content.yesNoNotsure[userCase[`${prefix}StillAlive`]],
                        reasonFieldName
                      )
                    : content.yesNoNotsure[userCase[`${prefix}StillAlive`]],
                changeUrl: Urls[`${urlPrefix}STILL_ALIVE`],
              },
              ...(userCase[`${prefix}StillAlive`] === YesOrNo.YES
                ? [
                    {
                      key: keys.nationality,
                      valueHtml: formatNationalities(
                        userCase[`${prefix}Nationality`],
                        userCase[`${prefix}AdditionalNationalities`]
                      ),
                      changeUrl: Urls[`${urlPrefix}NATIONALITY`],
                    },
                    {
                      key: keys.occupation,
                      value: userCase[`${prefix}Occupation`],
                      changeUrl: Urls[`${urlPrefix}OCCUPATION`],
                    },
                    {
                      key: keys.addressKnown,
                      valueHtml:
                        userCase[`${prefix}AddressKnown`] === YesOrNo.NO
                          ? getNotSureReasonElement(
                              content,
                              userCase,
                              content.yesNoNotsure[userCase[`${prefix}AddressKnown`]],
                              `${prefix}AddressNotKnownReason`
                            )
                          : content.yesNoNotsure[userCase[`${prefix}AddressKnown`]],
                      changeUrl: Urls[`${urlPrefix}ADDRESS_KNOWN`],
                    },
                    ...(userCase[`${prefix}AddressKnown`] === YesOrNo.YES
                      ? [
                          {
                            key: keys.address,
                            valueHtml: getFormattedAddress(userCase, prefix),
                            changeUrl: userCase[`${prefix}AddressCountry`]
                              ? Urls[`${urlPrefix}INTERNATIONAL_ADDRESS`]
                              : Urls[`${urlPrefix}MANUAL_ADDRESS`],
                          },
                        ]
                      : []),
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

export const otherParentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.otherParentDetails,
    rows: getSectionSummaryList(
      [
        {
          key: keys.otherParent,
          value: content.yesNoNotsure[userCase.otherParentExists!],
          changeUrl: Urls.OTHER_PARENT_EXISTS,
        },
        ...(userCase.otherParentExists === YesOrNo.YES
          ? [
              {
                key: keys.fullName,
                value: userCase.otherParentFirstNames + ' ' + userCase.otherParentLastNames,
                changeUrl: Urls.OTHER_PARENT_NAME,
              },
              {
                key: keys.addressKnown,
                valueHtml:
                  userCase.otherParentAddressKnown === YesOrNo.NO
                    ? getNotSureReasonElement(
                        content,
                        userCase,
                        content.yesNoNotsure[userCase.otherParentAddressKnown],
                        'otherParentAddressNotKnownReason'
                      )
                    : content.yesNoNotsure[userCase.otherParentAddressKnown!],
                changeUrl: Urls.OTHER_PARENT_ADDRESS_KNOWN,
              },
              ...(userCase.otherParentAddressKnown === YesOrNo.YES
                ? [
                    {
                      key: keys.address,
                      valueHtml: getFormattedAddress(userCase, FieldPrefix.OTHER_PARENT),
                      changeUrl: Urls.OTHER_PARENT_MANUAL_ADDRESS,
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

export const childrenPlacementOrderSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  return {
    title: sectionTitles.childPlacementAndCourtOrders,
    rows: userCase.placementOrders!.reduce(
      (acc: GovUkNunjucksSummary[], item, index) => [
        ...acc,
        ...getSectionSummaryList(
          [
            {
              keyHtml: `<h3 class="govuk-heading-s ${index !== 0 ? 'govuk-!-margin-top-8' : ''}">${
                index === 0 ? keys.placementOrder : keys.courtOrder
              }</h3>`,
              classes: 'govuk-summary-list__row--no-border',
            },
            {
              key: keys.typeOfOrder,
              value: item.placementOrderType || keys.placementOrder,
              changeUrl:
                index !== 0 ? `${Urls.CHILDREN_PLACEMENT_ORDER_TYPE}?change=${item.placementOrderId}` : undefined,
            },
            {
              key: keys.orderNumber,
              value: item.placementOrderNumber,
              changeUrl: `${Urls.CHILDREN_PLACEMENT_ORDER_NUMBER}?change=${item.placementOrderId}`,
            },
            {
              key: keys.court,
              value: item.placementOrderCourt,
              changeUrl: `${Urls.CHILDREN_PLACEMENT_ORDER_COURT}?change=${item.placementOrderId}`,
            },
            {
              key: keys.date,
              valueHtml: getFormattedDate(item.placementOrderDate as CaseDate, content.language),
              changeUrl: `${Urls.CHILDREN_PLACEMENT_ORDER_DATE}?change=${item.placementOrderId}`,
            },
          ],
          content
        ),
      ],
      []
    ),
  };
};

export const siblingCourtOrderSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
  const siblingList = getSectionSummaryList(
    [
      {
        key: keys.siblingOrHalfSibling,
        valueHtml: content.yesNoNotsure[userCase.hasSiblings!],
        changeUrl: `${Urls.SIBLING_EXISTS}`,
      },
    ],
    content
  );

  const siblingCourtOrderList =
    userCase.hasSiblings === YesNoNotsure.YES
      ? userCase.siblings!.reduce(
          (rows: GovUkNunjucksSummary[], sibling) => [
            ...rows,
            ...getSectionSummaryList(
              [
                {
                  keyHtml: `<h3 class="govuk-heading-s govuk-!-margin-top-8">${keys.courtOrder}</h3>`,
                  classes: 'govuk-summary-list__row--no-border',
                },
                {
                  key: keys.siblingRelation,
                  value: sibling.siblingRelation,
                  changeUrl: `${Urls.SIBLING_RELATION}?change=${sibling.siblingId}`,
                },
                {
                  key: keys.typeOfOrder,
                  value: sibling.siblingPoType,
                  changeUrl: `${Urls.SIBLING_ORDER_TYPE}?change=${sibling.siblingId}`,
                },
                {
                  key: keys.orderNumber,
                  value: sibling.siblingPoNumber,
                  changeUrl: `${Urls.SIBLING_ORDER_CASE_NUMBER}?change=${sibling.siblingId}`,
                },
              ],
              content
            ),
          ],
          []
        )
      : [];

  return {
    title: sectionTitles.siblingCourtOrders,
    rows: [...siblingList, ...siblingCourtOrderList],
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

const formatDocuments = (userCase: Partial<CaseWithId>) => {
  const documentFileNames = userCase.applicant1DocumentsUploaded?.map(item => item.value?.documentFileName);
  return documentFileNames?.join('<br>');
};

const formatNotUploadedDocuments = (userCase: Partial<CaseWithId>, content: PageContent) => {
  const documentTypes = userCase.applicant1CannotUploadDocuments?.map(
    item => (content.documentTypes as Record<string, string>)[item]
  );
  return documentTypes?.join('<br>');
};

export const uploadedDocumentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => ({
  title: sectionTitles.uploadedDocuments,
  rows: getSectionSummaryList(
    [
      {
        key: keys.uploadedDocuments,
        valueHtml: formatDocuments(userCase),
        changeUrl: Urls.UPLOAD_YOUR_DOCUMENTS,
      },
      ...(userCase.applicant1CannotUpload === Checkbox.Checked
        ? [
            {
              key: keys.documentsNotUploaded,
              valueHtml: formatNotUploadedDocuments(userCase, content),
              changeUrl: Urls.UPLOAD_YOUR_DOCUMENTS,
            },
          ]
        : []),
    ],
    content
  ),
});
