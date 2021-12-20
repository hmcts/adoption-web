import { childrenSequence } from './childrenSequence';

describe('childrenSequence', () => {
  test('should contain 3 entries in children screen sequence', () => {
    expect(childrenSequence).toHaveLength(3);

    expect(childrenSequence[0].url).toBe('/children/placement-order-number');
    expect(childrenSequence[0].showInSection).toBe('aboutChildren');
    expect(childrenSequence[0].getNextStep({})).toBe('/children/placement-order-court');

    expect(childrenSequence[1].url).toBe('/children/placement-order-court');
    expect(childrenSequence[1].showInSection).toBe('aboutChildren');
    expect(childrenSequence[1].getNextStep({})).toBe('/task-list');

    expect(childrenSequence[2].url).toBe('/children/placement-order-date');
    expect(childrenSequence[2].showInSection).toBe('aboutChildren');
    expect(childrenSequence[2].getNextStep({})).toBe('/task-list');
  });
});
