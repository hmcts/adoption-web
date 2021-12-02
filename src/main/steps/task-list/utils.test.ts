import { CaseWithId } from '../../app/case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../../app/case/definition';

import { isApplyingWithComplete } from './utils';
const userCase: CaseWithId = {
  id: '123',
  state: State.Draft,
  divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  applicant1ConfirmReceipt: YesOrNo.NO,
  applicant2ConfirmReceipt: YesOrNo.NO,
  connections: [],
  applicant1AddressPrivate: YesOrNo.NO,
  applicant2AddressPrivate: YesOrNo.NO,
  documentsGenerated: [],
  payments: [],
  applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
  applicant2Confirmation: YesOrNo.NO,
  applicant2Explanation: YesOrNo.NO,
};
describe('utils', () => {
  describe('isApplyingWithComplete()', () => {
    test('Should return false if applyingWith is not present', async () => {
      const isValid = isApplyingWithComplete(userCase);

      expect(isValid).toStrictEqual(false);
    });

    test('Should return true if applyingWith is present', async () => {
      userCase.applyingWith = 'true';
      const isValid = isApplyingWithComplete(userCase);

      expect(isValid).toStrictEqual(true);
    });
  });
});
