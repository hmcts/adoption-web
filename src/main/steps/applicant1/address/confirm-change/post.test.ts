const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { PostController } from '../../../../app/controller/PostController';

import ConfirmChangeAddressController from './post';

describe('ConfirmChangeAddressController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new ConfirmChangeAddressController({}, FieldPrefix.APPLICANT1);
  });

  test('should extend ConfirmChangeAddressController', async () => {
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

    describe('and when they click save and continue', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new ConfirmChangeAddressController({}, FieldPrefix.APPLICANT1);
      });

      test('Calling ConfirmChangeAddressController.post', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.save).toHaveBeenCalled();
      });

      test('Calling ConfirmChangeAddressController.post when saveAsDraft=true', async () => {
        req.body.saveAsDraft = true;
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
      });
    });
  });
});
