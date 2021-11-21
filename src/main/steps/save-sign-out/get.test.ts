import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { SaveSignOutGetController } from './get';

describe('SaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
  });
});
