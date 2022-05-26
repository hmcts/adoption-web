const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { PostController } from '../../app/controller/PostController';

import { SaveAsDraftPostController } from './post';

describe('SaveAsDraftPostController', () => {
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
    controller = new SaveAsDraftPostController({});
  });

  test('should extend SaveAsDraftPostController', async () => {
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
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new SaveAsDraftPostController({});
      });

      test('Calling SaveAsDraftPostController.post', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual(undefined);
        expect(req.session.save).toHaveBeenCalled();
      });

      test('Calling SaveAsDraftPostController.post when saveAsDraft=true', async () => {
        req.body.saveAsDraft = true;
        await controller.post(req, res);
        expect(req.session.errors).toEqual(undefined);
      });
    });
  });
});
