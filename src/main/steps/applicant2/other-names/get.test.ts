import { FieldPrefix } from '../../../app/case/case';
import OtherNamesGetControllerBase from '../../../app/controller/other-names/OtherNamesGetController';

import { generateContent } from './content';
import OtherNamesGetController from './get';

describe('applicant2 > other-names > get', () => {
  let controller;

  beforeEach(() => {
    controller = new OtherNamesGetController(__dirname + '../../common/template', generateContent);
  });

  test('should extend OtherNamesGetControllerBase', async () => {
    expect(controller).toBeInstanceOf(OtherNamesGetControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe(FieldPrefix.APPLICANT2);
  });
});
