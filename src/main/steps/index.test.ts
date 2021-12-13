import { mockRequest } from '../../test/unit/utils/mockRequest';
import { Checkbox } from '../app/case/case';
import { Gender, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { applicant1Sequence } from './applicant1Sequence';
import {
  APPLYING_WITH_URL,
  CHECK_ELIGIBILITY_URL_UNDER_18,
  DATE_CHILD_MOVED_IN_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  START_ELIGIBILITY_URL,
} from './urls';

import { getNextEligibilityStepUrl, getNextIncompleteStepUrl, getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = APPLYING_WITH_URL;
      const data = { gender: Gender.MALE };
      expect(getNextStepUrl(mockReq, data)).toBe(DATE_CHILD_MOVED_IN_URL);
    });

    it('returns next eligibility step url when correctly called', () => {
      mockReq.originalUrl = START_ELIGIBILITY_URL;
      const data = {
        eligibility: { under18Eligible: 'yes', marriedEligible: 'no', livedUKEligible: 'yes', under21Eligible: 'yes' },
      };
      expect(getNextEligibilityStepUrl(mockReq, data.eligibility)).toBe(CHECK_ELIGIBILITY_URL_UNDER_18);
    });

    it('moves into a dead end when the response matches', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      const data = { applicant1ScreenHasUnionBroken: YesOrNo.NO };
      const actual = getNextStepUrl(mockReq, data);
      expect(actual).toBe(RELATIONSHIP_NOT_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}?customQueryString`;
      const data = { gender: Gender.MALE };
      expect(getNextStepUrl(mockReq, data)).toBe(`${DATE_CHILD_MOVED_IN_URL}?customQueryString`);
    });
  });

  describe('getNextIncompleteStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the first url that fails validation', () => {
      expect(getNextIncompleteStepUrl(mockReq)).toBe(APPLYING_WITH_URL);
    });

    it('returns the next incomplete step if previous is valid', () => {
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      expect(getNextIncompleteStepUrl(mockReq)).toBe(APPLYING_WITH_URL);
    });

    it('returns the previous step if its a dead end', () => {
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      mockReq.session.userCase.applicant1ScreenHasUnionBroken = YesOrNo.NO;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(APPLYING_WITH_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${APPLYING_WITH_URL}?customQueryString`;
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      expect(getNextIncompleteStepUrl(mockReq)).toBe(`${APPLYING_WITH_URL}?customQueryString`);
    });

    it('goes back one page if the step is incomplete & excluded from continue application', () => {
      applicant1Sequence[1].excludeFromContinueApplication = true;

      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(APPLYING_WITH_URL);
    });
  });
});
