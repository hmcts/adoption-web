jest.mock('../placement-order/get');

import PlacementOrderGetController from '../placement-order/get';

import GetController from './get';

describe('children > placement-order-date get', () => {
  test('should re-export placement-order get controller', () => {
    expect(GetController).toBe(PlacementOrderGetController);
  });
});
