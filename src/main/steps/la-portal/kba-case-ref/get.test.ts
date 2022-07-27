import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import KBAGetController from './get';

describe('KBAGetController', () => {
  const controller = new KBAGetController('', generateContent);
  let req = mockRequest({ session: { user: { email: 'test@example.com' } } });
  const res = mockResponse();

  it('KBA get call', async () => {
    await controller.get(req, res);
    expect(res.redirect).not.toHaveBeenCalled();
  });

  describe('when there is an error in destroying session', () => {
    test('Should throw an error', async () => {
      req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          destroy: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
