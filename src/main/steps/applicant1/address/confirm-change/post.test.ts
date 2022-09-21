jest.mock('../controller/ConfirmChangePostController');

import ConfirmChangeAddressController from '../controller/ConfirmChangePostController';

import PostController from './post';

describe('address > change > ConfirmChangeAddressController', () => {
  test('should re-export placement-order post controller', () => {
    expect(PostController).toBe(ConfirmChangeAddressController);
  });
});
