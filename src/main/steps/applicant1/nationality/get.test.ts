import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import NationalityGetController from './get';

describe('applicant1 > NationalityGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new NationalityGetController(__dirname + '../../common/template', generateContent);
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
    test('should redirect to same url', async () => {
      req = mockRequest({
        query: { remove: 'MOCK_COUNTRY' },
        session: { userCase: { applicant1AdditionalNationalities: ['MOCK_COUNTRY', 'MOCK_COUNTRY2'] } },
      });
      req.url = '/request?remove=MOCK_COUNTRY';
      await controller.get(req, res);
      expect(req.session.userCase.applicant1AdditionalNationalities).toEqual(['MOCK_COUNTRY2']);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
