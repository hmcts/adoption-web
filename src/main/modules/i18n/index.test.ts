import { Application } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { LanguageToggle } from '.';

describe('i18n', () => {
  let req = mockRequest();
  const res = mockResponse();
  const mockNext = jest.fn();
  let mockApp;

  beforeEach(() => {
    mockApp = {
      use: jest.fn(callback => callback(req, res, mockNext)),
    } as unknown as Application;

    new LanguageToggle().enableFor(mockApp);
  });

  test('should call next', () => {
    expect(mockNext).toHaveBeenCalled();
  });

  describe('when method is GET and lng query param is present', () => {
    beforeEach(() => {
      req = mockRequest();
      req.method = 'GET';
      req.query.lng = 'en';
    });

    test('should call next', () => {
      new LanguageToggle().enableFor(mockApp);
      expect(req.session.lang).toBe('en');
    });

    test('should save language preference in ccd data store', () => {
      new LanguageToggle().enableFor(mockApp);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        { applicant1LanguagePreference: 'ENGLISH' },
        'citizen-update-application'
      );
    });

    describe('when there is an error in saving language preference in ccd', () => {
      beforeEach(() => {
        req = mockRequest();
        req.method = 'GET';
        req.query.lng = 'cy';

        (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('MOCK_ERROR');
      });

      test('should handle error', () => {
        new LanguageToggle().enableFor(mockApp);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
          '1234',
          { applicant1LanguagePreference: 'WELSH' },
          'citizen-update-application'
        );
      });
    });
  });
});
