import { getCourtEmailId } from './util';

describe('utils', () => {
  describe('getCourtEmailId()', () => {
    test('When sending not listed court name', async () => {
      const emailId = getCourtEmailId('London Court');

      expect(emailId).toStrictEqual('adoptionproject@justice.gov.uk');
    });
    test('When sending listed court name', async () => {
      const emailId = getCourtEmailId('oxford family court');

      expect(emailId).toStrictEqual('Oxfordadoptionapplication@justice.gov.uk');
    });
  });
});
