jest.mock('../find-placement-order-court/FindPlacementOrderCourtPostController');

import FindPlacementOrderCourtPostController from '../find-placement-order-court/FindPlacementOrderCourtPostController';

import PostController from './post';

describe('children > social-worker post', () => {
  test('should re-export find-placement-order-court post controller', () => {
    expect(PostController).toBe(FindPlacementOrderCourtPostController);
  });
});
