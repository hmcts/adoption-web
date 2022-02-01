import { FieldPrefix } from '../../../app/case/case';
import OtherNamesPostControllerBase from '../../../app/controller/other-names/OtherNamesPostController';

import OtherNamesPostController from './OtherNamesPostController';

describe('applicant2 > other-names > OtherNamesPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new OtherNamesPostController({});
  });

  test('should extend OtherNamesPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(OtherNamesPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.APPLICANT2);
  });
});
