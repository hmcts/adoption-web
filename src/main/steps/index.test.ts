import { mockRequest } from '../../test/unit/utils/mockRequest';
import { ApplyingWith } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { applicant1Sequence } from './applicant1/applicant1Sequence';
import { APPLYING_WITH_URL, CHECK_ELIGIBILITY_URL_UNDER_18, DATE_CHILD_MOVED_IN, START_ELIGIBILITY_URL } from './urls';

import { getNextEligibilityStepUrl, getNextIncompleteStepUrl, getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = APPLYING_WITH_URL;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(DATE_CHILD_MOVED_IN);
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
      expect(actual).toBe('/date-child-moved-in');
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}?customQueryString`;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(`${DATE_CHILD_MOVED_IN}?customQueryString`);
    });
  });

  describe('getNextIncompleteStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step url when step does not have a form', () => {
      mockReq.originalUrl = '/non-existent-url';
      expect(getNextIncompleteStepUrl(mockReq)).toBe(APPLYING_WITH_URL);
    });

    it('returns the first url that fails validation', () => {
      expect(getNextIncompleteStepUrl(mockReq)).toBe(APPLYING_WITH_URL);
    });

    it('returns the next incomplete step if previous is valid', () => {
      mockReq.session.userCase.applyingWith = ApplyingWith.ALONE;
      expect(getNextIncompleteStepUrl(mockReq)).toBe('/date-child-moved-in');
    });

    it('returns the previous step if its a dead end', () => {
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(APPLYING_WITH_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}?customQueryString`;
      expect(getNextIncompleteStepUrl(mockReq)).toBe(`${APPLYING_WITH_URL}?customQueryString`);
    });

    it('goes back one page if the step is incomplete & excluded from continue application', () => {
      applicant1Sequence[1].excludeFromContinueApplication = true;

      mockReq.originalUrl = APPLYING_WITH_URL;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(APPLYING_WITH_URL);
    });
  });
});
