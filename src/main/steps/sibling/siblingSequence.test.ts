import { YesNoNotsure, YesOrNo } from '../../app/case/definition';

import { siblingSequence } from './siblingSequence';

describe('siblingSequence', () => {
  test('should contain 7 entries in sibling screen sequence', () => {
    expect(siblingSequence).toHaveLength(7);

    expect(siblingSequence[0].url).toBe('/sibling/exists');
    expect(siblingSequence[0].showInSection).toBe('aboutSibling');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.YES })).toBe('/sibling/relation');
    expect(
      siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [{ siblingId: 'MOCK_ID' }] })
    ).toBe('/sibling/summary');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/task-list');
    expect(siblingSequence[0].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/task-list');

    expect(siblingSequence[1].url).toBe('/sibling/relation');
    expect(siblingSequence[1].showInSection).toBe('aboutSibling');
    expect(siblingSequence[1].getNextStep({})).toBe('/sibling/placement-order-type');

    expect(siblingSequence[2].url).toBe('/sibling/placement-order-type');
    expect(siblingSequence[2].showInSection).toBe('aboutSibling');
    expect(siblingSequence[2].getNextStep({})).toBe('/sibling/placement-order-number');

    expect(siblingSequence[3].url).toBe('/sibling/placement-order-number');
    expect(siblingSequence[3].showInSection).toBe('aboutSibling');
    expect(siblingSequence[3].getNextStep({})).toBe('/sibling/summary');

    Date.now = jest.fn(() => +new Date('2021-01-01'));
    expect(siblingSequence[4].url).toBe('/sibling/summary');
    expect(siblingSequence[4].showInSection).toBe('aboutSibling');
    expect(siblingSequence[4].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.YES })).toBe(
      '/sibling/relation?add=1609459200000'
    );
    expect(siblingSequence[4].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.NO })).toBe(
      '/la-portal/task-list'
    );
    expect(siblingSequence[4].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.NO })).toBe(
      '/la-portal/task-list'
    );

    expect(siblingSequence[5].url).toBe('/sibling/placement-order-check-your-answers');
    expect(siblingSequence[5].showInSection).toBe('aboutSibling');
    expect(siblingSequence[5].getNextStep({})).toBe('/sibling/summary');

    expect(siblingSequence[6].url).toBe('/sibling/remove-placement-order');
    expect(siblingSequence[6].showInSection).toBe('aboutSibling');
    expect(siblingSequence[6].getNextStep({})).toBe('/sibling/exists');
  });
});
