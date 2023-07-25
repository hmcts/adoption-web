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

import SelectAddressPostController from './SelectAddressPostControllerBase';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
describe('SelectAddressPostController', () => {
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
        returnUrl: '/review-pay-submit/check-your-answers',
        errors: [],
      },
    });
    res = mockResponse();
    controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
      // mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a selected address', () => {
      const formData = {
        applicant1AddressCounty: 'CITY OF WESTMINSTER',
        applicant1AddressPostcode: 'SW1H 9AJ',
        applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
        applicant1Address2: '',
        applicant1AddressTown: 'LONDON',
        applicant1SelectAddress: 0,
        checkYourAnswersReturn: true,
      };
      beforeEach(() => {
        req.body.applicant1SelectAddress = 0;
        mockGetParsedBody.mockReturnValue({ applicant1SelectAddress: 0, checkYourAnswersReturn: true });
        mockGetErrors.mockReturnValue([]);
        controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
        req.locals.api.triggerEvent.mockResolvedValue(formData);
      });

      test('should set the address fields in userCase session data', async () => {
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
          triggerEvent: jest.fn(() => {
            return {
              applicant1AdditionalNames: [
                { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
              ],
              applicant1HasOtherNames: 'Yes',
              applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
              checkYourAnswersReturn: true,
            };
          }),
          addPayment: jest.fn(() => {
            return { checkYourAnswersReturn: true };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(2);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('MOCK_ID', formData, 'citizen-update-application');
      });

      test('should set checkYourAnswersReturn if returnUrl present', async () => {
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
            };
          }),
          addPayment: jest.fn(() => {
            return {
              applicant1Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
              applicant1Address2: '',
              applicant1AddressCounty: 'CITY OF WESTMINSTER',
              applicant1AddressPostcode: 'SW1H 9AJ',
              applicant1AddressTown: 'LONDON',
              applicant1SelectAddress: 0,
              id: 'MOCK_ID',
            };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.session.userCase).toEqual({
          ...formData,
          checkYourAnswersReturn: true,
          id: 'MOCK_ID',
          canPaymentIgnored: true,
        });
      });
    });

    describe('and when there is no selected address', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ applicant1SelectAddress: -1 });
        mockGetErrors.mockReturnValue([]);
        controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
      });

      test('should not set the address fields in userCase session data', async () => {
        await controller.post(req, res);
        expect(req.session.userCase.applicant1Address1).toBe(undefined);
        expect(req.session.userCase.applicant1Address2).toBe(undefined);
        expect(req.session.userCase.applicant1AddressTown).toBe(undefined);
        expect(req.session.userCase.applicant1AddressCounty).toBe(undefined);
        expect(req.session.userCase.applicant1AddressPostcode).toBe(undefined);
      });
    });

    test('should redirect to correct screen', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
      await controller.post(req, res);
      expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, req.session.userCase);
      expect(res.redirect).toHaveBeenCalledWith('/MOCK_ENDPOINT');
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
