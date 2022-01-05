import { YesOrNo } from '../../app/case/definition';

import { birthMotherSequence } from './birthMotherSequence';

describe('birthMotherSequence', () => {
  test('should contain 9 entries in birth mother screen sequence', () => {
    expect(birthMotherSequence).toHaveLength(9);

    expect(birthMotherSequence[0].url).toBe('/birth-mother/full-name');
    expect(birthMotherSequence[0].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[0].getNextStep({})).toBe('/birth-mother/occupation');

    expect(birthMotherSequence[1].url).toBe('/birth-mother/still-alive');
    expect(birthMotherSequence[1].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[1].getNextStep({ birthMotherStillAlive: YesOrNo.YES })).toBe(
      '/birth-mother/nationality'
    );
    expect(birthMotherSequence[1].getNextStep({})).toBe('/task-list');

    expect(birthMotherSequence[2].url).toBe('/birth-mother/nationality');
    expect(birthMotherSequence[2].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[2].getNextStep({})).toBe('/birth-mother/occupation');

    expect(birthMotherSequence[3].url).toBe('/birth-mother/occupation');
    expect(birthMotherSequence[3].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[3].getNextStep({})).toBe('/birth-mother/address-known');

    expect(birthMotherSequence[4].url).toBe('/birth-mother/address-known');
    expect(birthMotherSequence[4].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[4].getNextStep({ birthMotherAddressKnown: YesOrNo.YES })).toBe(
      '/birth-mother/address/lookup'
    );
    expect(birthMotherSequence[4].getNextStep({})).toBe('/task-list');

    expect(birthMotherSequence[5].url).toBe('/birth-mother/address/lookup');
    expect(birthMotherSequence[5].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[5].getNextStep({})).toBe('/birth-mother/address/select');

    expect(birthMotherSequence[6].url).toBe('/birth-mother/address/select');
    expect(birthMotherSequence[6].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[6].getNextStep({})).toBe('/task-list');

    expect(birthMotherSequence[7].url).toBe('/birth-mother/address/manual');
    expect(birthMotherSequence[7].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[7].getNextStep({})).toBe('/task-list');

    expect(birthMotherSequence[8].url).toBe('/birth-mother/address/international');
    expect(birthMotherSequence[8].showInSection).toBe('aboutBirthMother');
    expect(birthMotherSequence[8].getNextStep({})).toBe('/task-list');
  });
});
