import config from 'config';

import { getCourtEmailId } from './util';

describe('utils', () => {
  describe('getCourtEmailId()', () => {
    test('When sending not listed court name', async () => {
      const emailId = getCourtEmailId('London Court');

      expect(emailId).toStrictEqual(config.get('localCourt.emailId.FALLBACK_EMAIL_ID'));
    });
    test('When sending listed court name', async () => {
      const emailId = getCourtEmailId('oxford family court');

      expect(emailId).toStrictEqual(config.get('localCourt.emailId.OXFORD_FAMILY_COURT'));
    });
  });
});
