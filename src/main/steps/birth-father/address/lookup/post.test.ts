import AddressLookupPostControllerBase from '../../../../app/address/AddressLookupPostControllerBase';

import AddressLookupPostController from './post';

describe('birth-father > address > lookup > post', () => {
  let controller;

  beforeEach(() => {
    controller = new AddressLookupPostController({});
  });

  test('should extend AddressLookupPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(AddressLookupPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe('birthFather');
  });
});
