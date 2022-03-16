import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { APPLYING_WITH_URL, CHECK_ELIGIBILITY_URL_UNDER_18, START_ELIGIBILITY_URL, TASK_LIST_URL } from './urls';

import { getNextEligibilityStepUrl, getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = APPLYING_WITH_URL;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(TASK_LIST_URL);
    });

    it('returns next eligibility step url when correctly called', () => {
      mockReq.originalUrl = START_ELIGIBILITY_URL;
      const data = {
        eligibility: { under18Eligible: 'yes', marriedEligible: 'no', livedUKEligible: 'yes', under21Eligible: 'yes' },
      };
      expect(getNextEligibilityStepUrl(mockReq, data.eligibility)).toBe(CHECK_ELIGIBILITY_URL_UNDER_18);
    });

    it('moves into a dead end when the response matches', () => {
      mockReq.originalUrl = APPLYING_WITH_URL;
      const data = {};
      const actual = getNextStepUrl(mockReq, data);
      expect(actual).toBe('/task-list');
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}?customQueryString`;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(`${TASK_LIST_URL}?customQueryString`);
    });

    it('returns task list url in case of unrecognised urls', () => {
      mockReq.originalUrl = '/non-existing-url';
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(TASK_LIST_URL);
    });

    it('returns task list url in case of saveAsDraft', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}`;
      const data = {};
      mockReq.body['saveAsDraft'] = true;
      expect(getNextStepUrl(mockReq, data)).toBe(TASK_LIST_URL);
    });
  });
});
