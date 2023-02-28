import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseDate, CaseWithId, Checkbox, FieldPrefix } from '../../../app/case/case';
import {
  AdditionalNationality,
  Nationality,
  ResponsibilityReasons,
  YesNoNotsure,
  YesOrNo,
} from '../../../app/case/definition';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent } from '../../../app/controller/GetController';
import * as Urls from '../../../steps/urls';

interface GovUKNunjucksSummary {
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

interface SummaryListRows {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
}

interface SummaryLists {
  title: string;
  rows: GovUKNunjucksSummary[];
}

type SummaryListsContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
  gender: Record<string, string>;
  applyingWith: Record<string, string>;
  yesNoNotsure: Record<string, string>;
  languagePreference: Record<string, string>;
  siblingRelationships: Record<string, string>;
  siblingPlacementOrderType: Record<string, string>;
  placementOrderType: Record<string, string>;
  responsibilityReasons: Record<string, string>;
};

const getSectionSummaryLists = (rows: SummaryListRows[], content: PageContent): GovUKNunjucksSummary[] => {
  const returnUrlQueryParam = `returnUrl=${Urls.LA_PORTAL_CHECK_YOUR_ANSWERS}`;
  return rows.map(item => {
    let changeURL = item.changeUrl;
    if (changeURL) {
      changeURL += `${changeURL.indexOf('?') === -1 ? '?' : '&'}${returnUrlQueryParam}`;
    }
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeURL
        ? {
            actions: {
              items: [
                {
                  href: changeURL,
                  text: content.change as string,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

export const caseRefSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => {
  return {
    title: '',
    rows: getSectionSummaryLists(
      [
        {
          key: keys.caseRefNumber,
          value: userCase.hyphenatedCaseRef,
        },
      ],
      content
    ),
  };
};

export const childSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => {
  return {
    title: sectionTitles.childDetails,
    rows: getSectionSummaryLists(
      [
        ...(!userCase.childrenFirstName && !userCase.childrenLastName
          ? [
              {
                key: keys.fullName,
                value: ' ',
              },
            ]
          : [
              {
                key: keys.fullName,
                value: userCase.childrenFirstName + ' ' + userCase.childrenLastName,
              },
            ]),
        {
          key: keys.dateOfBirth,
          value: getFormattedDate(userCase.childrenDateOfBirth),
        },
        {
          key: keys.sexAtBirth,
          value: content.gender[userCase.childrenSexAtBirth!],
          changeUrl: Urls.LA_PORTAL_CHILD_SEX_AT_BIRTH,
        },
        {
          key: keys.nationality,
          valueHtml: formatNationalities(userCase.childrenNationality!, userCase.childrenAdditionalNationalities!),
          changeUrl: Urls.LA_PORTAL_CHILD_NATIONALITY,
        },
      ],
      content
    ),
  };
};

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

const formatResponsibilityReasons = (
  responsibility: (string | ResponsibilityReasons)[],
  otherReasonText: string,
  content: { responsibilityReasons: { [x: string]: never } },
  reasonText: string
): string => {
  const responsibilities = responsibility.filter(item => item !== ResponsibilityReasons.OTHER);
  const translatedResponsibilities = [];
  const responsibilityText = `<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">${reasonText}: </span> `;
  responsibilities.forEach(element => translatedResponsibilities.push(content.responsibilityReasons[element]));

  if (responsibility.includes(ResponsibilityReasons.OTHER) && translatedResponsibilities.length === 0) {
    return responsibilityText + otherReasonText;
  } else if (responsibility.includes(ResponsibilityReasons.OTHER)) {
    return responsibilityText + translatedResponsibilities.join('<br>') + '<br>' + otherReasonText;
  }
  return responsibilityText + translatedResponsibilities.join('<br>');
};

/* eslint-disable import/namespace */
export const birthParentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
): SummaryLists => {
  const LA_PORTAL = 'LA_PORTAL_';
  const urlPrefix = prefix === FieldPrefix.BIRTH_MOTHER ? 'BIRTH_MOTHER_' : 'BIRTH_FATHER_';
  const reasonFieldName =
    prefix === FieldPrefix.BIRTH_MOTHER ? `${prefix}NotAliveReason` : `${prefix}UnsureAliveReason`;
  return {
    title: sectionTitles[`${prefix}Details`],
    rows: getSectionSummaryLists(
      prepareSummaryList(prefix, keys, content, userCase, LA_PORTAL, urlPrefix, reasonFieldName),
      content
    ),
  };
};

function prepareSummaryList(
  prefix: FieldPrefix,
  keys: Record<string, string>,
  content,
  userCase: Partial<CaseWithId>,
  LA_PORTAL: string,
  urlPrefix: string,
  reasonFieldName: string
) {
  return [
    ...(prefix === FieldPrefix.BIRTH_FATHER
      ? [
          {
            key: keys.nameOnBirthCertificate,
            value: content.yesNoNotsure[userCase.birthFatherNameOnCertificate!],
            changeUrl: Urls[`${LA_PORTAL}${urlPrefix}NAME_ON_CERTIFICATE`],
          },
        ]
      : []),
    ...(prefix === FieldPrefix.BIRTH_MOTHER || userCase.birthFatherNameOnCertificate === YesOrNo.YES
      ? fieldPrefixBirthMother(keys, userCase, prefix, LA_PORTAL, urlPrefix, content, reasonFieldName)
      : []),
  ];
}

function fieldPrefixBirthMother(
  keys: Record<string, string>,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix,
  LA_PORTAL: string,
  urlPrefix: string,
  content,
  reasonFieldName: string
) {
  return [
    {
      key: keys.fullName,
      value: userCase[`${prefix}FirstNames`] + ' ' + userCase[`${prefix}LastNames`],
      changeUrl: Urls[`${LA_PORTAL}${urlPrefix}FULL_NAME`],
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
      changeUrl: Urls[`${LA_PORTAL}${urlPrefix}STILL_ALIVE`],
    },
    ...(userCase[`${prefix}StillAlive`] === YesOrNo.YES
      ? [
          ...(prefix === FieldPrefix.BIRTH_FATHER
            ? [
                {
                  key: keys.responsibility,
                  valueHtml: content.yesNoNotsure[userCase.birthFatherResponsibility!],
                  changeUrl: Urls.LA_PORTAL_BIRTH_FATHER_PARENTAL_RESPONSIBILITY,
                  classes: 'govuk-summary-list__row--no-border',
                },
                ...(userCase['birthFatherResponsibility'] === YesOrNo.YES
                  ? [
                      {
                        keyHtml: ' ',
                        key: content.reason,
                        valueHtml: formatResponsibilityReasons(
                          userCase['birthFatherResponsibilityReason']!,
                          userCase['birthFatherOtherResponsibilityReason']!,
                          content,
                          content.reason
                        ),
                        changeUrl: Urls.LA_PORTAL_BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED,
                      },
                    ]
                  : [
                      {
                        keyHtml: ' ',
                        key: content.reason,
                        valueHtml: formatResponsibilityReasons(
                          userCase['birthFatherResponsibilityReason']!,
                          userCase['birthFatherOtherResponsibilityReason']!,
                          content,
                          content.reason
                        ),
                        changeUrl: Urls.LA_PORTAL_BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY,
                      },
                    ]),
              ]
            : []),
          {
            key: keys.nationality,
            valueHtml: formatNationalities(
              userCase[`${prefix}Nationality`],
              userCase[`${prefix}AdditionalNationalities`]
            ),
            changeUrl: Urls[`${LA_PORTAL}${urlPrefix}NATIONALITY`],
          },
          {
            key: keys.occupation,
            value: userCase[`${prefix}Occupation`],
            changeUrl: Urls[`${LA_PORTAL}${urlPrefix}OCCUPATION`],
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
            changeUrl: Urls[`${LA_PORTAL}${urlPrefix}ADDRESS_KNOWN`],
          },
          ...(userCase[`${prefix}AddressKnown`] === YesOrNo.YES
            ? knownAddress(keys, userCase, LA_PORTAL, prefix, urlPrefix)
            : []),
          ...(userCase[`${prefix}AddressKnown`] === YesOrNo.YES
            ? lastAddressKnown(keys, userCase, LA_PORTAL, prefix, urlPrefix)
            : []),
        ]
      : []),
  ];
}

function knownAddress(
  keys: Record<string, string>,
  userCase: Partial<CaseWithId>,
  LA_PORTAL: string,
  prefix: FieldPrefix,
  urlPrefix: string
) {
  return [
    {
      key: keys.address,
      valueHtml: getFormattedAddress(userCase, prefix),
      changeUrl: userCase[`${prefix}AddressCountry`]
        ? Urls[`${LA_PORTAL}${urlPrefix}INTERNATIONAL_ADDRESS`]
        : Urls[`${LA_PORTAL}${urlPrefix}MANUAL_ADDRESS`],
    },
  ];
}

function lastAddressKnown(
  keys: Record<string, string>,
  userCase: Partial<CaseWithId>,
  LA_PORTAL: string,
  prefix: FieldPrefix,
  urlPrefix: string
) {
  return [
    {
      key: keys.addressConfirmedDate,
      valueHtml: getFormattedDate(userCase[`${prefix}LastAddressDate`], 'en'),
      changeUrl: Urls[`${LA_PORTAL}${urlPrefix}LAST_ADDRESS_CONFIRMED`],
    },
  ];
}

const getNotSureReasonElement = (content, userCase, notSure, reasonFieldName): string => {
  return `${notSure}<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">${content.reason}: </span>${userCase[reasonFieldName]}</p>`;
};

export const otherParentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => {
  return {
    title: sectionTitles.otherParentDetails,
    rows: getSectionSummaryLists(
      [
        {
          key: keys.otherParent,
          value: content.yesNoNotsure[userCase.otherParentExists!],
          changeUrl: Urls.LA_PORTAL_OTHER_PARENT_EXISTS,
        },
        ...(userCase.otherParentExists === YesOrNo.YES
          ? [
              {
                key: keys.fullName,
                value: userCase.otherParentFirstNames + ' ' + userCase.otherParentLastNames,
                changeUrl: Urls.LA_PORTAL_OTHER_PARENT_FULL_NAME,
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
                changeUrl: Urls.LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN,
              },
              ...(userCase.otherParentAddressKnown === YesOrNo.YES
                ? [
                    {
                      key: keys.address,
                      valueHtml: getFormattedAddress(userCase, FieldPrefix.OTHER_PARENT),
                      changeUrl: Urls.LA_PORTAL_OTHER_PARENT_MANUAL_ADDRESS,
                    },
                  ]
                : []),
              ...(userCase.otherParentAddressKnown === YesOrNo.YES
                ? [
                    {
                      key: keys.addressConfirmedDate,
                      valueHtml: getFormattedDate(userCase.otherParentLastAddressDate, 'en'),
                      changeUrl: Urls.LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED,
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
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => {
  return {
    title: sectionTitles.childPlacementAndCourtOrders,
    rows: userCase.placementOrders!.reduce(
      (acc: GovUKNunjucksSummary[], item, index) => [
        ...acc,
        ...getSectionSummaryLists(
          [
            {
              keyHtml: `<h3 class="govuk-heading-s ${index !== 0 ? 'govuk-!-margin-top-8' : ''}">${
                index === 0 ? keys.placementOrder : keys.courtOrder
              }</h3>`,
              classes: 'govuk-summary-list__row--no-border',
            },
            {
              key: keys.typeOfOrder,
              value: content.placementOrderType[item.placementOrderType!] || keys.placementOrder,
              changeUrl:
                index !== 0
                  ? `${Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE}?change=${item.placementOrderId}`
                  : undefined,
            },
            {
              key: keys.orderNumber,
              value: item.placementOrderNumber,
              changeUrl: `${Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER}?change=${item.placementOrderId}`,
            },
            ...(index !== 0
              ? [
                  {
                    key: keys.court,
                    value: item.placementOrderCourt,
                    changeUrl: `${Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT}?change=${item.placementOrderId}`,
                  },
                ]
              : []),
            {
              key: keys.date,
              valueHtml: getFormattedDate(item.placementOrderDate as CaseDate, content.language),
              changeUrl: `${Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE}?change=${item.placementOrderId}`,
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
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => {
  const siblingList = getSectionSummaryLists(
    [
      {
        key: keys.siblingOrHalfSibling,
        valueHtml: content.yesNoNotsure[userCase.hasSiblings!],
        changeUrl: `${Urls.LA_PORTAL_SIBLING_EXISTS}`,
      },
    ],
    content
  );

  const siblingCourtOrderList =
    userCase.hasSiblings === YesNoNotsure.YES
      ? userCase.siblings!.reduce(
          (rows: GovUKNunjucksSummary[], sibling) => [
            ...rows,
            ...getSectionSummaryLists(
              [
                {
                  keyHtml: `<h3 class="govuk-heading-s govuk-!-margin-top-8">${keys.courtOrder}</h3>`,
                  classes: 'govuk-summary-list__row--no-border',
                },
                {
                  key: keys.siblingRelation,
                  value: content.siblingRelationships[sibling.siblingRelation!],
                  changeUrl: `${Urls.LA_PORTAL_SIBLING_RELATION}?change=${sibling.siblingId}`,
                },
                {
                  key: keys.typeOfOrder,
                  value: content.siblingPlacementOrderType[sibling.siblingPoType!],
                  changeUrl: `${Urls.LA_PORTAL_SIBLING_ORDER_TYPE}?change=${sibling.siblingId}`,
                },
                {
                  key: keys.orderNumber,
                  value: sibling.siblingPoNumber,
                  changeUrl: `${Urls.LA_PORTAL_SIBLING_ORDER_CASE_NUMBER}?change=${sibling.siblingId}`,
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

export const uploadedDocumentSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListsContent,
  userCase: Partial<CaseWithId>
): SummaryLists => ({
  title: sectionTitles.uploadedDocuments,
  rows: getSectionSummaryLists(
    [
      {
        key: keys.uploadedDocuments,
        valueHtml: formatDocument(userCase),
        changeUrl: Urls.LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
      },
      ...(userCase.applicant1CannotUpload === Checkbox.Checked
        ? [
            {
              key: keys.documentsNotUploaded,
              valueHtml: formatNotUploadedDocument(userCase, content),
              changeUrl: Urls.LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
            },
          ]
        : []),
    ],
    content
  ),
});

const formatDocument = (userCase: Partial<CaseWithId>) => {
  if ((userCase.laUploadedFiles as unknown as string) !== '[]') {
    let documentFileNames;
    if (typeof userCase.laUploadedFiles === 'object') {
      documentFileNames = userCase.laUploadedFiles.map(item => item.name);
    } else {
      documentFileNames = userCase.laUploadedFiles ? JSON.parse(userCase?.laUploadedFiles).map(item => item.name) : [];
    }
    return documentFileNames?.join('<br>');
  }
};

const formatNotUploadedDocument = (userCase: Partial<CaseWithId>, content: PageContent) => {
  const documentTypes = userCase.applicant1CannotUploadDocuments?.map(
    item => (content.documentTypes as Record<string, string>)[item]
  );
  return documentTypes?.join('<br>');
};
