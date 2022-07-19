import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import {
  DocumentType,
  Gender,
  Nationality,
  SiblingPOType,
  SiblingRelationships,
  State,
  YesNoNotsure,
  YesOrNo,
} from '../../../app/case/definition';

import {
  getAdoptionCertificateDetailsStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getOtherParentStatus,
  getSiblingStatus,
  getUploadDocumentStatus,
} from './utils';

const userCase: CaseWithId = {
  id: '123',
  state: State.Draft,
  documentsGenerated: [],
  payments: [],
  applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
};

const NOT_STARTED = 'NOT_STARTED';
const IN_PROGRESS = 'IN_PROGRESS';
const COMPLETED = 'COMPLETED';

describe('utils', () => {
  describe('getChildrenPlacementOrderStatus', () => {
    test.each([
      { data: { addAnotherPlacementOrder: undefined, placementOrders: undefined }, expected: NOT_STARTED },
      { data: { addAnotherPlacementOrder: YesOrNo.YES, placementOrders: undefined }, expected: IN_PROGRESS },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.YES,
          placementOrders: [
            {
              placementOrderId: '',
              placementOrderNumber: '',
              placementOrderCourt: '',
              placementOrderDate: { day: '', month: '', year: '' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: 'MOCK_NUMBER',
              placementOrderCourt: 'MOCK_COURT',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
          ],
        },
        expected: COMPLETED,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: '',
              placementOrderCourt: '',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
            {
              placementOrderId: 'MOCK_ID2',
              //placementOrderType: '',
              placementOrderNumber: 'MOCK_NUMBER2',
              placementOrderCourt: 'MOCK_COURT2',
              placementOrderDate: { day: '2', month: '2', year: '2002' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: 'MOCK_NUMBER',
              placementOrderCourt: 'MOCK_COURT',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
            {
              placementOrderId: 'MOCK_ID2',
              //placementOrderType: '',
              placementOrderNumber: 'MOCK_NUMBER2',
              placementOrderCourt: 'MOCK_COURT2',
              placementOrderDate: { day: '2', month: '2', year: '2002' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getChildrenPlacementOrderStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getChildrenBirthCertificateStatus', () => {
    test.each([
      {
        data: {
          childrenFirstName: undefined,
          childrenLastName: undefined,
          childrenDateOfBirth: { day: '', month: '', year: '' },
          childrenSexAtBirth: undefined,
          childrenNationality: undefined,
          childrenAdditionalNationalities: undefined,
        },
        expected: NOT_STARTED,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.OTHER,
          childrenNationality: undefined,
          childrenAdditionalNationalities: undefined,
        },
        expected: NOT_STARTED,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.MALE,
          childrenNationality: [Nationality.BRITHISH],
          childrenAdditionalNationalities: undefined,
        },
        expected: COMPLETED,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.FEMALE,
          childrenNationality: [Nationality.OTHER],
          childrenAdditionalNationalities: undefined,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.OTHER,
          childrenOtherSexAtBirth: 'MOCK_OTHER_GENDER',
          childrenNationality: [Nationality.OTHER],
          childrenAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getChildrenBirthCertificateStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getAdoptionCertificateDetailsStatus', () => {
    test.each([
      {
        data: { childrenFirstNameAfterAdoption: undefined, childrenLastNameAfterAdoption: undefined },
        expected: NOT_STARTED,
      },
      {
        data: { childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME', childrenLastNameAfterAdoption: undefined },
        expected: IN_PROGRESS,
      },
      {
        data: { childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME', childrenLastNameAfterAdoption: 'MOCK_LAST_NAME' },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getAdoptionCertificateDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getBirthFatherDetailsStatus', () => {
    it.each([
      {
        data: {},
        expected: NOT_STARTED,
      },
      {
        data: { birthFatherNameOnCertificate: 'No' },
        expected: COMPLETED,
      },
      {
        data: { birthFatherNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry' },
        expected: IN_PROGRESS,
      },
      {
        data: { birthFatherNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry', birthFatherLastNames: 'Cornell' },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'No',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'NotSure',
          birthFatherUnsureAliveReason: 'Disappeared',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: [{ id: 'mock_id', country: 'Japan' }],
          birthFatherOccupation: 'Primary school teacher',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: [{ id: 'mock_id', country: 'Japan' }],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.NO,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: [{ id: 'mock_id', country: 'Japan' }],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.YES,
          birthFatherAddress1: '33 Example Road',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: [{ id: 'mock_id', country: 'Japan' }],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.YES,
          birthFatherAddress1: '33 Example Road',
          birthFatherAddressCountry: 'United Kingdom',
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getBirthFatherDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getOtherParentStatus', () => {
    test.each([
      { data: {}, userType: 'otherParent', expected: 'NOT_STARTED' },
      { data: { otherParentExists: YesOrNo.NO }, userType: 'otherParent', expected: 'COMPLETED' },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
          otherParentAddress2: 'MOCK_ADDRESS_2',
          otherParentAddressTown: ' MOCK_TOWN',
          otherParentAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.NO,
          otherParentAddressNotKnownReason: 'MOCK_REASON',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.NO,
          otherParentAddressNotKnownReason: 'MOCK_REASON',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
          otherParentAddressTown: ' MOCK_TOWN',
          otherParentAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getOtherParentStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getBirthMotherDetailsStatus', () => {
    test.each([
      { data: {}, userType: 'birthMother', expected: 'NOT_STARTED' },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NO,
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NO,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NOT_SURE,
          birthMotherNotAliveReason: 'MOCK_REASON',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NOT_SURE,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
          birthMotherAddress2: 'MOCK_ADDRESS_2',
          birthMotherAddressTown: ' MOCK_TOWN',
          birthMotherAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
          birthMotherAddressKnown: YesOrNo.NO,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherAddressKnown: YesOrNo.NO,
          birthMotherAddressNotKnownReason: 'MOCK_REASON',
          birthMotherOccupation: 'MOCK_OCCUPATION',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['Other'],
          birthMotherAddressKnown: YesOrNo.NO,
          birthMotherAddressNotKnownReason: 'MOCK_REASON',
          birthMotherOccupation: 'MOCK_OCCUPATION',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
          birthMotherAddressTown: 'MOCK_TOWN',
          birthMotherAddressPostcode: 'MOCK_POSTCODE',
          birthMotherCountry: 'MOCK_COUNTRY',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getBirthMotherDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getSiblingPlacementOrderStatus', () => {
    test.each([
      { data: {}, expected: 'NOT_STARTED' },
      {
        data: {
          hasSiblings: YesNoNotsure.NO,
        },
        expected: COMPLETED,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.NOT_SURE,
        },
        expected: COMPLETED,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.SISTER,
              siblingPoType: SiblingPOType.ADOPTION_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.STEP_SISTER,
              siblingPoType: SiblingPOType.CARE_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.HALF_SISTER,
              siblingPoType: SiblingPOType.CONTACT_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.BROTHER,
              siblingPoType: SiblingPOType.FREEING_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.STEP_BROTHER,
              siblingPoType: SiblingPOType.PLACEMENT_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.HALF_BROTHER,
              siblingPoType: SiblingPOType.SUPERVIS_ORDER,
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: SiblingRelationships.SISTER,
              siblingPoType: SiblingPOType.OTHER,
              siblingPoNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
            },
          ],
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getSiblingStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getUploadDocumentStatus', () => {
    test.each([
      { data: { ...mockUserCase }, expected: 'COMPLETED' },
      {
        data: { ...mockUserCase, laCannotUpload: Checkbox.Checked },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          laCannotUpload: Checkbox.Checked,
          laCannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          laUploadedFiles: undefined,
          laCannotUpload: Checkbox.Checked,
          laCannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          laUploadedFiles: undefined,
          laCannotUpload: undefined,
        },
        expected: 'NOT_STARTED',
      },
      {
        data: {
          ...mockUserCase,
          applyingWith: undefined,
          laUploadedFiles: undefined,
          laCannotUpload: undefined,
        },
        expected: 'NOT_STARTED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getUploadDocumentStatus(data)).toBe(expected);
    });
  });
});
