jest.mock('../placement-order/post');

import PlacementOrderPostController from '../placement-order/post';

import PostController from './post';

describe('children > placement-order-court post', () => {
  test('should re-export placement-order post controller', () => {
    expect(PostController).toBe(PlacementOrderPostController);
  });
});
