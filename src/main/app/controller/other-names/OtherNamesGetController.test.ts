import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generateContent } from '../../../steps/applicant1/other-names/content';
import { FieldPrefix } from '../../case/case';

import OtherNamesGetController from './OtherNamesGetController';

describe('OtherNamesGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new OtherNamesGetController(
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

  describe('when there is no applicant1AdditionalNames in userCase', () => {
    test('should not redirect', async () => {
      req.query.remove = 'MOCK_ID';
      await controller.get(req, res);
      expect(res.redirect).not.toHaveBeenCalled();
    });
  });

  describe('when there is remove param in req.query and applicant1AdditionalNames in userCase', () => {
    const formData = {
      applicant1AdditionalNames: [{ id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' }],
      applicant1HasOtherNames: 'Yes',
    };

    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_ID' },
        session: {
          userCase: {
            id: 'MOCK_ID',
            applicant1AdditionalNames: [
              { id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' },
              { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
            ],
          },
        },
      });
      req.url = '/request?remove=MOCK_ID';
      req.locals.api.triggerEvent.mockResolvedValue(formData);
    });

    test('should redirect to same url', async () => {
      await controller.get(req, res);
      expect(req.session.userCase.applicant1AdditionalNames).toEqual([
        { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
      ]);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });

    test('should call save with correct params', async () => {
      await controller.get(req, res);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(1);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('MOCK_ID', formData, 'citizen-update-application');
    });
  });
});
