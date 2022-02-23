import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { ApplyingWith, Gender, Nationality, YesNoNotsure, YesOrNo } from '../../../app/case/definition';

import { enContent } from './content';
import {
  adoptionAgencySummaryList,
  applicantSummaryList,
  applicationSummaryList,
  birthParentSummaryList,
  childrenSummaryList,
  socialWorkerSummaryList,
} from './utils';

describe('review-pay-submit > check-your-answers > utils', () => {
  const mockUserCase = {
    applyingWith: ApplyingWith.ALONE,
    dateChildMovedIn: { day: 12, month: 10, year: '2020' },
    adopAgencyOrLAs: [
      {
        adopAgencyOrLaId: 'MOCK_ID_1',
        adopAgencyOrLaName: 'MOCK_AGENCY_NAME_1',
        adopAgencyOrLaPhoneNumber: '01234567890',
        adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME_1',
        adopAgencyOrLaContactEmail: 'contact1@email.com',
      },
      {
        adopAgencyOrLaId: 'MOCK_ID_2',
        adopAgencyOrLaName: 'MOCK_AGENCY_NAME_2',
        adopAgencyOrLaPhoneNumber: '01234567891',
        adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME_2',
        adopAgencyOrLaContactEmail: 'contact2@email.com',
      },
    ],

    socialWorkerName: 'MOCK_SOCIAL_WORKER_NAME',
    socialWorkerPhoneNumber: '01234567892',
    socialWorkerEmail: 'socialworker@email.com',
    socialWorkerTeamEmail: 'socialworkerteam@email.com',
    hasAnotherAdopAgencyOrLA: YesOrNo.YES,

    applicant1FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
    applicant1LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
    applicant1HasOtherNames: YesOrNo.YES,
    applicant1AdditionalNames: [{ firstNames: 'MOCK_ADDITIONAL_FIRST_NAMES', lastNames: 'MOCK_ADDITIONAL_LAST_NAMES' }],
    applicant1EmailAddress: 'applicant1@email.com',
    applicant1PhoneNumber: '01234567893',
    applicant1DateOfBirth: { day: '1', month: '4', year: '1990' },
    applicant1Occupation: 'MOCK_OCCUPATION',
    applicant1Address1: 'MOCK_ADDRESS_LINE_1',
    applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
    applicant1AddressCounty: 'MOCK_ADDRESS_COUNTY',
    applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',

    applicant2FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
    applicant2LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
    applicant2HasOtherNames: YesOrNo.NO,
    applicant2EmailAddress: 'applicant2@email.com',
    applicant2PhoneNumber: '01234567894',
    applicant2DateOfBirth: { day: '3', month: '6', year: '1992' },
    applicant2Occupation: 'MOCK_OCCUPATION',
    applicant2Address1: 'MOCK_ADDRESS_LINE_1',
    applicant2AddressTown: 'MOCK_ADDRESS_TOWN',
    applicant2AddressCounty: 'MOCK_ADDRESS_COUNTY',
    applicant2AddressPostcode: 'MOCK_ADDRESS_POSTCODE',

    childrenFirstName: 'CHILDREN_FIRST_NAMES',
    childrenLastName: 'CHILDREN_LAST_NAMES',
    childrenDateOfBirth: { day: 9, month: 8, year: 2020 },
    childrenSexAtBirth: Gender.MALE,
    childrenNationality: [Nationality.BRITHISH, Nationality.OTHER],
    childrenAdditionalNationalities: ['MOCK_COUNTRY'],
    childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME_AFTER_ADOPTION',
    childrenLastNameAfterAdoption: 'MOCK_LAST_NAME_AFTER_ADOPTION',

    birthMotherFirstNames: 'BIRTH_MOTHER_FIRST_NAMES',
    birthMotherLastNames: 'BIRTH_MOTHER_LAST_NAMES',
    birthMotherStillAlive: YesNoNotsure.YES,
    birthMotherNationality: [Nationality.BRITHISH, Nationality.OTHER],
    birthMotherAdditionalNationalities: ['MOCK_COUNTRY'],
    birthMotherOccupation: 'MOCK_OCCUPATION',
    birthMotherAddressKnown: YesOrNo.YES,
    birthMotherAddress1: 'MOCK_ADDRESS_LINE1',
    birthMotherAddress2: 'MOCK_ADDRESS_LINE2',
    birthMotherAddress3: 'MOCK_ADDRESS_LINE3',
    birthMotherAddressTown: 'MOCK_ADDRESS_TOWN',
    birthMotherAddressCounty: 'MOCK_ADDRESS_COUNTY',
    birthMotherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
    birthMotherAddressCountry: 'MOCK_ADDRESS_COUNTRY',

    birthFatherFirstNames: 'BIRTH_FATHER_FIRST_NAMES',
    birthFatherLastNames: 'BIRTH_FATHER_LAST_NAMES',
    birthFatherStillAlive: YesNoNotsure.YES,
    birthFatherNationality: [Nationality.BRITHISH],
    birthFatherOccupation: 'MOCK_OCCUPATION',
    birthFatherAddressKnown: YesOrNo.YES,
    birthFatherAddress1: 'MOCK_ADDRESS_LINE1',
    birthFatherAddressTown: 'MOCK_ADDRESS_TOWN',
    birthFatherAddressCounty: 'MOCK_ADDRESS_COUNTY',
    birthFatherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
    birthFatherAddressCountry: 'MOCK_ADDRESS_COUNTRY',
  } as unknown as CaseWithId;

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
    ])('return correct summary list items when %o', ({ userCase, expected }) => {
      expect(applicationSummaryList(enContent, userCase)).toStrictEqual(expected);
    });
  });

  describe('adoptionAgencySummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        agencyIndex: 0,
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
    ])('return correct summary list items when %o', ({ userCase, agencyIndex, expected }) => {
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
    ])('return correct summary list items when %o', ({ userCase, expected }) => {
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
    ])('return correct summary list items when %o', ({ userCase, fieldPrefix, expected }) => {
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
    ])('return correct summary list items when %o', ({ userCase, expected }) => {
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
    ])('return correct summary list items when %o', ({ userCase, fieldPrefix, expected }) => {
      expect(birthParentSummaryList(enContent, userCase, fieldPrefix)).toStrictEqual(expected);
    });
  });
});
