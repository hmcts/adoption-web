import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import LocalAuthorityGetController from './LocalAuthorityGetController';
import { generateContent } from './content';

const mockGetLocalAuthorityList = jest.fn();

describe('children > social-worker > LocalAuthorityGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new LocalAuthorityGetController(__dirname + '../../common/template', generateContent);
    mockGetLocalAuthorityList.mockReturnValue([{ key: 'COR' }]);
    req = mockRequest({
      session: {
        userCase: {
          childLocalAuthority: 'Cornwall Council',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
  });

  test('should call super constructor with correct params and get list of court', async () => {
    await controller.get(req, res);
    expect(!!req.session.localAuthorityList).toBeTruthy();
  });
});
