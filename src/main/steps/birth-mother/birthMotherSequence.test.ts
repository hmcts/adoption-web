import { birthMotherSequence } from './birthMotherSequence';

describe('birthMotherSequence', () => {
  test('should contain 1 entries in birth mother screen sequence', () => {
    expect(birthMotherSequence).toHaveLength(1);

    expect(birthMotherSequence[0].url).toBe('/birth-mother/full-name');
    expect(birthMotherSequence[0].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[0].getNextStep({})).toBe('/task-list');
  });
});
