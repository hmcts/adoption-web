import { YesNoNotsure, YesOrNo } from '../../app/case/definition';

import { siblingSequence } from './siblingSequence';

describe('siblingSequence', () => {
  test('should contain 6 entries in sibling screen sequence', () => {
    expect(siblingSequence).toHaveLength(6);

    expect(siblingSequence[0].url).toBe('/sibling/exists');
    expect(siblingSequence[0].showInSection).toBe('aboutSibling');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.YES })).toBe('/sibling/court-order-exists');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/task-list');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/task-list');

    expect(siblingSequence[1].url).toBe('/sibling/court-order-exists');
    expect(siblingSequence[1].showInSection).toBe('aboutSibling');
    expect(siblingSequence[1].getNextStep({ hasPoForSiblings: YesNoNotsure.YES })).toBe('/sibling/name');
    expect(siblingSequence[1].getNextStep({ hasPoForSiblings: YesNoNotsure.NO })).toBe('/task-list');
    expect(siblingSequence[1].getNextStep({ hasPoForSiblings: YesNoNotsure.NOT_SURE })).toBe('/task-list');

    expect(siblingSequence[2].url).toBe('/sibling/name');
    expect(siblingSequence[2].showInSection).toBe('aboutSibling');
    expect(siblingSequence[2].getNextStep({})).toBe('/sibling/placement-order-type');

    expect(siblingSequence[3].url).toBe('/sibling/placement-order-type');
    expect(siblingSequence[3].showInSection).toBe('aboutSibling');
    expect(siblingSequence[3].getNextStep({})).toBe('/sibling/placement-order-number');

    expect(siblingSequence[4].url).toBe('/sibling/placement-order-number');
    expect(siblingSequence[4].showInSection).toBe('aboutSibling');
    expect(siblingSequence[4].getNextStep({})).toBe('/sibling/summary');

    expect(siblingSequence[5].url).toBe('/sibling/summary');
    expect(siblingSequence[5].showInSection).toBe('aboutSibling');
    expect(siblingSequence[5].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.YES })).toBe('/sibling/summary');
    expect(siblingSequence[5].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.NO })).toBe('/task-list');
  });
});
