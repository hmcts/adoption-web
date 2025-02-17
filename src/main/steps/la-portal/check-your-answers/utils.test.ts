import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { Checkbox, FieldPrefix } from '../../../app/case/case';
import { DocumentType, ResponsibilityReasons, YesNoNotsure, YesOrNo } from '../../../app/case/definition';

import { enContent } from './content';
import {
  birthParentSummaryList,
  caseRefSummaryList,
  childSummaryList,
  childrenPlacementOrderSummaryList,
  otherParentSummaryList,
  siblingCourtOrderSummaryList,
  uploadedDocumentSummaryList,
} from './utils';

describe('caseRefSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: '',
        rows: [
          {
            key: { text: 'Court case reference number' },
            value: { text: '1234-5678-9012-3456' },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(caseRefSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});

describe('childSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: "Child's details",
        rows: [
          {
            key: { text: 'Full name' },
            value: { text: 'CHILDREN_FIRST_NAMES CHILDREN_LAST_NAMES' },
            /* actions: {
              items: [
                {
                  href: '/children/full-name?returnUrl=/review-pay-submit/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Full name',
                },
              ],
            }, */
          },
          {
            key: { text: 'Date of birth' },
            value: { text: '9 August 2020' },
            /* actions: {
              items: [
                {
                  href: '/children/date-of-birth?returnUrl=/review-pay-submit/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Date of birth',
                },
              ],
            }, */
          },
          {
            key: { text: 'Sex at birth' },
            value: { text: 'Male' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/sex-at-birth?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: "Child's sex at birth",
                },
              ],
            },
          },
          {
            key: { text: 'Nationality' },
            value: { html: 'British<br>MOCK_COUNTRY' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/nationality?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: "Child's nationality",
                },
              ],
            },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(childSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});

