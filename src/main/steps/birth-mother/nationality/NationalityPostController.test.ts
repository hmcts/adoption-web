import { FieldPrefix } from '../../../app/case/case';
import NationalityPostControllerBase from '../../../app/nationality/NationalityPostController';

import NationalityPostController from './NationalityPostController';

describe('birth-mother > nationality > NationalityPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new NationalityPostController({});
  });

  test('should extend NationalityPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(NationalityPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.BIRTH_MOTHER);
  });
});
