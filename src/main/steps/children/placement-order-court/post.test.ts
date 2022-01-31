jest.mock('../placement-order/PlacementOrderPostController');

import PlacementOrderPostController from '../placement-order/PlacementOrderPostController';

import PostController from './post';

describe('children > placement-order-court post', () => {
  test('should re-export placement-order post controller', () => {
    expect(PostController).toBe(PlacementOrderPostController);
  });
});
