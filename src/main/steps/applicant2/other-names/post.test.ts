import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import OtherNamesPostController from './post';

const mockParsedBody = jest.fn();
const mockErrors = jest.fn();

jest.mock('../../../app/form/Form', () => ({
  Form: jest.fn().mockImplementation(() => ({
    getParsedBody: mockParsedBody,
    getErrors: mockErrors,
  })),
}));

jest.mock('../../../steps', () => ({
  getNextStepUrl: () => jest.fn(),
}));

describe('other names post controller', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({ session: { userCase: {} } });
    res = mockResponse();
    controller = new OtherNamesPostController({});
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      req.session.errors = [];
      controller.fields = { example: { type: 'input', values: [] } };
      mockParsedBody.mockReturnValue({
        saveAndSignOut: true,
        saveBeforeSessionTimeout: true,
        _csrf: true,
        formData: {},
      });
      mockErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    // it('should save form input to session data and redirect to next url', async () => {
    //   await controller.post(req, res);

    //   console.log(req.session.userCase);

    //   expect(req.session.userCase).toStrictEqual(controller.fields);
    // });

    it('should redirect to the next screen', async () => {
      await controller.post(req, res);

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalled();
    });
  });
});
