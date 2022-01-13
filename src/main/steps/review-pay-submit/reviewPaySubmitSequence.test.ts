import { reviewPaySubmitSequence } from './reviewPaySubmitSequence';

describe('reviewPaySubmitSequence', () => {
  test('should contain 3 entries in review pay and submit screen sequence', () => {
    expect(reviewPaySubmitSequence).toHaveLength(3);

    expect(reviewPaySubmitSequence[0].url).toBe('/review-pay-submit/check-your-answers');
    expect(reviewPaySubmitSequence[0].showInSection).toBe('reviewPaySubmit');
    expect(reviewPaySubmitSequence[0].getNextStep({})).toBe('/review-pay-submit/payment/pay-your-fee');

    expect(reviewPaySubmitSequence[1].url).toBe('/review-pay-submit/payment/pay-your-fee');
    expect(reviewPaySubmitSequence[1].showInSection).toBe('reviewPaySubmit');
    expect(reviewPaySubmitSequence[1].getNextStep({})).toBe('/review-pay-submit/payment/payment-callback');

    expect(reviewPaySubmitSequence[2].url).toBe('/review-pay-submit/payment/payment-callback');
    expect(reviewPaySubmitSequence[2].showInSection).toBe('reviewPaySubmit');
    expect(reviewPaySubmitSequence[2].getNextStep({})).toBe('/task-list');
  });
});
