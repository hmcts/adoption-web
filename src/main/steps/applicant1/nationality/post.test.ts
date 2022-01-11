import { FieldPrefix } from '../../../app/case/case';
import NationalityPostControllerBase from '../../../app/nationality/NationalityPostController';

import NationalityPostController from './post';

describe('applicant1 > nationality > post', () => {
  let controller;

  beforeEach(() => {
    controller = new NationalityPostController({});
  });

  test('should extend NationalityPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(NationalityPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.APPLICANT1);
  });
});
