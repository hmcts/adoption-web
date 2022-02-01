import { FieldPrefix } from '../../../app/case/case';
import NationalityGetControllerBase from '../../../app/nationality/NationalityGetController';

import NationalityGetController from './NationalityGetController';
import { generateContent } from './content';

describe('birth-father > nationality > NationalityGetController', () => {
  let controller;

  beforeEach(() => {
    controller = new NationalityGetController(__dirname + '../../common/template', generateContent);
  });

  test('should extend NationalityGetControllerBase', async () => {
    expect(controller).toBeInstanceOf(NationalityGetControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.BIRTH_FATHER);
  });
});
