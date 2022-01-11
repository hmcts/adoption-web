import SelectAddressPostControllerBase from '../../../../app/address/SelectAddressPostControllerBase';
import { FieldPrefix } from '../../../../app/case/case';

import SelectAddressPostController from './post';

describe('otherParent > address > select > post', () => {
  let controller;

  beforeEach(() => {
    controller = new SelectAddressPostController({});
  });

  test('should extend SelectAddressPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(SelectAddressPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.OTHER_PARENT);
  });
});
