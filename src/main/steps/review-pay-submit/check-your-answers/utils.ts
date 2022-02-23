import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseDate, CaseWithId, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, Nationality, PlacementOrder, YesNoNotsure, YesOrNo } from '../../../app/case/definition';
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
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
  gender: Record<string, string>;
  applyingWith: Record<string, string>;
  yesNoNotsure: Record<string, string>;
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
                  visuallyHiddenText: `Change ${item.key}`,
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
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  agencyIndex = 0
): SummaryList => {
  let adoptionAgency;
  if (agencyIndex === 0 || (agencyIndex === 1 && userCase.hasAnotherAdopAgencyOrLA === YesOrNo.YES)) {
    adoptionAgency = userCase.adopAgencyOrLAs![agencyIndex];
  }

  const changeUrl = `${Urls.ADOPTION_AGENCY}?change=${adoptionAgency?.adopAgencyOrLaId}`;
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
                changeUrl,
              },
              {
                key: keys.phoneNumber,
                value: adoptionAgency?.adopAgencyOrLaPhoneNumber,
                changeUrl,
              },
              {
                key: keys.nameOfContact,
                value: adoptionAgency?.adopAgencyOrLaContactName,
                changeUrl,
              },
              {
                key: keys.emailOfContact,
                value: adoptionAgency?.adopAgencyOrLaContactEmail,
                changeUrl,
              },
            ]
          : []),
      ],
      content
    ),
  };
};

export const socialWorkerSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => {
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
export const applicantSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
): SummaryList | undefined => {
  if (userCase.applyingWith === ApplyingWith.ALONE && prefix === FieldPrefix.APPLICANT2) {
    return;
  }

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
          valueHtml:
            userCase[`${prefix}HasOtherNames`] === YesOrNo.YES
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

const formatNationalities = (nationality: (string | Nationality)[], additionalNationalities: string[]): string => {
  const nationalities = nationality.filter(item => item !== Nationality.OTHER);
  if (nationality.includes(Nationality.OTHER)) {
    nationalities.push(...additionalNationalities);
  }
  return nationalities.join('<br>');
};

export const childrenSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
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
          valueHtml: formatNationalities(userCase.childrenNationality!, userCase.childrenAdditionalNationalities!),
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

const getNotSureReasonElement = (userCase, notSure, reasonFieldName): string => {
  return `${notSure}<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span>${userCase[reasonFieldName]}</p>`;
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
  //TODO add a row for birth father name on certificate
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
              ? getNotSureReasonElement(
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
                      changeUrl: Urls[`${urlPrefix}ADDRESS_MANUAL`], //TODO consider international address
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
                      changeUrl: Urls.OTHER_PARENT_MANUAL_ADDRESS, //TODO consider international address
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
  //TODO handle no placement order case
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
        keyHtml: `<h3 class="govuk-heading-s">${keys.siblingCourtOrders}</h3>`,
        classes: 'govuk-summary-list__row--no-border',
      },
      ...userCase.siblings!.map(sibling => ({
        key: keys.siblingName,
        value: sibling.siblingFirstName + ' ' + sibling.siblingLastNames,
        changeUrl: `${Urls.SIBLING_NAME}?change=${sibling.siblingId}`,
      })),
    ],
    content
  );

  const siblingCourtOrderList = userCase.siblings!.reduce(
    (rows: GovUkNunjucksSummary[], sibling) => [
      ...rows,
      ...sibling.siblingPlacementOrders!.reduce(
        (acc: GovUkNunjucksSummary[], item) => [
          ...acc,
          ...getSectionSummaryList(
            [
              {
                keyHtml: `<h3 class="govuk-heading-s govuk-!-margin-top-8">${keys.courtOrder}</h3>`,
                classes: 'govuk-summary-list__row--no-border',
              },
              {
                key: keys.siblingName,
                value: sibling.siblingFirstName + ' ' + sibling.siblingLastNames,
              },
              {
                key: keys.typeOfOrder,
                value: (item as PlacementOrder).placementOrderType,
                changeUrl: `${Urls.SIBLING_ORDER_TYPE}?change=${sibling.siblingId}/${
                  (item as PlacementOrder).placementOrderId
                }`,
              },
              {
                key: keys.orderNumber,
                value: (item as PlacementOrder).placementOrderNumber,
                changeUrl: `${Urls.SIBLING_ORDER_CASE_NUMBER}?change=${sibling.siblingId}/${
                  (item as PlacementOrder).placementOrderId
                }`,
              },
            ],
            content
          ),
        ],
        []
      ),
    ],
    []
  );

  return {
    title: sectionTitles.siblingCourtOrders,
    rows: [...siblingList, ...siblingCourtOrderList],
  };
};

export const familyCourtSummaryList = ({
  sectionTitles,
  keys,
  ...content
}: SummaryListContent): // userCase: Partial<CaseWithId>
SummaryList => ({
  title: sectionTitles.familyCourtDetails,
  rows: getSectionSummaryList(
    [
      {
        key: keys.familyCourtName,
        value: 'TBD',
        changeUrl: '#',
      },
    ],
    content
  ),
});

const formatDocuments = (userCase: Partial<CaseWithId>) => {
  const documentFileNames = userCase.applicant1DocumentsUploaded?.map(item => item.value?.documentFileName);
  return documentFileNames?.join('<br>');
};

export const uploadedDocumentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList => ({
  title: sectionTitles.uploadedDocuments,
  rows: getSectionSummaryList(
    [
      {
        key: keys.childDocuments,
        valueHtml: formatDocuments(userCase),
        changeUrl: Urls.UPLOAD_YOUR_DOCUMENTS,
      },
    ],
    content
  ),
});
