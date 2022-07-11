import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { State } from '../../../app/case/definition';
import { LA_PORTAL_TASK_LIST } from '../../urls';

import ApplicationSubmittedGetController from './get';

describe('ApplicationSubmittedGetController', () => {
  const controller = new ApplicationSubmittedGetController();
  const req = mockRequest({
    session: { userCase: { state: State.AwaitingDocuments }, user: { email: 'test@example.com' } },
  });
  const res = mockResponse();

  it('returns user to task list', async () => {
    controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_TASK_LIST);
  });
});
