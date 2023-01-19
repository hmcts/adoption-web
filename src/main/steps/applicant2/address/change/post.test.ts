jest.mock('../../../../steps/applicant1/address/controller/ChangePostController');

import ChangeAddressController from '../../../../steps/applicant1/address/controller/ChangePostController';

import PostController from './post';

describe('address > change > ChangeAddressController', () => {
  test('should re-export placement-order post controller', () => {
    expect(PostController).toBe(ChangeAddressController);
  });
});
