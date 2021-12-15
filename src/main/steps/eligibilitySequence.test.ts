import { YesOrNo } from '../app/case/definition';

import { eligibilitySequence } from './eligibilitySequence';

describe('eligibilitySequence', () => {
  test('should contain 6 entries in eligibility screen sequence', () => {
    expect(eligibilitySequence).toHaveLength(6);

    expect(eligibilitySequence[0].url).toBe('/eligibility/start');
    expect(eligibilitySequence[0].showInSection).toBe('eligibility');
    expect(eligibilitySequence[0].getNextStep({})).toBe('/eligibility/under-18');

    expect(eligibilitySequence[1].url).toBe('/eligibility/under-18');
    expect(eligibilitySequence[1].showInSection).toBe('eligibility');
    expect(eligibilitySequence[1].getNextStep({ under18Eligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[1].getNextStep({ under18Eligible: YesOrNo.YES })).toBe('/eligibility/married');

    expect(eligibilitySequence[2].url).toBe('/eligibility/married');
    expect(eligibilitySequence[2].showInSection).toBe('eligibility');
    expect(eligibilitySequence[2].getNextStep({ marriedEligible: YesOrNo.YES })).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[2].getNextStep({ marriedEligible: YesOrNo.NO })).toBe('/eligibility/under-21');

    expect(eligibilitySequence[3].url).toBe('/eligibility/under-21');
    expect(eligibilitySequence[3].showInSection).toBe('eligibility');
    expect(eligibilitySequence[3].getNextStep({ under21Eligible: YesOrNo.YES })).toBe('/eligibility/lived-uk');
    expect(eligibilitySequence[3].getNextStep({ under21Eligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');

    expect(eligibilitySequence[4].url).toBe('/eligibility/lived-uk');
    expect(eligibilitySequence[4].showInSection).toBe('eligibility');
    expect(eligibilitySequence[4].getNextStep({ livedUKEligible: YesOrNo.YES })).toBe('/login');
    expect(eligibilitySequence[4].getNextStep({ livedUKEligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');

    expect(eligibilitySequence[5].url).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[5].showInSection).toBe('eligibility');
    expect(eligibilitySequence[5].getNextStep({})).toBe('/login');
  });
});
