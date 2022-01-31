import { FieldPrefix } from '../../../app/case/case';
import OtherNamesGetControllerBase from '../../../app/controller/other-names/OtherNamesGetController';

import OtherNamesGetController from './OtherNamesGetController';
import { generateContent } from './content';

describe('applicant2 > other-names > OtherNamesGetController', () => {
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
