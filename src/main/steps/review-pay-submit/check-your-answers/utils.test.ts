import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith } from '../../../app/case/definition';

import { enContent } from './content';
import {
  adoptionAgencySummaryList,
  applicantSocialWorkerSummaryList,
  applicantSummaryList,
  applicationSummaryList,
  childSocialWorkerSummaryList,
  childrenSummaryList,
  familyCourtSummaryList,
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
                    visuallyHiddenText: 'Number of applicants',
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
                    visuallyHiddenText: 'Date child moved in',
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
              key: { text: 'Additional adoption agency' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/children/other-adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Additional adoption agency',
                  },
                ],
              },
            },
            {
              key: { text: 'Name' },
              value: { text: 'agency1' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Adoption agency or local authority name',
                  },
                ],
              },
            },
            {
              key: { text: 'Name of contact' },
              value: { text: 'contact name1' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Adoption agency or local authority name of contact',
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
                    href: '/children/adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Adoption agency or local authority phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Address' },
              value: { html: 'address<br>town<br>aa14aa' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Adoption agency or local authority address',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address' },
              value: { text: 'agency1@email.co.uk' },
              actions: {
                items: [
                  {
                    href: '/children/adoption-agency?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Adoption agency or local authority email address',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(adoptionAgencySummaryList(enContent, userCase)).toStrictEqual(expected);
    });
  });

  describe('childWorkerSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: "Child's social worker details",
          rows: [
            {
              key: { text: "Name of child's social worker" },
              value: { text: 'MOCK_SOCIAL_WORKER_NAME' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Name of child's social worker",
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
                    visuallyHiddenText: "child's social worker phone number",
                  },
                ],
              },
            },
            {
              key: { text: 'Email address (if known)' },
              value: { text: 'socialworker@gov.uk' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "child's social worker email address (if known)",
                  },
                ],
              },
            },
            {
              key: { text: "Child's local authority" },
              value: { text: 'MOCK_CHILD_LOCAL_AUTHORITY' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Child's local authority",
                  },
                ],
              },
            },
            {
              key: { text: 'Local authority email address' },
              value: { text: 'socialworker@gov.uk' },
              actions: {
                items: [
                  {
                    href: '/children/social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Local authority email address',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(childSocialWorkerSummaryList(enContent, userCase)).toStrictEqual(expected);
    });
  });

  describe('applicantSocialWorkerSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'Your social worker details',
          rows: [
            {
              key: { text: 'Name of your social worker' },
              value: { text: 'MOCK_SOCIAL_WORKER_NAME' },
              actions: {
                items: [
                  {
                    href: '/children/applicant-social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name of your social worker',
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
                    href: '/children/applicant-social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Your social worker phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Email address (if known)' },
              value: { text: 'socialworker@gov.uk' },
              actions: {
                items: [
                  {
                    href: '/children/applicant-social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Your social worker email address (if known)',
                  },
                ],
              },
            },
            {
              key: { text: 'Name of local authority' },
              value: { text: 'MOCK_CHILD_LOCAL_AUTHORITY' },
              actions: {
                items: [
                  {
                    href: '/children/applicant-social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name of local authority',
                  },
                ],
              },
            },
            {
              key: { text: 'Your local authority email address' },
              value: { text: 'socialworker@gov.uk' },
              actions: {
                items: [
                  {
                    href: '/children/applicant-social-worker?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Your local authority email address',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(applicantSocialWorkerSummaryList(enContent, userCase)).toStrictEqual(expected);
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
                    visuallyHiddenText: "First applicant's full name",
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
                    visuallyHiddenText: "First applicant's previous names",
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
                    visuallyHiddenText: "First applicant's date of birth",
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
                    visuallyHiddenText: "First applicant's occupation",
                  },
                ],
              },
            },
            {
              key: { text: 'Extra support' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/applicant1/extra-support?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's extra support",
                  },
                ],
              },
            },
            {
              key: { text: 'Details' },
              value: { text: 'MOCK_REASONABLE_ADJUSTMENT_DETAILS' },
              actions: {
                items: [
                  {
                    href: '/applicant1/extra-support?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's details",
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
                    href: '/applicant1/address/lookup?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's address",
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
                    visuallyHiddenText: "First applicant's email address",
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
                    visuallyHiddenText: "First applicant's phone number",
                  },
                ],
              },
            },
            {
              key: { text: 'Emails and documents language' },
              value: { text: 'English' },
              actions: {
                items: [
                  {
                    href: '/applicant1/language-preference?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's emails and documents language",
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
                    visuallyHiddenText: "First applicant's full name",
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
                    visuallyHiddenText: "First applicant's previous names",
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
                    visuallyHiddenText: "First applicant's date of birth",
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
                    visuallyHiddenText: "First applicant's occupation",
                  },
                ],
              },
            },
            {
              key: { text: 'Extra support' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/applicant1/extra-support?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's extra support",
                  },
                ],
              },
            },
            {
              key: { text: 'Details' },
              value: { text: 'MOCK_REASONABLE_ADJUSTMENT_DETAILS' },
              actions: {
                items: [
                  {
                    href: '/applicant1/extra-support?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's details",
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
                    href: '/applicant1/address/lookup?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's address",
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
                    visuallyHiddenText: "First applicant's email address",
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
                    visuallyHiddenText: "First applicant's phone number",
                  },
                ],
              },
            },
            {
              key: { text: 'Emails and documents language' },
              value: { text: 'English' },
              actions: {
                items: [
                  {
                    href: '/applicant1/language-preference?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "First applicant's emails and documents language",
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
                    visuallyHiddenText: "Second applicant's full name",
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
                    visuallyHiddenText: "Second applicant's previous names",
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
                    visuallyHiddenText: "Second applicant's date of birth",
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
                    visuallyHiddenText: "Second applicant's occupation",
                  },
                ],
              },
            },
            {
              key: { text: 'Extra support' },
              value: { text: 'No' },
              actions: {
                items: [
                  {
                    href: '/applicant2/extra-support?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Second applicant's extra support",
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
                    href: '/applicant2/address/lookup?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Second applicant's address",
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
                    visuallyHiddenText: "Second applicant's email address",
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
                    visuallyHiddenText: "Second applicant's phone number",
                  },
                ],
              },
            },
            {
              key: { text: 'Emails and documents language' },
              value: { text: 'English' },
              actions: {
                items: [
                  {
                    href: '/applicant2/language-preference?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: "Second applicant's emails and documents language",
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
                    visuallyHiddenText: "Child's full name",
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
                    visuallyHiddenText: "Child's full name after adoption",
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
                    visuallyHiddenText: "Child's date of birth",
                  },
                ],
              },
            },
            // {
            //   key: { text: 'Sex at birth' },
            //   value: { text: 'Male' },
            //   actions: {
            //     items: [
            //       {
            //         href: '/children/sex-at-birth?returnUrl=/review-pay-submit/check-your-answers',
            //         text: 'Change',
            //         visuallyHiddenText: 'Sex at birth',
            //       },
            //     ],
            //   },
            // },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      //console.log(JSON.stringify(childrenSummaryList(enContent, userCase)));
      expect(childrenSummaryList(enContent, userCase)).toStrictEqual(expected);
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
              key: { text: 'Placement court name' },
              value: { text: 'MOCK_PLACEMENT_ORDER_COURT' },
              actions: {
                items: [
                  {
                    href: '/children/find-placement-order-court?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Placement court name',
                  },
                ],
              },
            },
            {
              key: { text: 'Family court name' },
              value: { text: 'MOCK_FAMILY_COURT' },
              actions: {
                items: [
                  {
                    href: '/children/find-family-court?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Family court name',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(familyCourtSummaryList(enContent, userCase)).toEqual(expected);
    });
  });
});