describe('birthParentSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      fieldPrefix: FieldPrefix.BIRTH_MOTHER,
      expected: {
        title: "Birth mother's details",
        rows: [
          {
            key: { text: 'Full name' },
            value: { text: 'BIRTH_MOTHER_FIRST_NAMES BIRTH_MOTHER_LAST_NAMES' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother full name',
                },
              ],
            },
          },
          {
            key: { text: 'Alive' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/still-alive?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother alive',
                },
              ],
            },
          },
          {
            key: { text: 'Nationality' },
            value: { html: 'British<br>MOCK_COUNTRY' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/nationality?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother nationality',
                },
              ],
            },
          },
          {
            key: { text: 'Occupation' },
            value: { text: 'MOCK_OCCUPATION' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/occupation?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother occupation',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother address known',
                },
              ],
            },
          },
          {
            key: { text: 'Address' },
            value: {
              html: 'MOCK_ADDRESS_LINE1<br>MOCK_ADDRESS_LINE2<br>MOCK_ADDRESS_LINE3<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE<br>MOCK_ADDRESS_COUNTRY',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/address/international?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth mother address',
                },
              ],
            },
          },
          {
            key: { text: 'Last date this address was confirmed' },
            value: { html: '1 April 2022' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/last-address-confirmed?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Last date this address was confirmed by birth mother',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-mother/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by birth mother?',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: mockUserCase,
      fieldPrefix: FieldPrefix.BIRTH_FATHER,
      expected: {
        title: "Birth father's details",
        rows: [
          {
            key: { text: 'Name on birth certificate' },
            value: { text: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/name-on-certificate?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father name on birth certificate',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father full name',
                },
              ],
            },
          },
          {
            key: { text: 'Alive' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/still-alive?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father alive',
                },
              ],
            },
          },
          {
            key: { text: 'Does birth father have parental responsibility?' },
            value: {
              html: 'Yes',
            },
            classes: 'govuk-summary-list__row--no-border',
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Does birth father have parental responsibility?',
                },
              ],
            },
          },
          {
            key: { text: 'Reason', html: ' ' },
            value: {
              html: '<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span> Birth certificate',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility/granted?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father parental responsibility reason',
                },
              ],
            },
          },
          {
            key: { text: 'Nationality' },
            value: { html: 'British' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/nationality?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father nationality',
                },
              ],
            },
          },
          {
            key: { text: 'Occupation' },
            value: { text: 'MOCK_OCCUPATION' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/occupation?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father occupation',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father address known',
                },
              ],
            },
          },
          {
            key: { text: 'Address' },
            value: {
              html: 'MOCK_ADDRESS_LINE1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/address/manual?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father address',
                },
              ],
            },
          },
          {
            key: { text: 'Last date this address was confirmed' },
            value: { html: '1 April 2022' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/last-address-confirmed?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Last date this address was confirmed by birth father',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by birth father?',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        birthFatherStillAlive: YesNoNotsure.NOT_SURE,
        birthFatherUnsureAliveReason: 'MOCK_REASON',
      },
      fieldPrefix: FieldPrefix.BIRTH_FATHER,
      expected: {
        title: "Birth father's details",
        rows: [
          {
            key: { text: 'Name on birth certificate' },
            value: { text: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/name-on-certificate?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father name on birth certificate',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father full name',
                },
              ],
            },
          },
          {
            key: { text: 'Alive' },
            value: {
              html: 'Not sure<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span>MOCK_REASON</p>',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/still-alive?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father alive',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        birthFatherAddressKnown: YesOrNo.NO,
        birthFatherAddressNotKnownReason: 'MOCK_REASON',
        birthFatherResponsibility: YesOrNo.NO,
        birthFatherResponsibilityReason: [ResponsibilityReasons.REMOVED_BY_COURT],
      },
      fieldPrefix: FieldPrefix.BIRTH_FATHER,
      expected: {
        title: "Birth father's details",
        rows: [
          {
            key: { text: 'Name on birth certificate' },
            value: { text: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/name-on-certificate?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father name on birth certificate',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father full name',
                },
              ],
            },
          },
          {
            key: { text: 'Alive' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/still-alive?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father alive',
                },
              ],
            },
          },
          {
            key: { text: 'Does birth father have parental responsibility?' },
            value: { html: 'No' },
            classes: 'govuk-summary-list__row--no-border',
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Does birth father have parental responsibility?',
                },
              ],
            },
          },
          {
            key: { text: 'Reason', html: ' ' },
            value: {
              html: '<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span> Parental responsibility removed by court',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility/no-responsibility?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father parental responsibility reason',
                },
              ],
            },
          },
          {
            key: { text: 'Nationality' },
            value: { html: 'British' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/nationality?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father nationality',
                },
              ],
            },
          },
          {
            key: { text: 'Occupation' },
            value: { text: 'MOCK_OCCUPATION' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/occupation?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father occupation',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: {
              html: 'No<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span>MOCK_REASON</p>',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father address known',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by birth father?',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        birthFatherNameOnCertificate: YesOrNo.NO,
        birthFatherIdentityKnown: YesOrNo.NO,
      },
      fieldPrefix: FieldPrefix.BIRTH_FATHER,
      expected: {
        title: "Birth father's details",
        rows: [
          {
            key: { text: 'Name on birth certificate' },
            value: { text: 'No' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/name-on-certificate?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father name on birth certificate',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        birthFatherNameOnCertificate: YesOrNo.NO,
        birthFatherIdentityKnown: YesOrNo.YES,
      },
      fieldPrefix: FieldPrefix.BIRTH_FATHER,
      expected: {
        title: "Birth father's details",
        rows: [
          {
            key: { text: 'Name on birth certificate' },
            value: { text: 'No' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/name-on-certificate?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father name on birth certificate',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father full name',
                },
              ],
            },
          },
          {
            key: { text: 'Alive' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/still-alive?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father alive',
                },
              ],
            },
          },
          {
            key: { text: 'Does birth father have parental responsibility?' },
            value: {
              html: 'Yes',
            },
            classes: 'govuk-summary-list__row--no-border',
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Does birth father have parental responsibility?',
                },
              ],
            },
          },
          {
            key: { text: 'Reason', html: ' ' },
            value: {
              html: '<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span> Birth certificate',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/parental-responsibility/granted?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father parental responsibility reason',
                },
              ],
            },
          },
          {
            key: { text: 'Nationality' },
            value: { html: 'British' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/nationality?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father nationality',
                },
              ],
            },
          },
          {
            key: { text: 'Occupation' },
            value: { text: 'MOCK_OCCUPATION' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/occupation?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father occupation',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father address known',
                },
              ],
            },
          },
          {
            key: { text: 'Address' },
            value: {
              html: 'MOCK_ADDRESS_LINE1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/address/manual?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Birth father address',
                },
              ],
            },
          },
          {
            key: { text: 'Last date this address was confirmed' },
            value: { html: '1 April 2022' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/last-address-confirmed?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Last date this address was confirmed by birth father',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/birth-father/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by birth father?',
                },
              ],
            },
          },
        ],
      },
    },
    //TODO add tests here
  ])('return correct summary list items when %#', ({ userCase, fieldPrefix, expected }) => {
    expect(birthParentSummaryList(enContent, userCase, fieldPrefix)).toStrictEqual(expected);
  });
});

