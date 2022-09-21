import ManualAddressPostControllerBase from '../../../../app/address/ManualAddressPostControllerBase';

import ManualAddressPostController from './ManualAddressPostController';

describe('applicant1 > address > lookup > AddressLookupPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new ManualAddressPostController({});
  });

  test('should extend AddressLookupPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(ManualAddressPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe('applicant1');
  });
});
