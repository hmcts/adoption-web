import { YesOrNo } from '../../app/case/definition';

import { childrenSequence } from './childrenSequence';

describe('childrenSequence', () => {
  test('should contain 17 entries in children screen sequence', () => {
    expect(childrenSequence).toHaveLength(9);

    expect(childrenSequence[0].url).toBe('/children/full-name');
    expect(childrenSequence[0].showInSection).toBe('aboutChildren');
    expect(childrenSequence[0].getNextStep({})).toBe('/children/full-name-after-adoption');

    expect(childrenSequence[1].url).toBe('/children/full-name-after-adoption');
    expect(childrenSequence[1].showInSection).toBe('aboutChildren');
    expect(childrenSequence[1].getNextStep({})).toBe('/children/date-of-birth');

    expect(childrenSequence[2].url).toBe('/children/date-of-birth');
    expect(childrenSequence[2].showInSection).toBe('aboutChildren');
    expect(childrenSequence[2].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[3].url).toBe('/children/social-worker');
    expect(childrenSequence[3].showInSection).toBe('aboutChildren');
    expect(childrenSequence[3].getNextStep({})).toBe('/children/applicant-social-worker');

    expect(childrenSequence[4].url).toBe('/children/applicant-social-worker');
    expect(childrenSequence[4].showInSection).toBe('aboutChildren');
    expect(childrenSequence[4].getNextStep({})).toBe('/children/other-adoption-agency');

    expect(childrenSequence[5].url).toBe('/children/other-adoption-agency');
    expect(childrenSequence[5].showInSection).toBe('aboutChildren');
    expect(childrenSequence[5].getNextStep({ hasAnotherAdopAgencyOrLA: YesOrNo.NO })).toBe('/task-list');
    expect(childrenSequence[5].getNextStep({ hasAnotherAdopAgencyOrLA: YesOrNo.YES })).toBe(
      '/children/adoption-agency'
    );

    expect(childrenSequence[6].url).toBe('/children/adoption-agency');
    expect(childrenSequence[6].showInSection).toBe('aboutChildren');
    expect(childrenSequence[6].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[7].url).toBe('/children/find-placement-order-court');
    expect(childrenSequence[7].showInSection).toBe('aboutChildren');
    expect(childrenSequence[7].getNextStep({})).toBe('/children/find-family-court');

    expect(childrenSequence[8].url).toBe('/children/find-family-court');
    expect(childrenSequence[8].showInSection).toBe('aboutChildren');
    expect(childrenSequence[8].getNextStep({})).toBe('/task-list');
  });
});
