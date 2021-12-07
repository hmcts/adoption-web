import { eligibilitySequence } from './eligibilitySequence';

describe('eligibilitySequence', () => {
  test('should contain 3 entries in eligibility screen sequence', () => {
    expect(eligibilitySequence).toHaveLength(3);

    expect(eligibilitySequence[0].url).toBe('/eligibility/start');
    expect(eligibilitySequence[0].showInSection).toBe('eligibility');
    expect(eligibilitySequence[0].getNextStep({})).toBe('/eligibility/under-18');

    expect(eligibilitySequence[1].url).toBe('/eligibility/under-18');
    expect(eligibilitySequence[1].showInSection).toBe('eligibility');
    expect(eligibilitySequence[1].getNextStep({})).toBe('/eligibility/married');

    expect(eligibilitySequence[2].url).toBe('/eligibility/married');
    expect(eligibilitySequence[2].showInSection).toBe('eligibility');
    expect(eligibilitySequence[2].getNextStep({})).toBe('/login');
  });
});
