import { Case, Checkbox } from './case';
import { DocumentType, PlacementOrderTypeEnum, SiblingPOType, SiblingRelationships, YesOrNo } from './definition';
import {
  OrNull,
  formatApplicant1CannotUploadDocuments,
  formatLaCannotUploadDocuments,
  toApiFormat,
} from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    applicant1CannotUploadDocuments: [DocumentType.APPLICATION],
    laCannotUploadDocuments: [DocumentType.APPLICATION],
    applicant2CannotUploadDocuments: [],
    applicant1HasOtherNames: YesOrNo.YES,
    applicant1AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
    applicant2HasOtherNames: YesOrNo.YES,
    applicant2AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
    childrenAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
    birthMotherAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
    birthFatherAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
    dateChildMovedIn: { day: '1', month: '1', year: '2021' },
    applicant1DateOfBirth: { day: '20', month: '1', year: '2000' },
    applicant2DateOfBirth: undefined,
    birthFatherLastAddressDate: { day: '20', month: '1', year: '2020' },
    birthMotherLastAddressDate: { day: '20', month: '1', year: '2020' },
    otherParentLastAddressDate: { day: '20', month: '1', year: '2020' },
    childrenDateOfBirth: { day: '5', month: '1', year: '2020' },
    placementOrders: [
      {
        placementOrderId: 'MOCK_ID',
        placementOrderType: PlacementOrderTypeEnum.AdoptionOrder,
        placementOrderNumber: 'MOCK_NUMBER',
        placementOrderCourt: 'MOCK_COURT',
        placementOrderDate: { day: '5', month: '1', year: '2021' },
      },
    ],
    siblings: [
      {
        siblingId: 'MOCK_SIBLING_ID',
        siblingRelation: SiblingRelationships.SISTER,
        siblingPoType: SiblingPOType.ADOPTION_ORDER,
        siblingPoNumber: 'MOCK_NUMBER',
      },
    ],
    localAuthorityName: 'laname',
    localAuthorityContactName: 'contact name1',
    localAuthorityPhoneNumber: '01234567890',
    localAuthorityContactEmail: 'agency1@email.co.uk',
    adopAgencyOrLaName: 'agency1',
    adopAgencyOrLaContactName: 'contact name1',
    adopAgencyOrLaPhoneNumber: '01234567890',
    adopAgencyAddressLine1: 'address',
    adopAgencyTown: 'town',
    adopAgencyPostcode: 'aa14aa',
    adopAgencyOrLaContactEmail: 'agency1@email.co.uk',
    applicant1IBelieveApplicationIsTrue: Checkbox.Unchecked,
    applicant2IBelieveApplicationIsTrue: null,
    applicant1UploadedFiles: [],
    laUploadedFiles: [],
    applicant2UploadedFiles: [],
    applicant1CannotUpload: Checkbox.Checked,
    laCannotUpload: Checkbox.Checked,
    applicant2AddressSameAsApplicant1: YesOrNo.YES,
  };

  test('should convert results from adoption-web to CCD api format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);
    expect(apiFormat).toStrictEqual({
      applicant1CannotUpload: 'Yes',
      laCannotUpload: 'Yes',
      applicant1CannotUploadSupportingDocument: ['application'],
      laCannotUploadSupportingDocument: ['application'],
      applicant1HasOtherNames: 'Yes',
      applicant1AdditionalNames: [
        { id: 'MOCK_ID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      applicant2HasOtherNames: 'Yes',
      applicant2AdditionalNames: [
        { id: 'MOCK_ID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      childrenAdditionalNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      birthMotherOtherNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      birthFatherOtherNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      dateChildMovedIn: '2021-01-01',
      applicant1DateOfBirth: '2000-01-20',
      applicant2DateOfBirth: '',
      childrenDateOfBirth: '2020-01-05',
      birthFatherLastAddressDate: '2020-01-20',
      birthMotherLastAddressDate: '2020-01-20',
      otherParentLastAddressDate: '2020-01-20',
      placementOrders: [
        {
          id: 'MOCK_ID',
          value: {
            placementOrderId: 'MOCK_ID',
            placementOrderType: PlacementOrderTypeEnum.AdoptionOrder,
            placementOrderNumber: 'MOCK_NUMBER',
            placementOrderCourt: 'MOCK_COURT',
            placementOrderDate: '2021-01-05',
          },
        },
      ],
      siblings: [
        {
          id: 'MOCK_SIBLING_ID',
          value: {
            siblingId: 'MOCK_SIBLING_ID',
            siblingRelation: SiblingRelationships.SISTER,
            siblingPoType: SiblingPOType.ADOPTION_ORDER,
            siblingPoNumber: 'MOCK_NUMBER',
          },
        },
      ],
      localAuthorityName: 'laname',
      localAuthorityContactName: 'contact name1',
      localAuthorityPhoneNumber: '01234567890',
      localAuthorityContactEmail: 'agency1@email.co.uk',
      adopAgencyOrLaName: 'agency1',
      adopAgencyOrLaContactName: 'contact name1',
      adopAgencyOrLaPhoneNumber: '01234567890',
      adopAgencyAddressLine1: 'address',
      adopAgencyTown: 'town',
      adopAgencyPostcode: 'aa14aa',
      adopAgencyOrLaContactEmail: 'agency1@email.co.uk',
      applicant1StatementOfTruth: 'No',
      applicant2StatementOfTruth: null,
      applicant2AddressSameAsApplicant1: YesOrNo.YES,
    });
  });

  test.each([
    {
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
      expected: {
        applicant1StatementOfTruth: 'Yes',
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.NO,
      applicant1AdditionalNames: [],
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.YES,
      applicant1AdditionalNames: undefined,
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.NO,
      applicant2AdditionalNames: [],
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.YES,
      applicant2AdditionalNames: undefined,
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      childrenAdditionalNationalities: undefined,
      expected: {
        childrenAdditionalNationalities: [],
      },
    },
    {
      birthMotherAdditionalNationalities: undefined,
      expected: {
        birthMotherOtherNationalities: [],
      },
    },
    {
      birthFatherAdditionalNationalities: undefined,
      expected: {
        birthFatherOtherNationalities: [],
      },
    },
    {
      applicant1CannotUploadDocuments: undefined,
      expected: {
        applicant1CannotUploadSupportingDocument: [],
      },
    },
    {
      laCannotUploadDocuments: undefined,
      expected: {
        laCannotUploadSupportingDocument: [],
      },
    },
    {
      placementOrders: undefined,
      expected: {
        placementOrders: [],
      },
    },
    {
      siblings: undefined,
      expected: {
        siblings: [],
      },
    },
    {
      localAuthorityName: undefined,
      localAuthorityContactName: undefined,
      localAuthorityPhoneNumber: undefined,
      localAuthorityContactEmail: undefined,
      adopAgencyOrLaName: undefined,
      adopAgencyOrLaContactName: undefined,
      adopAgencyOrLaPhoneNumber: undefined,
      adopAgencyAddressLine1: undefined,
      adopAgencyTown: undefined,
      adopAgencyPostcode: undefined,
      adopAgencyOrLaContactEmail: undefined,
      hasAnotherAdopAgencyOrLA: undefined,
      childLocalAuthority: undefined,
      childLocalAuthorityEmail: undefined,
      childSocialWorkerName: undefined,
      childSocialWorkerPhoneNumber: undefined,
      childSocialWorkerEmail: undefined,
      applicantLocalAuthority: undefined,
      applicantLocalAuthorityEmail: undefined,
      applicantSocialWorkerName: undefined,
      applicantSocialWorkerPhoneNumber: undefined,
      applicantSocialWorkerEmail: undefined,
      expected: {
        localAuthorityName: undefined,
        localAuthorityContactName: undefined,
        localAuthorityPhoneNumber: undefined,
        localAuthorityContactEmail: undefined,
        adopAgencyOrLaName: undefined,
        adopAgencyOrLaContactName: undefined,
        adopAgencyOrLaPhoneNumber: undefined,
        adopAgencyAddressLine1: undefined,
        adopAgencyTown: undefined,
        adopAgencyPostcode: undefined,
        adopAgencyOrLaContactEmail: undefined,
        hasAnotherAdopAgencyOrLA: undefined,
        childLocalAuthority: undefined,
        childLocalAuthorityEmail: undefined,
        childSocialWorkerName: undefined,
        childSocialWorkerPhoneNumber: undefined,
        childSocialWorkerEmail: undefined,
        applicantLocalAuthority: undefined,
        applicantLocalAuthorityEmail: undefined,
        applicantSocialWorkerName: undefined,
        applicantSocialWorkerPhoneNumber: undefined,
        applicantSocialWorkerEmail: undefined,
      },
    },
  ])('set unreachable answers to null if condition met', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });

  test('formatApplicant1CannotUploadDocuments & formatLaCannotUploadDocuments should return array', () => {
    expect(formatApplicant1CannotUploadDocuments({ applicant1CannotUploadDocuments: undefined })).toEqual([undefined]);
    expect(formatLaCannotUploadDocuments({ laCannotUploadDocuments: undefined })).toEqual([undefined]);
    expect(
      formatApplicant1CannotUploadDocuments({ applicant1CannotUploadDocuments: [DocumentType.APPLICATION] })
    ).toEqual([DocumentType.APPLICATION]);
    expect(formatLaCannotUploadDocuments({ laCannotUploadDocuments: [DocumentType.APPLICATION] })).toEqual([
      DocumentType.APPLICATION,
    ]);
  });
});