describe('otherParentSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: "Other person's details",
        rows: [
          {
            key: { text: 'Is there another person with parental responsibility?' },
            value: { text: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/exists?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Is there another person with parental responsibility?',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'MOCK_OTHER_PARENT_FIRST_NAME MOCK_OTHER_PARENT_FIRST_NAME' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other parent full name',
                },
              ],
            },
          },
          {
            key: { text: 'Parental responsibility granted' },
            value: {
              html: '<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold"> </span> Birth certificate',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/parental-responsibility-granted?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other person parental responsibility granted',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other parent address known',
                },
              ],
            },
          },
          {
            key: { text: 'Address' },
            value: {
              html: 'MOCK_ADDRESS_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE<br>MOCK_ADDRESS_COUNTRY',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/address/manual?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other parent address',
                },
              ],
            },
          },
          {
            key: { text: 'Last date this address was confirmed' },
            value: { html: '1 April 2022' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/last-address-confirmed?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Last date other parent address was confirmed',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by other parent?',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: { ...mockUserCase, otherParentExists: YesOrNo.NO },
      expected: {
        title: "Other person's details",
        rows: [
          {
            key: { text: 'Is there another person with parental responsibility?' },
            value: { text: 'No' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/exists?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Is there another person with parental responsibility?',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        otherParentAddressKnown: YesOrNo.NO,
        otherParentAddressNotKnownReason: 'MOCK_REASON',
      },
      expected: {
        title: "Other person's details",
        rows: [
          {
            key: { text: 'Is there another person with parental responsibility?' },
            value: { text: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/exists?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Is there another person with parental responsibility?',
                },
              ],
            },
          },
          {
            key: { text: 'Full name' },
            value: { text: 'MOCK_OTHER_PARENT_FIRST_NAME MOCK_OTHER_PARENT_FIRST_NAME' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/full-name?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other parent full name',
                },
              ],
            },
          },
          {
            key: { text: 'Parental responsibility granted' },
            value: {
              html: '<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold"> </span> Birth certificate',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/parental-responsibility-granted?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other person parental responsibility granted',
                },
              ],
            },
          },
          {
            key: { text: 'Address known' },
            value: {
              html: 'No<p class="govuk-!-margin-top-0"><span class="govuk-!-font-weight-bold">Reason: </span>MOCK_REASON</p>',
            },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/address-known?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Other parent address known',
                },
              ],
            },
          },
          {
            key: { text: 'Any document or court orders to be sent?' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/other-parent/served-with?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Any document or court orders to be sent by other parent?',
                },
              ],
            },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(otherParentSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});

