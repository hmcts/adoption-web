import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generateContent } from '../../steps/birth-mother/nationality/content';
import { FieldPrefix } from '../case/case';

import NationalityGetController from './NationalityGetController';

describe('NationalityGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new NationalityGetController(
      __dirname + '../../common/template',
      generateContent,
      FieldPrefix.APPLICANT1
    );
    req = mockRequest();
    res = mockResponse();
  });

  describe('when there is no remove param in req.query', () => {
    test('should not redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).not.toHaveBeenCalled();
    });
  });

  describe('when there is no applicant1AdditionalNationalities in userCase', () => {
    test('should not redirect', async () => {
      req.query.remove = 'MOCK_COUNTRY';
      await controller.get(req, res);
      expect(res.redirect).not.toHaveBeenCalled();
    });
  });

  describe('when there is remove param in req.query and applicant1AdditionalNationalities in userCase', () => {
    const formData = { applicant1AdditionalNationalities: ['MOCK_COUNTRY2'] };

    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_COUNTRY' },
        session: { userCase: { id: 'MOCK_ID', applicant1AdditionalNationalities: ['MOCK_COUNTRY', 'MOCK_COUNTRY2'] } },
      });
      req.url = '/request?remove=MOCK_COUNTRY';
      req.locals.api.triggerEvent.mockResolvedValue(formData);
    });

    test('should redirect to same url', async () => {
      await controller.get(req, res);
      expect(req.session.userCase.applicant1AdditionalNationalities).toEqual(['MOCK_COUNTRY2']);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });

    test('should call save with correct params', async () => {
      await controller.get(req, res);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(1);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('MOCK_ID', formData, 'citizen-update-application');
    });
  });
});
