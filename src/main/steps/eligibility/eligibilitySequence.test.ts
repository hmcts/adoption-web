import { YesOrNo } from '../../app/case/definition';

import { eligibilitySequence } from './eligibilitySequence';

describe('eligibilitySequence', () => {
  test('should contain 9 entries in eligibility screen sequence', () => {
    expect(eligibilitySequence).toHaveLength(9);

    expect(eligibilitySequence[0].url).toBe('/eligibility/start');
    expect(eligibilitySequence[0].showInSection).toBe('eligibility');
    expect(eligibilitySequence[0].getNextStep({})).toBe('/eligibility/multiple-children');

    expect(eligibilitySequence[1].url).toBe('/eligibility/multiple-children');
    expect(eligibilitySequence[1].showInSection).toBe('eligibility');
    expect(eligibilitySequence[1].getNextStep({ multipleChildrenEligible: YesOrNo.YES })).toBe(
      '/eligibility/multiple-children-desc'
    );
    expect(eligibilitySequence[1].getNextStep({ multipleChildrenEligible: YesOrNo.NO })).toBe('/eligibility/under-18');

    expect(eligibilitySequence[2].url).toBe('/eligibility/multiple-children-desc');
    expect(eligibilitySequence[2].showInSection).toBe('eligibility');
    expect(eligibilitySequence[2].getNextStep({})).toBe('/eligibility/under-18');

    expect(eligibilitySequence[3].url).toBe('/eligibility/under-18');
    expect(eligibilitySequence[3].showInSection).toBe('eligibility');
    expect(eligibilitySequence[3].getNextStep({ under18Eligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[3].getNextStep({ under18Eligible: YesOrNo.YES })).toBe('/eligibility/married');

    expect(eligibilitySequence[4].url).toBe('/eligibility/married');
    expect(eligibilitySequence[4].showInSection).toBe('eligibility');
    expect(eligibilitySequence[4].getNextStep({ marriedEligible: YesOrNo.YES })).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[4].getNextStep({ marriedEligible: YesOrNo.NO })).toBe('/eligibility/under-21');

    expect(eligibilitySequence[5].url).toBe('/eligibility/under-21');
    expect(eligibilitySequence[5].showInSection).toBe('eligibility');
    expect(eligibilitySequence[5].getNextStep({ under21Eligible: YesOrNo.YES })).toBe('/eligibility/domicile');
    expect(eligibilitySequence[5].getNextStep({ under21Eligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');

    expect(eligibilitySequence[6].url).toBe('/eligibility/domicile');
    expect(eligibilitySequence[6].showInSection).toBe('eligibility');
    expect(eligibilitySequence[6].getNextStep({ domicileEligible: YesOrNo.YES })).toBe('/eligibility/lived-uk');
    expect(eligibilitySequence[6].getNextStep({ domicileEligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');

    expect(eligibilitySequence[7].url).toBe('/eligibility/lived-uk');
    expect(eligibilitySequence[7].showInSection).toBe('eligibility');
    expect(eligibilitySequence[7].getNextStep({ livedUKEligible: YesOrNo.YES })).toBe('/login');
    expect(eligibilitySequence[7].getNextStep({ livedUKEligible: YesOrNo.NO })).toBe('/eligibility/cannot-apply');

    expect(eligibilitySequence[8].url).toBe('/eligibility/cannot-apply');
    expect(eligibilitySequence[8].showInSection).toBe('eligibility');
    expect(eligibilitySequence[8].getNextStep({})).toBe('/login');
  });
});
