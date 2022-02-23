import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, YesNoNotsure, YesOrNo } from '../../../app/case/definition';

import { enContent } from './content';
import {
  adoptionAgencySummaryList,
  applicantSummaryList,
  applicationSummaryList,
  birthParentSummaryList,
  childrenPlacementOrderSummaryList,
  childrenSummaryList,
  familyCourtSummaryList,
  otherParentSummaryList,
  siblingCourtOrderSummaryList,
  socialWorkerSummaryList,
  uploadedDocumentSummaryList,
} from './utils';

describe('review-pay-submit > check-your-answers > utils', () => {
  describe('applicationSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/applying-with?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Number of applicants',
                  },
                ],
              },
              key: { text: 'Number of applicants' },
              value: { text: "I'm applying on my own" },
            },
            {
              actions: {
                items: [
                  {
                    href: '/date-child-moved-in?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date child moved in',
                  },
                ],
              },
              key: { text: 'Date child moved in' },
              value: { text: '12 October 2020' },
            },
          ],
          title: 'Application details',
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(applicationSummaryList(enContent, userCase)).toStrictEqual(expected);
    });
  });

  describe('adoptionAgencySummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'Adoption agency or local authority details',
          rows: [
            {
              key: { text: 'Name' },
              value: { text: 'MOCK_AGENCY_NAME_1' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_1&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Name',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567890' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_1&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Name of contact' },
              value: { text: 'MOCK_CONTACT_NAME_1' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_1&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Name of contact',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address of contact' },
              value: { text: 'contact1@email.com' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_1&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address of contact',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        userCase: mockUserCase,
        agencyIndex: 1,
        expected: {
          title: 'Additional adoption agency or local authority details',
          rows: [
            {
              key: { text: 'Additional adoption agency' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/children/other-adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Additional adoption agency',
                  },
                ],
              },
            },
            {
              key: { text: 'Name' },
              value: { text: 'MOCK_AGENCY_NAME_2' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Name',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567891' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Name of contact' },
              value: { text: 'MOCK_CONTACT_NAME_2' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Name of contact',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address of contact' },
              value: { text: 'contact2@email.com' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?change=MOCK_ID_2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address of contact',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        userCase: { ...mockUserCase, hasAnotherAdopAgencyOrLA: YesOrNo.NO },
        agencyIndex: 1,
        expected: {
          title: 'Additional adoption agency or local authority details',
          rows: [
            {
              key: { text: 'Additional adoption agency' },
              value: { text: 'No' },
              actions: {
                items: [
                  {
                    href: '/children/other-adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Additional adoption agency',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, agencyIndex, expected }) => {
      expect(adoptionAgencySummaryList(enContent, userCase, agencyIndex)).toStrictEqual(expected);
    });
  });

  describe('socialWorkerSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        agencyIndex: 0,
        expected: {
          title: "Child's social worker details",
          rows: [
            {
              key: { text: 'Name' },
              value: { text: 'MOCK_SOCIAL_WORKER_NAME' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Name',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567892' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address' },
              value: { text: 'socialworker@email.com' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address',
                  },
                ],
              },
            },
            {
              key: { text: 'Team email address' },
              value: { text: 'socialworkerteam@email.com' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Team email address',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(socialWorkerSummaryList(enContent, userCase)).toStrictEqual(expected);
    });
  });

  describe('applicantSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        fieldPrefix: FieldPrefix.APPLICANT1,
        expected: {
          title: "Applicant's details",
          rows: [
            {
              key: { text: 'Full name' },
              value: { text: 'MOCK_APPLICANT1_FIRST_NAMES MOCK_APPLICANT1_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/applicant1/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
                  },
                ],
              },
            },
            {
              key: { text: 'Previous names' },
              value: { html: 'MOCK_ADDITIONAL_FIRST_NAMES MOCK_ADDITIONAL_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/applicant1/other-names?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Previous names',
                  },
                ],
              },
            },
            {
              key: { text: 'Date of birth' },
              value: { text: '1 April 1990' },
              actions: {
                items: [
                  {
                    href: '/applicant1/dob?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date of birth',
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
                    href: '/applicant1/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: {
                html: 'MOCK_ADDRESS_LINE_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
              },
              actions: {
                items: [
                  {
                    href: '/applicant1/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address' },
              value: { text: 'applicant1@email.com' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567893' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        userCase: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
        fieldPrefix: FieldPrefix.APPLICANT1,
        expected: {
          title: "First applicant's details",
          rows: [
            {
              key: { text: 'Full name' },
              value: { text: 'MOCK_APPLICANT1_FIRST_NAMES MOCK_APPLICANT1_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/applicant1/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
                  },
                ],
              },
            },
            {
              key: { text: 'Previous names' },
              value: { html: 'MOCK_ADDITIONAL_FIRST_NAMES MOCK_ADDITIONAL_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/applicant1/other-names?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Previous names',
                  },
                ],
              },
            },
            {
              key: { text: 'Date of birth' },
              value: { text: '1 April 1990' },
              actions: {
                items: [
                  {
                    href: '/applicant1/dob?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date of birth',
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
                    href: '/applicant1/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: {
                html: 'MOCK_ADDRESS_LINE_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
              },
              actions: {
                items: [
                  {
                    href: '/applicant1/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address' },
              value: { text: 'applicant1@email.com' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567893' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        userCase: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
        fieldPrefix: FieldPrefix.APPLICANT2,
        expected: {
          title: "Second applicant's details",
          rows: [
            {
              key: { text: 'Full name' },
              value: { text: 'MOCK_APPLICANT1_FIRST_NAMES MOCK_APPLICANT1_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/applicant2/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
                  },
                ],
              },
            },
            {
              key: { text: 'Previous names' },
              value: {},
              actions: {
                items: [
                  {
                    href: '/applicant2/other-names?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Previous names',
                  },
                ],
              },
            },
            {
              key: { text: 'Date of birth' },
              value: { text: '3 June 1992' },
              actions: {
                items: [
                  {
                    href: '/applicant2/dob?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date of birth',
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
                    href: '/applicant2/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: {
                html: 'MOCK_ADDRESS_LINE_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
              },
              actions: {
                items: [
                  {
                    href: '/applicant2/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address' },
              value: { text: 'applicant2@email.com' },
              actions: {
                items: [
                  {
                    href: '/applicant2/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Email address',
                  },
                ],
              },
            },
            {
              key: { text: 'Phone number' },
              value: { text: '01234567894' },
              actions: {
                items: [
                  {
                    href: '/applicant2/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Phone number',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, fieldPrefix, expected }) => {
      expect(applicantSummaryList(enContent, userCase, fieldPrefix)).toStrictEqual(expected);
    });
  });

  describe('childrenSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: "Child's details",
          rows: [
            {
              key: { text: 'Full name' },
              value: { text: 'CHILDREN_FIRST_NAMES CHILDREN_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/children/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
                  },
                ],
              },
            },
            {
              key: { text: 'Date of birth' },
              value: { text: '9 August 2020' },
              actions: {
                items: [
                  {
                    href: '/children/date-of-birth?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date of birth',
                  },
                ],
              },
            },
            {
              key: { text: 'Sex at birth' },
              value: { text: 'Male' },
              actions: {
                items: [
                  {
                    href: '/children/sex-at-birth?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Sex at birth',
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
                    href: '/children/nationality?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Nationality',
                  },
                ],
              },
            },
            {
              key: { text: 'Full name after adoption' },
              value: { text: 'MOCK_FIRST_NAME_AFTER_ADOPTION MOCK_LAST_NAME_AFTER_ADOPTION' },
              actions: {
                items: [
                  {
                    href: '/children/full-name-after-adoption?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name after adoption',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(childrenSummaryList(enContent, userCase)).toStrictEqual(expected);
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
                    href: '/birth-mother/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/birth-mother/still-alive?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Alive',
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
                    href: '/birth-mother/nationality?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Nationality',
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
                    href: '/birth-mother/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
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
                    href: '/birth-mother/address-known?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address known',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: {
                html: 'MOCK_ADDRESS_LINE1<br>MOCK_ADDRESS_LINE2<br>MOCK_ADDRESS_LINE3<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE<br>MOCK_ADDRESS_COUNTRY',
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
              key: { text: 'Full name' },
              value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/birth-father/alive?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Alive',
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
                    href: '/birth-father/nationality?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Nationality',
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
                    href: '/birth-father/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
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
                    href: '/birth-father/address-known?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address known',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: {
                html: 'MOCK_ADDRESS_LINE1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE<br>MOCK_ADDRESS_COUNTRY',
              },
              actions: {
                items: [
                  {
                    href: '/birth-father/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address',
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
              key: { text: 'Full name' },
              value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/birth-father/alive?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Alive',
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
        },
        fieldPrefix: FieldPrefix.BIRTH_FATHER,
        expected: {
          title: "Birth father's details",
          rows: [
            {
              key: { text: 'Full name' },
              value: { text: 'BIRTH_FATHER_FIRST_NAMES BIRTH_FATHER_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/birth-father/alive?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Alive',
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
                    href: '/birth-father/nationality?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Nationality',
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
                    href: '/birth-father/occupation?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Occupation',
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
                    href: '/birth-father/address-known?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address known',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, fieldPrefix, expected }) => {
      expect(birthParentSummaryList(enContent, userCase, fieldPrefix)).toStrictEqual(expected);
    });
  });

  describe('otherParentSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: "Other parent's details",
          rows: [
            {
              key: { text: 'Is there another person with parental responsibility?' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/other-parent/exists?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Is there another person with parental responsibility?',
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
                    href: '/other-parent/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/other-parent/address-known?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address known',
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
                    href: '/other-parent/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address',
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
          title: "Other parent's details",
          rows: [
            {
              key: { text: 'Is there another person with parental responsibility?' },
              value: { text: 'No' },
              actions: {
                items: [
                  {
                    href: '/other-parent/exists?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Is there another person with parental responsibility?',
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
          title: "Other parent's details",
          rows: [
            {
              key: { text: 'Is there another person with parental responsibility?' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/other-parent/exists?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Is there another person with parental responsibility?',
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
                    href: '/other-parent/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Full name',
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
                    href: '/other-parent/address-known?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Address known',
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
                    href: '/children/placement-order-number?change=MOCK_PLACEMENT_ORDER_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Order case or serial number',
                  },
                ],
              },
            },
            {
              key: { text: 'Court' },
              value: { text: 'MOCK_PLACEMENT_ORDER_COURT' },
              actions: {
                items: [
                  {
                    href: '/children/placement-order-court?change=MOCK_PLACEMENT_ORDER_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Court',
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
                    href: '/children/placement-order-date?change=MOCK_PLACEMENT_ORDER_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date',
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
              value: { text: 'MOCK_PLACEMENT_ORDER_TYPE2' },
              actions: {
                items: [
                  {
                    href: '/children/placement-order-type?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Type of order',
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
                    href: '/children/placement-order-number?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Order case or serial number',
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
                    href: '/children/placement-order-court?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Court',
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
                    href: '/children/placement-order-date?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Date',
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
              key: { html: '<h3 class="govuk-heading-s">Sibling with court orders</h3>' },
              value: {},
              classes: 'govuk-summary-list__row--no-border',
            },
            {
              key: { text: 'Sibling name' },
              value: { text: 'MOCK_SIBLING_FIRST_NAME MOCK_SIBLING_LAST_NAMES' },
              actions: {
                items: [
                  {
                    href: '/sibling/name?change=MOCK_SIBLING_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Sibling name',
                  },
                ],
              },
            },
            {
              key: { html: '<h3 class="govuk-heading-s govuk-!-margin-top-8">Court order</h3>' },
              value: {},
              classes: 'govuk-summary-list__row--no-border',
            },
            { key: { text: 'Sibling name' }, value: { text: 'MOCK_SIBLING_FIRST_NAME MOCK_SIBLING_LAST_NAMES' } },
            {
              key: { text: 'Type of order' },
              value: { text: 'MOCK_PLACEMENT_ORDER_TYPE' },
              actions: {
                items: [
                  {
                    href: '/sibling/placement-order-type?change=MOCK_SIBLING_ID/MOCK_PLACEMENT_ORDER_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Type of order',
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
                    href: '/sibling/placement-order-number?change=MOCK_SIBLING_ID/MOCK_PLACEMENT_ORDER_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Order case or serial number',
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

  describe('familyCourtSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'Family court details',
          rows: [
            {
              key: { text: 'Family court name' },
              value: { text: 'TBD' },
              actions: {
                items: [
                  {
                    href: '#?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Change Family court name',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ expected }) => {
      expect(familyCourtSummaryList(enContent)).toStrictEqual(expected);
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
              key: { text: "Child's documents" },
              value: { html: 'MOCK_DOCUMENT_FILE_NAME' },
              actions: {
                items: [
                  {
                    href: '/upload-your-documents?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Change Child's documents",
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
});