describe('childrenPlacementOrderSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: "Child's placement and court orders",
        rows: [
          {
            key: { html: '<h3 class="govuk-heading-s ">Placement order</h3>' },
            value: {},
            classes: 'govuk-summary-list__row--no-border',
          },
          { key: { text: 'Type of order' }, value: { text: 'Placement order' } },
          {
            key: { text: 'Order case or serial number' },
            value: { text: 'MOCK_PLACEMENT_ORDER_NUMBER' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-number?change=MOCK_PLACEMENT_ORDER_ID&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Order case or serial number',
                },
              ],
            },
          },
          {
            key: { text: 'Date' },
            value: { html: '12 November 2020' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-date?change=MOCK_PLACEMENT_ORDER_ID&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Placement order date',
                },
              ],
            },
          },
          {
            key: { html: '<h3 class="govuk-heading-s govuk-!-margin-top-8">Court order</h3>' },
            value: {},
            classes: 'govuk-summary-list__row--no-border',
          },
          {
            key: { text: 'Type of order' },
            value: { text: 'Placement order' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-type?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order',
                },
              ],
            },
          },
          {
            key: { text: 'Order case or serial number' },
            value: { text: 'MOCK_PLACEMENT_ORDER_NUMBER2' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-number?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Order case or serial number',
                },
              ],
            },
          },
          {
            key: { text: 'Court' },
            value: { text: 'MOCK_PLACEMENT_ORDER_COURT2' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-court?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Court',
                },
              ],
            },
          },
          {
            key: { text: 'Date' },
            value: { html: '10 November 2020' },
            actions: {
              items: [
                {
                  href: '/la-portal/child/placement-order-date?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Placement order date',
                },
              ],
            },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(childrenPlacementOrderSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});

describe('siblingCourtOrderSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: 'Sibling court orders',
        rows: [
          {
            key: { text: 'Siblings or half siblings with court orders' },
            value: { html: 'Yes' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/exists?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Siblings or half siblings with court orders',
                },
              ],
            },
          },
          {
            key: { html: '<h3 class="govuk-heading-s govuk-!-margin-top-8">Court order</h3>' },
            value: {},
            classes: 'govuk-summary-list__row--no-border',
          },
          {
            key: { text: 'Relationship' },
            value: {},
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/relation?change=MOCK_SIBLING_ID&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Relationship with child',
                },
              ],
            },
          },
          {
            key: { text: 'Type of order' },
            value: {},
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/placement-order-type?change=MOCK_SIBLING_ID&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order',
                },
              ],
            },
          },
          {
            key: { text: 'Order case or serial number' },
            value: { text: 'MOCK_PLACEMENT_ORDER_NUMBER' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/placement-order-number?change=MOCK_SIBLING_ID&returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Order case or serial number',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: { ...mockUserCase, hasSiblings: YesNoNotsure.NO },
      expected: {
        title: 'Sibling court orders',
        rows: [
          {
            key: { text: 'Siblings or half siblings with court orders' },
            value: { html: 'No' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/exists?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Siblings or half siblings with court orders',
                },
              ],
            },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(siblingCourtOrderSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});

describe('uploadedDocumentSummaryList', () => {
  test.each([
    {
      userCase: mockUserCase,
      expected: {
        title: 'Uploaded documents',
        rows: [
          {
            key: { text: 'Uploaded documents' },
            value: { html: 'MOCK_DOCUMENT_FILE_NAME' },
            actions: {
              items: [
                {
                  href: '/la-portal/la-portal/upload-your-documents?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Uploaded documents',
                },
              ],
            },
          },
        ],
      },
    },
    {
      userCase: {
        ...mockUserCase,
        applicant1CannotUpload: Checkbox.Checked,
        applicant1CannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
      },
      expected: {
        title: 'Uploaded documents',
        rows: [
          {
            key: { text: 'Uploaded documents' },
            value: { html: 'MOCK_DOCUMENT_FILE_NAME' },
            actions: {
              items: [
                {
                  href: '/la-portal/la-portal/upload-your-documents?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Uploaded documents',
                },
              ],
            },
          },
          {
            key: { text: 'Documents not uploaded' },
            value: { html: 'Birth or adoption certificate' },
            actions: {
              items: [
                {
                  href: '/la-portal/la-portal/upload-your-documents?returnUrl=/la-portal/check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Documents not uploaded',
                },
              ],
            },
          },
        ],
      },
    },
  ])('return correct summary list items when %#', ({ userCase, expected }) => {
    expect(uploadedDocumentSummaryList(enContent, userCase)).toStrictEqual(expected);
  });
});
