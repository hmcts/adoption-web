import { birthMotherSequence } from './birthMotherSequence';

describe('birthMotherSequence', () => {
  test('should contain 2 entries in birth mother screen sequence', () => {
    expect(birthMotherSequence).toHaveLength(2);

    expect(birthMotherSequence[0].url).toBe('/birth-mother/full-name');
    expect(birthMotherSequence[0].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[0].getNextStep({})).toBe('/task-list');

    expect(birthMotherSequence[1].url).toBe('/birth-mother/occupation');
    expect(birthMotherSequence[1].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[1].getNextStep({})).toBe('/task-list');
  });
});
