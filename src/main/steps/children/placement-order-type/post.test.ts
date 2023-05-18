jest.mock('../placement-order/PlacementOrderPostController');

import PlacementOrderPostController from '../placement-order/PlacementOrderPostController';

import PostController from './post';

describe('children > placement-order-type post', () => {
  test('should re-export placement-order post controller for placement-order-type', () => {
    expect(PostController).toBe(PlacementOrderPostController);
  });
});
