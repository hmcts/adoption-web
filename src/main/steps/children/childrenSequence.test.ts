import { childrenSequence } from './childrenSequence';

describe('childrenSequence', () => {
  test('should contain 6 entries in children screen sequence', () => {
    expect(childrenSequence).toHaveLength(6);

    expect(childrenSequence[0].url).toBe('/children/placement-order-number');
    expect(childrenSequence[0].showInSection).toBe('aboutChildren');
    expect(childrenSequence[0].getNextStep({})).toBe('/children/placement-order-court');

    expect(childrenSequence[1].url).toBe('/children/placement-order-court');
    expect(childrenSequence[1].showInSection).toBe('aboutChildren');
    expect(childrenSequence[1].getNextStep({})).toBe('/children/placement-order-date');

    expect(childrenSequence[2].url).toBe('/children/placement-order-date');
    expect(childrenSequence[2].showInSection).toBe('aboutChildren');
    expect(childrenSequence[2].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[3].url).toBe('/children/full-name');
    expect(childrenSequence[3].showInSection).toBe('aboutChildren');
    expect(childrenSequence[3].getNextStep({})).toBe('/children/date-of-birth');

    expect(childrenSequence[4].url).toBe('/children/date-of-birth');
    expect(childrenSequence[4].showInSection).toBe('aboutChildren');
    expect(childrenSequence[4].getNextStep({})).toBe('/children/sex-at-birth');

    expect(childrenSequence[5].url).toBe('/children/sex-at-birth');
    expect(childrenSequence[5].showInSection).toBe('aboutChildren');
    expect(childrenSequence[5].getNextStep({})).toBe('/task-list');
  });
});
