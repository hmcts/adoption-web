import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import SaveAsDraftGetController from './SaveAsDraftGetController';
import { generateContent } from './content';

const mockGetCourtList = jest.fn();

describe('application > save-as-draft > SaveAsDraftGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new SaveAsDraftGetController(__dirname + '../../common/template', generateContent);
    mockGetCourtList.mockReturnValue([{ site_name: 'MOCK' }]);
    req = mockRequest({
      session: {
        userCase: { canPaymentIgnored: false },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
  });

  test('should call super constructor with correct params', async () => {
    await controller.get(req, res);
    expect(!req.session.userCase.canPaymentIgnored).toBeTruthy();
  });
});
