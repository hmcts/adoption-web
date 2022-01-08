import { FieldPrefix } from '../../../app/case/case';
import NationalityGetControllerBase from '../../../app/nationality/NationalityGetController';

import { generateContent } from './content';
import NationalityGetController from './get';

describe('applicant1 > nationality > get', () => {
  let controller;

  beforeEach(() => {
    controller = new NationalityGetController(__dirname + '../../common/template', generateContent);
  });

  test('should extend NationalityGetControllerBase', async () => {
    expect(controller).toBeInstanceOf(NationalityGetControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.APPLICANT1);
  });
});
