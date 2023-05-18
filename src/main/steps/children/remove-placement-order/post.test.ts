jest.mock('../placement-order/PlacementOrderPostController');

import PlacementOrderPostController from '../placement-order/PlacementOrderPostController';

import PostController from './post';

describe('children > remove-placement-order post', () => {
  test('should re-export placement-order post controller for remove-placement-order', () => {
    expect(PostController).toBe(PlacementOrderPostController);
  });
});
