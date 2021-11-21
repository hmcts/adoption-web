import config from 'config';
import { v4 as uuid } from 'uuid';

import { CHECK_ANSWERS_URL } from '../../urls';

import { createToken } from './createToken';

jest.mock('config');
const mockedConfig = config as jest.Mocked<typeof config>;

describe('createToken', () => {
  const params = {
    serviceId: 'NEW_DIVORCE_LAW',
    actor: 'APPLICANT1',
    pcqId: uuid(),
    partyId: 'test@email.com',
    returnUrl: CHECK_ANSWERS_URL,
    language: 'en',
    token: '',
  };

  test('Should create token if tokenKey exists', async () => {
    mockedConfig.get.mockReturnValueOnce('PCQ_TOKEN');

    const result = await createToken(params);

    expect(result).toHaveLength(374);
  });
});
