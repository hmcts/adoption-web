const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

const mockGetNextStepUrl = jest.fn();
jest.mock('../../steps', () => {
  return { getNextStepUrl: mockGetNextStepUrl };
});

import moment from 'moment';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as caseApi from '../../app/case/CaseApi';
import { FieldPrefix } from '../case/case';
import { ApplyingWith, State } from '../case/definition';

import ManualAddressPostController from './ManualAddressPostControllerBase';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
describe('ManualAddressPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: { id: 'MOCK_ID' },
        addresses: [
          {
            county: 'CITY OF WESTMINSTER',
            fullAddress: 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ',
            postcode: 'SW1H 9AJ',
            street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
            street2: '',
            town: 'LONDON',
          },
        ],
        errors: [],
      },
    });
    res = mockResponse();
    controller = new ManualAddressPostController({}, FieldPrefix.APPLICANT1);
  });

  describe('and when there is a typed address', () => {
    const formData = {
      applicant1AddressCounty: 'CITY OF WESTMINSTER',
      applicant1AddressPostcode: 'SW1H 9AJ',
      applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
      applicant1Address2: '',
      applicant1AddressTown: 'LONDON',
      applicant1SelectAddress: 0,
    };

    beforeEach(() => {
      // req.body.applicant1SelectAddress = 0;
      mockGetParsedBody.mockReturnValue({ ...formData });
      mockGetErrors.mockReturnValue([]);
      controller = new ManualAddressPostController({}, FieldPrefix.APPLICANT1);
      req.locals.api.triggerEvent.mockResolvedValue(formData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should set the address fields in userCase session data', async () => {
      const caseApiMockFn = {
        getCases: jest.fn(() => {
          return [
            {
              id: '123456',
              state: 'Submitted',
              case_data: { applyingWith: 'alone', dateSubmitted: moment(new Date()).format('YYYY-MM-DD') },
            },
          ];
        }),
        triggerEvent: jest.fn(() => {
          return {
            applicant1AdditionalNames: [
              { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
            ],
            applicant1HasOtherNames: 'Yes',
            applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
          };
        }),
        addPayment: jest.fn(() => {
          return {
            id: '1234567891',
            state: State.Draft,
            applyingWith: ApplyingWith.ALONE,
            birthMotherAdditionalNationalities: [],
            applicant1AddressCounty: 'CITY OF WESTMINSTER',
            applicant1AddressPostcode: 'SW1H 9AJ',
            applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
            applicant1Address2: '',
            applicant1AddressTown: 'LONDON',
            applicant1SelectAddress: 0,
          };
        }),
      };
      (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
      await controller.post(req, res);
      expect(req.session.userCase.applicant1Address1).toBe('102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE');
      expect(req.session.userCase.applicant1Address2).toBe('');
      expect(req.session.userCase.applicant1AddressTown).toBe('LONDON');
      expect(req.session.userCase.applicant1AddressCounty).toBe('CITY OF WESTMINSTER');
      expect(req.session.userCase.applicant1AddressPostcode).toBe('SW1H 9AJ');
    });

    test('should call save with correct params', async () => {
      const caseApiMockFn = {
        getCases: jest.fn(() => {
          return [
            {
              id: '123456',
              state: 'Submitted',
              case_data: { applyingWith: 'alone', dateSubmitted: moment(new Date()).format('YYYY-MM-DD') },
            },
          ];
        }),
        unlinkStaleDraftCaseIfFound: jest.fn(() => {
          return undefined;
        }),
        checkOldPCQIDExists: jest.fn(() => {
          return '12345';
        }),
        createCase: jest.fn(() => {
          return { id: '123456789', state: State.Draft, applyingWith: ApplyingWith.ALONE };
        }),
        triggerEvent: jest.fn(() => {
          return {
            applicant1AdditionalNames: [
              { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
            ],
            applicant1HasOtherNames: 'Yes',
            applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
          };
        }),
        addPayment: jest.fn(() => {
          return {
            id: '123456789',
            state: State.Draft,
            applyingWith: ApplyingWith.ALONE,
            birthMotherAdditionalNationalities: [],
          };
        }),
      };
      (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
      await controller.post(req, res);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(2);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('MOCK_ID', formData, 'citizen-update-application');
    });
  });

  describe('when there are form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue(['MOCK_ERROR']);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });
});
