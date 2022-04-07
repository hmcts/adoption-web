const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../../../app/form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../app/case/definition';
import { PostController } from '../../../app/controller/PostController';
import SameAddressPostController from './SameAddressPostController';

describe('applicant2 > other-names > OtherNamesPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          applicant1Address1: '101',
          applicant1Address2: 'xyz palace',
          applicant1AddressTown: 'London',
          applicant1AddressCounty: 'London',
          applicant1AddressPostcode: 'TW7 AAA',
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new SameAddressPostController({});
  });

  test('should extend SameAddressPostController', async () => {
    expect(controller).toBeInstanceOf(PostController);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a applicant1Address', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({
          applicant1Address1: '101',
          applicant1Address2: 'xyz palace',
          applicant1AddressTown: 'London',
          applicant1AddressCounty: 'London',
          applicant1AddressPostcode: 'TW7 AAA',
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
        });
        mockGetErrors.mockReturnValue([]);
        controller = new SameAddressPostController({});
        req.locals.api.triggerEvent.mockResolvedValue({
          applicant2Address1: '101',
          applicant2Address2: 'xyz palace',
          applicant2AddressTown: 'London',
          applicant2AddressCounty: 'London',
          applicant2AddressPostcode: 'TW7 AAA',
        });
      });

      test('should set the formData fields in userCase applicant1Address session data', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.applicant2Address1).toEqual('101');
        expect(req.session.userCase.applicant2Address2).toEqual('xyz palace');
        expect(req.session.userCase.applicant2AddressTown).toEqual('London');
        expect(req.session.userCase.applicant2AddressCounty).toEqual('London');
        expect(req.session.userCase.applicant2AddressPostcode).toEqual('TW7 AAA');

        expect(req.session.save).toHaveBeenCalled();
      });
    });
  });
});
