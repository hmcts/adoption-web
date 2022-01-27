import { YesOrNo } from '../../app/case/definition';

import { childrenSequence } from './childrenSequence';

describe('childrenSequence', () => {
  test('should contain 14 entries in children screen sequence', () => {
    expect(childrenSequence).toHaveLength(14);

    expect(childrenSequence[0].url).toBe('/children/placement-order-type');
    expect(childrenSequence[0].showInSection).toBe('aboutChildren');
    expect(childrenSequence[0].getNextStep({})).toBe('/children/placement-order-number');

    expect(childrenSequence[1].url).toBe('/children/placement-order-number');
    expect(childrenSequence[1].showInSection).toBe('aboutChildren');
    expect(childrenSequence[1].getNextStep({})).toBe('/children/placement-order-court');

    expect(childrenSequence[2].url).toBe('/children/placement-order-court');
    expect(childrenSequence[2].showInSection).toBe('aboutChildren');
    expect(childrenSequence[2].getNextStep({})).toBe('/children/placement-order-date');

    expect(childrenSequence[3].url).toBe('/children/placement-order-date');
    expect(childrenSequence[3].showInSection).toBe('aboutChildren');
    expect(childrenSequence[3].getNextStep({})).toBe('/children/placement-order-summary');

    Date.now = jest.fn(() => +new Date('2021-01-01'));
    expect(childrenSequence[4].url).toBe('/children/placement-order-summary');
    expect(childrenSequence[4].showInSection).toBe('aboutChildren');
    expect(childrenSequence[4].getNextStep({})).toBe('/task-list');
    expect(childrenSequence[4].getNextStep({ addAnotherPlacementOrder: YesOrNo.YES })).toBe(
      '/children/placement-order-type?add=1609459200000'
    );

    expect(childrenSequence[5].url).toBe('/children/placement-order-check-your-answers');
    expect(childrenSequence[5].showInSection).toBe('aboutChildren');
    expect(childrenSequence[5].getNextStep({})).toBe('/children/placement-order-summary');

    expect(childrenSequence[6].url).toBe('/children/full-name');
    expect(childrenSequence[6].showInSection).toBe('aboutChildren');
    expect(childrenSequence[6].getNextStep({})).toBe('/children/date-of-birth');

    expect(childrenSequence[7].url).toBe('/children/date-of-birth');
    expect(childrenSequence[7].showInSection).toBe('aboutChildren');
    expect(childrenSequence[7].getNextStep({})).toBe('/children/sex-at-birth');

    expect(childrenSequence[8].url).toBe('/children/sex-at-birth');
    expect(childrenSequence[8].showInSection).toBe('aboutChildren');
    expect(childrenSequence[8].getNextStep({})).toBe('/children/nationality');

    expect(childrenSequence[9].url).toBe('/children/nationality');
    expect(childrenSequence[9].showInSection).toBe('aboutChildren');
    expect(childrenSequence[9].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[10].url).toBe('/children/full-name-after-adoption');
    expect(childrenSequence[10].showInSection).toBe('aboutChildren');
    expect(childrenSequence[10].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[11].url).toBe('/children/adoption-agency');
    expect(childrenSequence[11].showInSection).toBe('aboutChildren');
    expect(
      childrenSequence[11].getNextStep({ adopAgencyOrLAs: [{ adopAgencyOrLaId: '1' }, { adopAgencyOrLaId: '2' }] })
    ).toBe('/children/other-adoption-agency');
    expect(childrenSequence[11].getNextStep({ adopAgencyOrLAs: [{ adopAgencyOrLaId: '1' }] })).toBe(
      '/children/other-adoption-agency'
    );
    expect(childrenSequence[11].getNextStep({ adopAgencyOrLAs: [] })).toBe('/children/other-adoption-agency');
    expect(
      childrenSequence[11].getNextStep({
        selectedAdoptionAgencyId: '1609459200000',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: '1609459200099' }, { adopAgencyOrLaId: '1609459200000' }],
      })
    ).toBe('/children/social-worker');

    Date.now = jest.fn(() => +new Date('2021-01-01'));
    expect(childrenSequence[12].url).toBe('/children/other-adoption-agency');
    expect(childrenSequence[12].showInSection).toBe('aboutChildren');
    expect(childrenSequence[12].getNextStep({ hasAnotherAdopAgencyOrLA: YesOrNo.NO })).toBe('/children/social-worker');
    expect(
      childrenSequence[12].getNextStep({
        hasAnotherAdopAgencyOrLA: YesOrNo.YES,
        adopAgencyOrLAs: [{ adopAgencyOrLaId: '1609459200099' }],
      })
    ).toBe('/children/adoption-agency?add=1609459200000');
    expect(
      childrenSequence[12].getNextStep({
        hasAnotherAdopAgencyOrLA: YesOrNo.YES,
        adopAgencyOrLAs: [{ adopAgencyOrLaId: '1' }, { adopAgencyOrLaId: '2' }],
      })
    ).toBe('/children/adoption-agency?change=2');

    expect(childrenSequence[13].url).toBe('/children/social-worker');
    expect(childrenSequence[13].showInSection).toBe('aboutChildren');
    expect(childrenSequence[13].getNextStep({})).toBe('/task-list');
  });
});
