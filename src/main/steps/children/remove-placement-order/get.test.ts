jest.mock('../placement-order/PlacementOrderGetController');

import PlacementOrderGetController from '../placement-order/PlacementOrderGetController';

import GetController from './get';

describe('children > remove-placement-order get', () => {
  test('should re-export placement-order get controller', () => {
    expect(GetController).toBe(PlacementOrderGetController);
  });
});
