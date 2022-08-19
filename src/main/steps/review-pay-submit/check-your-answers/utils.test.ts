import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { Checkbox, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, DocumentType, YesNoNotsure, YesOrNo } from '../../../app/case/definition';

import { enContent } from './content';
import {
  adoptionAgencySummaryList,
  applicantSocialWorkerSummaryList,
  applicantSummaryList,
  applicationSummaryList,
  birthParentSummaryList,
  childSocialWorkerSummaryList,
  childrenPlacementOrderSummaryList,
  childrenSummaryList,
  familyCourtSummaryList,
  localAuthoritySummaryList,
  otherParentSummaryList,
  siblingCourtOrderSummaryList,
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

  describe('localAuthoritySummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'Local authority details',
          rows: [
            {
              key: { text: 'Name' },
              value: { text: 'laname' },
              actions: {
                items: [
                  {
                    href: '/children/local-authority?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name',
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
                    href: '/children/local-authority?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name of contact',
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
                    href: '/children/local-authority?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Phone number',
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
                    href: '/children/local-authority?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Email address',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(localAuthoritySummaryList(enContent, userCase)).toStrictEqual(expected);
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
                    visuallyHiddenText: 'Name',
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
                    visuallyHiddenText: 'Name of contact',
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
                    visuallyHiddenText: 'Phone number',
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
                    visuallyHiddenText: 'Address',
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
                    visuallyHiddenText: 'Email address',
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
                    visuallyHiddenText: 'Phone number',
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
                    visuallyHiddenText: 'Email address (if known)',
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
                    visuallyHiddenText: 'Phone number',
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
                    visuallyHiddenText: 'Email address (if known)',
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
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Previous names',
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
                    visuallyHiddenText: 'Date of birth',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address',
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
                    visuallyHiddenText: 'Email address',
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
                    visuallyHiddenText: 'Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Court orders served by email' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Court orders served by email',
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
                    visuallyHiddenText: 'Emails and documents language',
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
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Previous names',
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
                    visuallyHiddenText: 'Date of birth',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address',
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
                    visuallyHiddenText: 'Email address',
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
                    visuallyHiddenText: 'Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Court orders served by email' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/applicant1/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Court orders served by email',
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
                    visuallyHiddenText: 'Emails and documents language',
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
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Previous names',
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
                    visuallyHiddenText: 'Date of birth',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address',
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
                    visuallyHiddenText: 'Email address',
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
                    visuallyHiddenText: 'Phone number',
                  },
                ],
              },
            },
            {
              key: { text: 'Court orders served by email' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/applicant2/contact-details?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Court orders served by email',
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
                    visuallyHiddenText: 'Emails and documents language',
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
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Full name after adoption',
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
                    visuallyHiddenText: 'Date of birth',
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
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Alive',
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
                    visuallyHiddenText: 'Nationality',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address known',
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
                    href: '/birth-mother/address/international?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Address',
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
                    href: '/birth-father/name-on-certificate?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name on birth certificate',
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
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Alive',
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
                    visuallyHiddenText: 'Nationality',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address known',
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
                    href: '/birth-father/address/manual?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Address',
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
                    href: '/birth-father/name-on-certificate?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name on birth certificate',
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
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Alive',
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
              key: { text: 'Name on birth certificate' },
              value: { text: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/birth-father/name-on-certificate?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name on birth certificate',
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
                    href: '/birth-father/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Alive',
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
                    visuallyHiddenText: 'Nationality',
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
                    visuallyHiddenText: 'Occupation',
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
                    visuallyHiddenText: 'Address known',
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
                    href: '/birth-father/name-on-certificate?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Name on birth certificate',
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
                    href: '/other-parent/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Address known',
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
                    visuallyHiddenText: 'Address',
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
                    href: '/other-parent/full-name?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Full name',
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
                    visuallyHiddenText: 'Address known',
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
                    visuallyHiddenText: 'Order case or serial number',
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
                    visuallyHiddenText: 'Court',
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
                    visuallyHiddenText: 'Date',
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
                    href: '/children/placement-order-number?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
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
                    href: '/children/placement-order-court?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
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
                    href: '/children/placement-order-date?change=MOCK_PLACEMENT_ORDER_ID2&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Date',
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
              key: { text: 'Child siblings or half siblings' },
              value: { html: 'Yes' },
              actions: {
                items: [
                  {
                    href: '/sibling/exists?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Child siblings or half siblings',
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
              key: { text: 'Sibling relation' },
              value: { text: 'MOCK_SIBLING_RELATION' },
              actions: {
                items: [
                  {
                    href: '/sibling/relation?change=MOCK_SIBLING_ID&returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Sibling relation',
                  },
                ],
              },
            },
            {
              key: { text: 'Type of order' },
              value: { text: 'MOCK_PLACEMENT_ORDER_TYPE' },
              actions: {
                items: [
                  {
                    href: '/sibling/placement-order-type?change=MOCK_SIBLING_ID&returnUrl=/review-pay-submit/check-your-answers',
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
                    href: '/sibling/placement-order-number?change=MOCK_SIBLING_ID&returnUrl=/review-pay-submit/check-your-answers',
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
              key: { text: 'Child siblings or half siblings' },
              value: { html: 'No' },
              actions: {
                items: [
                  {
                    href: '/sibling/exists?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Child siblings or half siblings',
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
              value: { text: 'MOCK_PLACEMENT_ORDER_COURT' },
              actions: {
                items: [
                  {
                    href: '/children/find-placement-order-court?returnUrl=/review-pay-submit/check-your-answers',
                    text: 'Change',
                    visuallyHiddenText: 'Family court name',
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
                    href: '/upload-your-documents?returnUrl=/review-pay-submit/check-your-answers',
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
                    href: '/upload-your-documents?returnUrl=/review-pay-submit/check-your-answers',
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
                    href: '/upload-your-documents?returnUrl=/review-pay-submit/check-your-answers',
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
});
