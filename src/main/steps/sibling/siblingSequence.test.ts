import { YesNoNotsure } from '../../app/case/definition';

import { siblingSequence } from './siblingSequence';

describe('birthMotherSequence', () => {
  test('should contain 2 entries in sibling screen sequence', () => {
    expect(siblingSequence).toHaveLength(2);

    expect(siblingSequence[0].url).toBe('/sibling/exists');
    expect(siblingSequence[0].showInSection).toBe('aboutSibling');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.YES })).toBe('/sibling/court-order-exists');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/task-list');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/task-list');

    expect(siblingSequence[1].url).toBe('/sibling/court-order-exists');
    expect(siblingSequence[1].showInSection).toBe('aboutSibling');
    expect(siblingSequence[1].getNextStep({ hasSiblings: YesNoNotsure.YES })).toBe('/task-list');
    expect(siblingSequence[1].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/task-list');
    expect(siblingSequence[1].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/task-list');
  });
});
